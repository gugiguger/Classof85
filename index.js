const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./db");
const bcrypt = require("./bcrypt");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const csurf = require("csurf");

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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// static file
app.use(express.static("./public"));

//csurf protection
app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
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
            console.log("aaaaaaaaaaaa", req.session.email);
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

app.get("/logout", (req, res) => {
    req.session.destroy;
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
