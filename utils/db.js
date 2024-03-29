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
        select * from article WHERE category_id = $1 ORDER BY id DESC
    `,
        [category]
    );
};
exports.getArticlesByReporterId = function getArticlesByReporterId(
    reporter_id
) {
    return db.query(
        `
        SELECT *, to_char( article.last_update, 'DD-MON-YYYY HH24:MI:SS') as last_update FROM article WHERE reporter_id = $1 ORDER BY article.last_update DESC
    `,
        [reporter_id]
    );
};
exports.deleteArticle = function deleteArticle(id) {
    return db.query(
        `
        DELETE FROM article WHERE id = $1
    `,
        [id]
    );
};
exports.updateArticle = function updateArticle(
    title,
    description,
    article_body,
    id,
    image
) {
    return db.query(
        `
        UPDATE article SET title=$1, description=$2, article_body=$3, image=$5 WHERE id = $4
    `,
        [title, description, article_body, id, image]
    );
};

exports.newArticle = function newArticle(
    reporter_id,
    category_id,
    title,
    description,
    article_body,
    image
) {
    return db.query(
        `
        INSERT INTO article (reporter_id, category_id, title, description, article_body, image)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `,
        [reporter_id, category_id, title, description, article_body, image]
    );
};
exports.newAdmin = function newAdmin(
    first_name,
    last_name,
    email,
    password,
    isReporter,
    isEditor
) {
    return db.query(
        `
        INSERT INTO users (first_name, last_name, email, password, isReporter, isEditor)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `,
        [first_name, last_name, email, password, isReporter, isEditor]
    );
};
exports.getAccountInfo = function getAccountInfo(id) {
    return db.query(
        `
        select * from users WHERE id = $1
    `,
        [id]
    );
};
exports.updateAccount = function updateAccount(
    first_name,
    last_name,
    email,
    id,
    password
) {
    return db.query(
        `
        UPDATE users SET first_name=$1, last_name=$2, email=$3, password=$5 WHERE id = $4
    `,
        [first_name, last_name, email, id, password]
    );
};
