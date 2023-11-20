//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 5000;
var userIsAuthorised = false;

app.use(bodyParser.urlencoded ({extended: true}));

const secretPass = function (req, res, next) {
    const password = req.body["password"];
    if (password === "ILoveProgramming") {
        userIsAuthorised = true;
    }
    
    next();
} 

app.use(secretPass);

app.get ("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post ("/check", (req, res) => {
    if (userIsAuthorised) {
        res.sendFile(__dirname + "/public/secret.html");
    }
    else {
        res.sendFile(__dirname + "/public/index.html");
    }
});

app.listen (port, () => {
    console.log(`Listening on port ${port}`);
});