require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const { json } = require("body-parser");
const cors = require("cors");
const port = 3001;
const app = express();
const {
    addUser,
    addOrg,
    logInUser,
    logInOrg,
    logout
} = require("./controllers/authController");
app.use(json());
app.use(cors());

massive(process.env.CONNECTION_STRING)
    .then(db => {
        app.set("db", db);
        console.log("Database Connected");
    })
    .catch(err => console.log(err));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: false
    })
);

//Register/Log In/Log OUt End Points
app.post("/auth/register/user", addUser);
app.post("/auth/register/org", addOrg);
app.post("/auth/login/user", logInUser);
app.post("/auth/login/org", logInOrg);
app.post("/auth/logout/user", logout);

app.listen(port, console.log(`Listening on ${port}`));
