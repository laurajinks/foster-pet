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
    addMembership,
    getCurrentFosters,
    deleteFoster
} = require("./controllers/memberController");
const {
    searchAdoptable,
    getOrgs,
    getUser,
    getOrgData
} = require("./controllers/searchController");
const {
    getOrgAnimals,
    getUserAnimals,
    addAnimal,
    removeAnimal,
    getEligibleAnimals,
    addFosterParent,
    removeFosterParent
} = require("./controllers/animalController");
const {
    writePost,
    getPosts,
    getMemberPosts,
    updateBlog
} = require("./controllers/blogController");
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

//AUTHENTICATION ENDPOINTS
app.get("/auth/user", usersOnly, authAccount);
app.get("/auth/org", orgOnly, authAccount);
app.get("/auth/getcurrentuser", currentSession, authAccount);
app.post("/auth/register/user", addUser);
app.post("/auth/register/org", addOrg);
app.post("/auth/login/user", logInUser);
app.post("/auth/login/org", logInOrg);
app.post("/auth/logout", logout);

//MEMBERSHIP ENDPOINTS
app.post("/api/memberstatus", getMemberStatus);
app.post("/api/members", addMembership);
app.post("/api/org/members", getCurrentFosters);
app.delete("/api/org/members/:id", deleteFoster);

//SEARCH ENDPOINTS
app.get("/api/search/adoptable", searchAdoptable);
app.get("/api/organizations", getOrgs);
app.post("/api/user", getUser);
app.post("/api/org", getOrgData);

//APPLICATION ENDPOINTS
app.get("/api/orgapp", getApp);
app.post("/api/applications/org", getApps);
app.post("/api/appstatus", getAppStatus);
app.post("/api/createapplication", createApp);
app.post("/api/application", submitApp);
app.delete("/api/applications/:id", deleteApp);

//ANIMAL ENDPOINTS
app.get("/api/animals/org", getOrgAnimals);
app.post("/api/animals/user", getUserAnimals);
app.get("/api/animals/user/eligible", getEligibleAnimals);
app.post("/api/animals", addAnimal);
app.put("/api/animals/fosterparent", addFosterParent);
app.put("/api/animals/org/fosterparent", removeFosterParent);
app.delete("/api/animals/:id", removeAnimal);

//BLOG ENDPOINTS
app.post("/api/blog", writePost);
app.post("/api/blog/org", getPosts);
app.post("/api/blog/member", getMemberPosts);
app.put("/api/blog/org", updateBlog);

app.listen(port, console.log(`Listening on ${port}`));
