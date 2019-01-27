require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const { json } = require("body-parser");
const cors = require("cors");
const port = process.env.PORT;
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
    logout,
    updateUser,
    updateOrg
} = require("./controllers/authController");
const {
    createApp,
    getAppStatus,
    getApp,
    getApps,
    submitApp,
    deleteApp,
    addAnimalApp,
    animalAppPending,
    removeAnimalApp,
    acceptAnimal,
    getOrgAnimalApps,
    getAppCount,
    getAnimalAppCount
} = require("./controllers/applicationController");
const {
    getMemberStatus,
    addMembership,
    getCurrentFosters,
    deleteFoster,
    getOrgMemberships
} = require("./controllers/memberController");
const {
    searchAdoptable,
    getShelterInfo,
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
    removeFosterParent,
    getUserPending,
    updateAnimal,
    getUserAnimalCount,
    getUserPastAnimalCount
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
app.put("/auth/update/user", updateUser);
app.put("/auth/update/org", updateOrg);

//MEMBERSHIP ENDPOINTS
app.post("/api/memberstatus", getMemberStatus);
app.post("/api/memberships", getOrgMemberships);
app.post("/api/members", addMembership);
app.post("/api/org/members", getCurrentFosters);
app.delete("/api/org/members/:id", deleteFoster);

//SEARCH ENDPOINTS
app.get("/api/search/adoptable", searchAdoptable);
app.post("/api/search/shelter", getShelterInfo);
app.post("/api/organizations", getOrgs);
app.post("/api/user", getUser);
app.post("/api/org", getOrgData);

//APPLICATION ENDPOINTS
app.get("/api/orgapp", getApp);
app.get("/api/applications/org/count", getAppCount);
app.get("/api/applications/org/animalcount", getAnimalAppCount);
app.post("/api/applications/org", getApps);
app.post("/api/appstatus", getAppStatus);
app.post("/api/animal/application", addAnimalApp);
app.post("/api/animal/application/accept", acceptAnimal);
app.put("/api/animal/application", animalAppPending);
app.post("/api/animal/application/delete", removeAnimalApp);
app.put("/api/createapplication", createApp);
app.post("/api/application", submitApp);
app.delete("/api/applications/:id", deleteApp);
app.get("/api/animal/applications", getOrgAnimalApps);

//ANIMAL ENDPOINTS
app.get("/api/animals/org", getOrgAnimals);
app.post("/api/animals/user", getUserAnimals);
app.post("/api/animalcount", getUserAnimalCount);
app.post("/api/pastanimalcount", getUserPastAnimalCount);
app.get("/api/animals/user/eligible", getEligibleAnimals);
app.get("/api/animals/user/pending", getUserPending);
app.post("/api/animals", addAnimal);
app.put("/api/animals", updateAnimal);
app.put("/api/animals/fosterparent", addFosterParent);
app.put("/api/animals/org/fosterparent", removeFosterParent);
app.delete("/api/animals/:id", removeAnimal);

//BLOG ENDPOINTS
app.post("/api/blog", writePost);
app.post("/api/blog/org", getPosts);
app.post("/api/blog/member", getMemberPosts);
app.put("/api/blog/org", updateBlog);

app.listen(port, console.log(`Listening on ${port}`));
