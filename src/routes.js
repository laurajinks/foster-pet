import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import UserDash from "./components/Dashboards/UserDash";
import OrgDash from "./components/Dashboards/OrgDash";
import Adopt from "./components/Adopt/Adopt";
import ApplicationDash from "./components/Applications/ApplicationDash";
import CreateApplication from "./components/Applications/CreateApplication";
import CreateNewAnimal from "./components/FosterAnimals/CreateNewAnimal";
import OrgAnimals from "./components/FosterAnimals/OrgAnimals";

export default (
    <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/dashboard/user" component={UserDash} />
        <Route path="/dashboard/org" component={OrgDash} />
        <Route path="/org/animals/create" component={CreateNewAnimal} />
        <Route path="/org/animals" component={OrgAnimals} />
        <Route path="/adopt" component={Adopt} />
        <Route path="/org/applications/create" component={CreateApplication} />
        <Route path="/org/applications" component={ApplicationDash} />
        <Route exact path="/" component={Home} />
    </Switch>
);
