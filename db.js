const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:postgres:postgres@localhost:5432/socialnetwork`
);

module.exports.addUser = (first, last, email, password) => {
    return db.query(
        `INSERT INTO users (first, last, email, password)
        VALUES ($1, $2, $3, $4) RETURNING *`,
        [first, last, email, password]
    );
};

module.exports.getUserInfo = function(email) {
    return db.query(
        `SELECT * FROM users
        WHERE email = $1`,
        [email]
    );
};