const knox = require("knox-s3");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // secrets.json is in .gitignore
}

const client = knox.createClient({
    key: secrets.AWS_KEY,
    secret: secrets.AWS_SECRET,
    bucket: "spicedling"
});

exports.upload = function(req, res, next) {
    if (!req.file) {
        return res.sendStatus(500);
    }
    const s3Request = client.put(req.file.filename, {
        "Content-Type": req.file.mimetype,
        "Content-Length": req.file.size,
        "x-amz-acl": "public-read"
    });
    //Make the request
    const readStream = fs.createReadStream(req.file.path);
    readStream.pipe(s3Request);

    //Wait for a response
    s3Request.on('response', s3Response => {
        //If the status code is anything but 200, wasSuccessful would be false
        const wasSuccessful = s3Response.statusCode == 200;
        /*
        AKA
        if (s3Response.statusCode == 200) {
            const wasSuccessful = true;
        } else {
            const wasSuccessful = false;
        }
        */
        // console.log('s3Response.statusCode:', s3Response.statusCode);
        if (wasSuccessful) {
            next();
        } else {
            res.statusCode(500);
        }
        // res.json({ //This is called in index.js, in the app.post('/upload')
        //     success: wasSuccessful
        // });
    });
};