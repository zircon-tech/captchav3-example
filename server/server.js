const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const dotenv = require('dotenv');

const dotenvResult = dotenv.config({
  path: './.env',
});
if (dotenvResult.error) {
  console.error(`Error: vars() - ${dotenvResult.error.message}`);
}

const port = parseInt(process.env.PORT, 10);

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.post(
  "/register",
  async (req, res) => {
    const secret_key = process.env.RECAPTCHA_SECRET_KEY;
    const { token } = req.body;
    console.log(token);
    let captchaResponse;
    try {
      captchaResponse = await axios({
        url: `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`,
        method: "POST",
      });
    } catch (err) {
      res.json({ err });
      return;
    }
    res.json({ google_response: captchaResponse.data });
  }
);
app.listen(port, () => console.log(`Listening on port ${port}!`));
