import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import UserDash from "./components/Dashboards/UserDash";
import OrgDash from "./components/Dashboards/OrgDash";

export default (
    <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/dashboard/user" component={UserDash} />
        <Route path="/dashboard/org" component={OrgDash} />
        <Route exact path="/" component={Home} />
    </Switch>
);
