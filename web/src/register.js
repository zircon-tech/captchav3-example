import React, { useState, useRef } from "react";
import { ReCaptcha } from "react-recaptcha-v3";
import { API_URL, API_PORT, SITE_KEY } from "./config";
import axios from "axios";

const API_URL_PORT = `${API_URL}:${API_PORT}`;

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const reCaptchaRef = useRef(null);

  const handleRegister = () => {
    reCaptchaRef.current.execute();
    var data = {
      nombre,
      token: recaptchaToken,
    };
    axios({
      url: `${API_URL_PORT}/register`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data,
    })
      .then(({ data }) => {
        const { google_response } = data;
        if (google_response && google_response.success) {
          const { score } = google_response;
          if (score > 0.5) {
            console.log("Allowed!! redirect to the home!!!");
          } else {
            console.log(console.log("Score lower than 0.5"));
          }
        }
      })
      .catch(({ err }) => {
        console.log("error", err);
      });
  };

  return (
    <>
      <ReCaptcha
        ref={(node) => {
          reCaptchaRef.current = node;
        }}
        sitekey={SITE_KEY}
        action="register"
        verifyCallback={(recaptchaToken) => {
          console.log("recaptcha-token ==>", recaptchaToken);
          setRecaptchaToken(recaptchaToken);
        }}
      />
      <div className="form-group">
        <input
          className="form-control"
          name="nombre"
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
          type="text"
          value={nombre}
        />
      </div>
      <button
        type="button"
        className="btn btn-success"
        onClick={handleRegister}
        disabled={recaptchaToken === ""}
      >
        Register
      </button>
    </>
  );
};

export default Register;
