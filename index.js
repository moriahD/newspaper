const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });
const hb = require("express-handlebars");
const compression = require("compression");
const db = require("./utils/db");
const bc = require("./utils/bc");
const csurf = require("csurf");
app.engine("handlebars", hb());
app.set("view engine", "handlebars");
app.use(require("body-parser").json());

app.use(express.static("./public"));
app.use(compression());
const cookieSession = require("cookie-session");
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});
app.use(
    cookieSession({
        secret: "I'm always angry.",
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);
app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

const s3 = require("./s3");
const config = require("./config");

/////////// for stroing uploaded file ///////////
var multer = require("multer"); //saving files to your harddrive
var uidSafe = require("uid-safe");
var path = require("path"); //
var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});
/////////// END: for stroing uploaded file ///////////
app.use(require("body-parser").json());

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}
app.get("/admin", function(req, res) {
    if (req.session.userId) {
        res.redirect("/adminMain");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});
app.get("/adminMain", function(req, res) {
    console.log("/admin/main ciao");
    db.getArticles()
        .then(data => {
            res.json(data.rows);
        })
        .catch(err => console.log(err));
});

// app.post("/register", async (req, res) => {
//     const { first, last, email, pass } = req.body;
//     try {
//         let hashedpw = await bc.hashPassword(pass);
//         let user = await db.addUser(first, last, email, hashedpw);
//
//         req.session.userId = user.rows[0].id;
//         console.log("req.session.userId in register: ", req.session.userId);
//         res.json({ success: true });
//     } catch (err) {
//         console.log("err in POST /registration", err);
//     }
// });
//
app.post("/login", function(req, res) {
    //first check if the user is
    db.getUserId(req.body.email)
        .then(result => {
            if (!result.rows[0]) {
                res.json({
                    error: "Something is wrong! Please try to type carefully."
                });
            } else {
                return result;
            }
        })
        .then(result => {
            bc.checkPassword(req.body.pass, result.rows[0].password)
                .then(results => {
                    if (!results) {
                        res.json({
                            error: true
                        });
                    } else {
                        req.session.userId = result.rows[0].id;
                        console.log("req.session.userId", req.session.userId);

                        db.checkIfAdmin(req.session.userId)
                            .then(data => {
                                console.log(
                                    "data.rows.isreporter: ",
                                    data.rows[0]
                                );
                                if (
                                    data.rows[0].isreporter == true ||
                                    data.rows[0].iseditor == true
                                ) {
                                    res.json({ success: true });
                                } else {
                                    console.log(
                                        "you don't have access to admin"
                                    );
                                    res.json({ success: false });
                                }
                            })
                            .catch(err =>
                                console.log("error in checkIfAdmin: ", err)
                            );
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        });
});

// server side socket code
io.on("connection", function(socket) {
    console.log(`socket with the id ${socket.id} is now connected`);
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }

    let userId = socket.request.session.userId;
    // //part 2 is dealing with a new chat message.
    socket.on("newMessage", newMessage => {
        console.log("This is the new chat message", newMessage);
        db.saveMessages(socket.request.session.userId, newMessage)
            .then(result => {
                console.log("result:", result);
                return db.getUserById(userId).then(data => {
                    console.log("new chat message data:", data.rows[0]);
                    data.rows[0].id = result.rows[0].id;
                    data.rows[0].sender_id = data.rows[0].sender_id;
                    data.rows[0].message = result.rows[0].message;
                    data.rows[0].created_at = result.rows[0].created_at;
                    io.emit("chatMessage", data.rows[0]);
                });
            })
            .catch(err => console.log("err in saving new message:", err));
    });
    // db.getLastTenMessages()
    //     .then(data => {
    //         // console.log("getLastTenMessages data:", data);
    //         socket.emit("chatMessages", data.rows.reverse());
    //     })
    //     .catch(err => console.log("err in getting last 10 messages:", err));
});

app.get("/article/:id", function(req, res) {
    db.getArticleById(req.params.id) //i have to pass id here
        .then(result => {
            var title = result.rows[0].title;
            res.render("article", {
                title: title
            });
        })
        .catch(err => {
            console.log("error in getting article info by id", err);
        });
});

app.get("/", function(req, res) {
    db.getArticles() //i have to pass id here
        .then(result => {
            var articles = result.rows;
            res.render("articles", {
                articles: articles
            });
        })
        .catch(err => {
            console.log("error in getting article info by id", err);
        });
});

// --------------- DO NOT DELETE THIS ------------------ //
app.get("*", function(req, res) {
    if (!req.session.userId && req.url != "/admin") {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});
// --------------- DO NOT DELETE THIS ------------------ //
server.listen(8080, function() {
    console.log("I'm listening.");
});
