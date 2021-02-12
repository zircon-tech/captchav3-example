const dotenv = require("dotenv");

dotenv.config({ silent: true });
module.exports = {
  API_URL: process.env.REACT_APP_API_URL,
  API_PORT: process.env.REACT_APP_API_PORT,
  SITE_KEY: process.env.REACT_APP_SITE_KEY,
};
