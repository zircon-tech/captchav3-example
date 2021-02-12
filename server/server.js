const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("isomorphic-fetch");
const cors = require("cors");

const app = express();
const port = 3002;
app.use(cors());
const SECRETE_KEY = "6LcYTlUaAAAAAHTJCB_xU_Ks5xutmKJZvnGlcKnO";

// app.use(express.static("public"));
app.use(bodyParser.json());
const handleSend = (req, res) => {
  const secret_key = SECRETE_KEY;
  const { token } = req.body;
  console.log("acaaaaa");
  console.log(token);
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;

  fetch(url, {
    method: "post",
  })
    .then((response) => response.json())
    .then((google_response) => res.json({ google_response }))
    .catch((error) => res.json({ error }));
};

app.post("/register", handleSend);

app.get("/", (req, res) => {
  console.log("aca");
  res.json("pepe");
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
