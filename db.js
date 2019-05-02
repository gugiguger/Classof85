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

module.exports.getUserProfile = function(userId) {
    return db.query(
        `SELECT users.first AS first, users.last AS last, users.id AS id, images.url AS url, bio.bio AS bio
        FROM users
        LEFT JOIN images
        ON users.id = images.user_id
        LEFT JOIN bio
        ON users.id = bio.user_id
        WHERE users.id = $1`,
        [userId]
    );
};


module.exports.addImage = function(url, user_id){
    return db.query(
        `INSERT INTO images (url, user_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id)
        DO UPDATE SET url = $1
        RETURNING url`,
        [url, user_id]
    );
};

module.exports.addBio = function(bio, user_id) {
    return db.query(
        `INSERT INTO bio (bio, user_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id)
        DO UPDATE SET bio = $1
        RETURNING bio`,
        [bio, user_id]
    );
};