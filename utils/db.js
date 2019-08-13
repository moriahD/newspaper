var spicedPg = require("spiced-pg");
var db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    db = spicedPg("postgres:moriah:1234@localhost:5432/spicedfinal");
}
exports.getUserId = function(email) {
    return db.query("SELECT * FROM users WHERE email = $1", [email]);
};
