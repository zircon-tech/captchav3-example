import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { loadReCaptcha } from "react-recaptcha-v3";
import Register from "./register";
import { SITE_KEY } from "./config";

const App = () => {
  useEffect(() => {
    loadReCaptcha(SITE_KEY);
  }, []);

  return (
    <div className="App">
      <div className="row d-flex justify-content-center mt-5">
        <div className="col-6">
          <Register />
        </div>
      </div>
    </div>
  );
};

export default App;
