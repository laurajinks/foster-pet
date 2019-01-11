import React, { Component } from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import routes from "./routes";
import "./App.css";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Switch>{routes}</Switch>
                </div>
            </Router>
        );
    }
}

export default App;
