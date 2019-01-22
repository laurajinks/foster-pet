import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import UserProfile from "./components/Profiles/UserProfile";
import OrgProfile from "./components/Profiles/OrgProfile";
import UserDash from "./components/Dashboards/UserDash";
import OrgDash from "./components/Dashboards/OrgDash";
import BlogHome from "./components/Blog/BlogHome";
import CreatePost from "./components/Blog/CreatePost";
import Adopt from "./components/Adopt/Adopt";
import ApplicationDash from "./components/Applications/ApplicationDash";
import CreateApplication from "./components/Applications/CreateApplication";
import CreateNewAnimal from "./components/FosterAnimals/CreateNewAnimal";
import OrgAnimals from "./components/FosterAnimals/OrgAnimals";
import FindGroups from "./components/FindGroups/FindGroups";
import UserAnimals from "./components/FosterAnimals/UserAnimals";
import UserNewsFeed from "./components/Blog/UserNewsFeed";
import CurrentFosters from "./components/Profiles/CurrentFosters";

export default (
    <Switch>
        {/* user routes */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/profile/user/:id" component={UserProfile} />
        <Route path="/profile/org/:id" component={OrgProfile} />
        <Route exact path="/" component={Home} />

        {/* dashboards */}
        <Route path="/dashboard/user" component={UserDash} />
        <Route path="/dashboard/org" component={OrgDash} />

        {/* animals */}
        <Route path="/org/animals/create" component={CreateNewAnimal} />
        <Route path="/org/animals" component={OrgAnimals} />
        <Route path="/user/animals" component={UserAnimals} />
        <Route path="/adopt" component={Adopt} />

        {/* applications/memberships */}
        <Route path="/org/applications/create" component={CreateApplication} />
        <Route path="/org/applications" component={ApplicationDash} />
        <Route path="/org/currentfosters" component={CurrentFosters} />
        <Route path="/organizations" component={FindGroups} />

        {/* blog */}
        <Route path="/user/newsfeed" component={UserNewsFeed} />
        <Route path="/org/blog/create" component={CreatePost} />
        <Route path="/org/blog" component={BlogHome} />
    </Switch>
);
