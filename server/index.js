require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const { json } = require("body-parser");
const cors = require("cors");
const port = 3001;
const app = express();
const {
    currentSession,
    usersOnly,
    orgOnly
} = require("./middleware/authMiddleware");
const {
    authAccount,
    addUser,
    addOrg,
    logInUser,
    logInOrg,
    logout
} = require("./controllers/authController");
const {
    createApp,
    getAppStatus,
    getApp,
    getApps,
    submitApp,
    deleteApp
} = require("./controllers/applicationController");
const {
    getMemberStatus,
    addMembership
} = require("./controllers/memberController");
const {
    searchAdoptable,
    getOrgs,
    getUser
} = require("./controllers/searchController");
const {
    getOrgAnimals,
    getUserAnimals,
    addAnimal,
    removeAnimal
} = require("./controllers/animalController");
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
app.get("/auth/org", orgOnly, authAccount);
app.get("/auth/getcurrentuser", currentSession, authAccount);
app.post("/auth/register/user", addUser);
app.post("/auth/register/org", addOrg);
app.post("/auth/login/user", logInUser);
app.post("/auth/login/org", logInOrg);
app.post("/auth/logout", logout);

//Membership Endpoints
app.post("/api/memberstatus", getMemberStatus);
app.post("/api/members", addMembership);

//Search Endpoints
app.get("/api/search/adoptable", searchAdoptable);
app.get("/api/organizations", getOrgs);
app.post("/api/user", getUser);

//Application Endpoints
app.get("/api/orgapp", getApp);
app.post("/api/applications/org", getApps);
app.post("/api/appstatus", getAppStatus);
app.post("/api/createapplication", createApp);
app.post("/api/application", submitApp);
app.delete("/api/applications/:id", deleteApp);

//Animal Endpoints
app.get("/api/animals/org", getOrgAnimals);
app.get("/api/animals/user/:id", getUserAnimals);
app.post("/api/animals", addAnimal);
app.delete("/api/animals/:id", removeAnimal);

app.listen(port, console.log(`Listening on ${port}`));
