import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import axios from "axios";

import PrivateRoute from "./Utils/PrivateRoute";
import PublicRoute from "./Utils/PublicRoute";
import { getToken, removeUserSession, setUserSession } from "./Utils/Common";

import Login from "./Login";
import Dashboard from "./Dashboard";
import Home from "./Home";
import Register from "./Register";
import BayarCukai from "./BayarCukai";
import NotFound from "./NotFound";

//import "./main.css";

function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios
      .get(`https://apisim.mps.gov.my/api/mymps/akaunbyic?nokp=930420145231`)
      .then((response) => {
        setUserSession(response.data[0].NOAKAUN, response.data[0].NAMA_PEMILIK);
        setAuthLoading(false);
      })
      .catch((error) => {
        removeUserSession();
        setAuthLoading(false);
      });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="content">
            <Switch>
              <Route exact path="/" component={Home} />
              <PublicRoute path="/login" component={Login} />
              <PublicRoute path="/daftar" component={Register} />
              <PublicRoute path="/bayarancukai" component={BayarCukai} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
