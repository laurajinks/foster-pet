require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const { json } = require("body-parser");
const cors = require("cors");
const port = 3001;
const app = express();
const { usersOnly, orgOnly } = require("./middleware/authMiddleware");
const {
    authAccount,
    addUser,
    addOrg,
    logInUser,
    logInOrg,
    logout
} = require("./controllers/authController");
const { createApp } = require("./controllers/applicationController");
const { searchAdoptable } = require("./controllers/searchController");
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
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 14
        }
    })
);

//Authentication Endpoints
app.get("/auth/user", usersOnly, authAccount);
app.get("auth/getuser", authAccount);
app.get("/auth/org", orgOnly, authAccount);
app.post("/auth/register/user", addUser);
app.post("/auth/register/org", addOrg);
app.post("/auth/login/user", logInUser);
app.post("/auth/login/org", logInOrg);
app.post("/auth/logout", logout);

//Search Endpoints
app.get("/api/search/adoptable", searchAdoptable);

//Application Endpoints
app.post("/api/createapplication", createApp);

app.listen(port, console.log(`Listening on ${port}`));
