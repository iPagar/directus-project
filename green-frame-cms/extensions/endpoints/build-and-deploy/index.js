const http = require("http");

module.exports = function registerEndpoint(router) {
  router.get("/deploy-production", async (req, res) => {
    http
      .get("http://gatsby-prod:3000/", (resp) => {
        // A chunk of data has been received.
        resp.on("data", (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", (data) => {
          console.log(data);
          res.status(200).end();
        });
      })
      .on("error", (err) => {
        console.log("Error: " + err.message);
        res.status(500).end();
      });
  });
};
