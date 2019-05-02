const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./db");
const bcrypt = require("./bcrypt");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const csurf = require("csurf");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const s3 = require("./s3");
const config = require("./config");

app.use(compression());

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
//cookies thingy
app.use(
    cookieSession({
        maxAge: 1000 * 60 * 60 * 24 * 14,
        secret: "I am always Hungary."
    })
);

// parse application
app.use(bodyParser.json());

// static file
app.use(express.static("./public"));

//csurf protection
app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

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

////////////////////////////////////////////////////////////////
/////////////////WELCOME ROUTE//////////////////////////////////
////////////////////////////////////////////////////////////////

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

////////////////////////////////////////////////////////////////
/////////////////REGISTRATION///////////////////////////////////
////////////////////////////////////////////////////////////////

app.post("/register", (req, res) => {
    bcrypt
        .hash(req.body.password)
        .then(hashed => {
            return db.addUser(
                req.body.first,
                req.body.last,
                req.body.email,
                hashed
            );
        })
        .then(({ rows }) => {
            req.session.userId = rows[0].id;
            res.json({ success: true });
        })
        .catch(function(err) {
            console.log("err in reg/post: ", err);
            res.json({ success: false });
        });
});

app.post("/login", (req, res) => {
    let userId;
    db.getUserInfo(req.body.email)
        .then(result => {
            req.session.email = result.rows[0].email;
            if (result.rows[0]) {
                userId = result.rows[0].id;
                return bcrypt.compare(
                    req.body.password,
                    result.rows[0].password
                );
            } else {
                req.session.userId = result.rows[0].id;
                res.json({ success: true });
            }
        })
        .then(() => {
            req.session.userId = userId;
            res.json({ success: true });
        })
        .catch(function(err) {
            console.log("err in login /post: ", err);
            res.json({ success: false });
        });
});

app.post("/upload", uploader.single("file"), s3.upload, function(req, res) {
    let userId = req.session.userId;
    db.addImage(config.s3Url + req.file.filename, userId).then(({ rows }) => {
        res.json(rows[0]);
    });
});

app.get("/user", (req, res) => {
    let userId = req.session.userId;
    db.getUserProfile(userId)
        .then(dbResult => {
            // console.log("dbResult.rows[0]: ", dbResult.rows[0]);
            res.json(dbResult.rows[0]);
        })
        .catch(err => {
            console.log("error in get/user: ", err);
        });
});

app.post("/bio", (req, res) => {
    var userId = req.session.userId;
    // console.log('req.body', req.body);
    db.addBio(req.body.bioText, userId).then(({ rows }) => {
        res.json(rows[0]);
    });
});

app.get("/user/:id/json", (req, res) => {
    if (req.session.userId == req.params.id) {
        return res.json({
            redirectTo: "/"
        });
    }
    db.getUserProfile(req.params.id)
        .then(dbResult => {
            // console.log("dbResult.rows[0]: ", dbResult.rows[0]);
            res.json(dbResult.rows[0]);
        })
        .catch(err => {
            console.log("error in get/otheruser: ", err);
        });
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});

app.get("*", (req, res) => {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
