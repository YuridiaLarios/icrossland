const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/user-model");
const jwt = require("express-jwt");
const jwtAuthz = require("express-jwt-authz");
const jwksRsa = require("jwks-rsa");
const axios = require("axios");

// history data seed data
let history = {
  "2019-05-07": {
    open: "205.88",
    close: "202.86",
    high: "207.42",
    low: "200.83",
    volume: "38763698"
  },
  "2019-05-06": {
    open: "204.29",
    close: "208.48",
    high: "208.84",
    low: "203.50",
    volume: "32443113"
  },
  "2019-05-03": {
    open: "210.89",
    close: "211.75",
    high: "211.84",
    low: "210.23",
    volume: "20892378"
  },
  "2019-05-02": {
    open: "209.84",
    close: "209.15",
    high: "212.65",
    low: "208.13",
    volume: "31996324"
  },
  "2019-05-01": {
    open: "209.88",
    close: "210.52",
    high: "215.31",
    low: "209.23",
    volume: "64827328"
  }
};

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 50,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"]
});

/*************************************
 ROUTES FOR TESTING PURPOSES
**************************************/

router.get("/", async function(req, res) {
  await axios
    .get(
      "https://www.worldtradingdata.com/api/v1/stock?symbol=AAPL,MSFT,HSBA.L&api_token=demo"
    )
    .then(response => res.json(response.data.data))
    .catch(error => res.json(error));
});

// router.get("/history", async function(req, res) {
//   await axios.get(`https://www.worldtradingdata.com/api/v1/history?symbol=AAPL&date_from=2019-05-01&sort=newest&api_token=${WTD_API}`).then((response) => res.json(response.data.history)).catch(error => res.json(error));
// });

router.get("/history", async function(req, res) {
  // await axios.get(`https://www.worldtradingdata.com/api/v1/history?symbol=AAPL&date_from=2019-05-01&sort=newest&api_token=${WTD_API}`).then((response) => res.json(response.data.history)).catch(error => res.json(error));
  res.json(history);
});

module.exports = router;
