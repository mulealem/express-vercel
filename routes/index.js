const { Router } = require("express");
const { SuccessResponseObject } = require("../common/http");
const demo = require("./demo.route");

const request = require("request");
const ip = require("ip");

const r = Router();

r.use("/demo", demo);

r.get("/", (req, res) => {
  res.send({
    ip: ip.address(),
  });
});

r.get("/:id", (req, res) => {
  // Make a request to the other API

  const loaded_tin = req.params.id;

  // const loaded_tin = "0016086049";
  const url =
    "https://etrade.gov.et/api/Registration/GetRegistrationInfoByTin/" +
    loaded_tin +
    "/et";

  const referer = "https://etrade.gov.et/business-license-checker";
  const options = {
    url: url,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Accept-Charset": "utf-8",
      referer: referer,
    },
  };

  request(options, (err, response, body) => {
    if (err) {
      // Handle the error
      console.log(err);
      res.status(500).send("Error calling other API");
      return;
    }

    // Send the response from the other API to the client
    res.send({ response: JSON.parse(body) });
  });
});

module.exports = r;
