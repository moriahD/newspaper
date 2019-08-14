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

exports.checkIfAdmin = function checkIfAdmin(id) {
    return db.query(`SELECT isreporter, iseditor FROM users WHERE id = $1`, [
        id
    ]);
};

exports.getArticles = function getArticles() {
    return db.query(`SELECT * FROM article`);
};
exports.getArticleById = function getArticleById(id) {
    return db.query(
        `
        select * from article WHERE id = $1
    `,
        [id]
    );
};
exports.getArticlesByCategory = function getArticlesByCategory(category) {
    return db.query(
        `
        select * from article WHERE category_id = $1
    `,
        [category]
    );
};
