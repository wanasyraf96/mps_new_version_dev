import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import axios from "axios";

import PrivateRoute from "./Utils/PrivateRoute";
import PublicRoute from "./Utils/PublicRoute";
import { getToken, getNOKP, getUser, removeUserSession, setUserSession } from "./Utils/Common";

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
    const nokp = getNOKP();
    if (!nokp) {
      return;
    }

    fetch(`https://apisim.mps.gov.my/api/mymps/akaunbyic?nokp=` + nokp)
    .then(response => response.json())
    .then((result) => {
      //setUserSession(response.data[0].NOAKAUN, response.data[0].NAMA_PEMILIK);
      setUserSession(btoa(result), result[0].NAMA_PEMILIK, nokp);
      setAuthLoading(false);
    })
    .catch((error) => {
      console.log(error)
      removeUserSession();
      //setAuthLoading(false);
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
