const http = require("http");

module.exports = function registerEndpoint(router) {
  router.get("/deploy-production", async (req, res) => {
    http
      .get("http://gatsby-prod:3000/", (data) => {
        // A chunk of data has been received.
        resp.on("data", (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          console.log(JSON.parse(data).explanation);
          res.status(200).end();
        });
      })
      .on("error", (err) => {
        console.log("Error: " + err.message);
        res.status(500).end();
      });
  });
};
