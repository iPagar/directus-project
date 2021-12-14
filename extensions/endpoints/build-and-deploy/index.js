const util = require("util");
const exec = util.promisify(require("child_process").exec);

module.exports = function registerEndpoint(router) {
  router.get("/deploy-production", async (req, res) => {
    await exec(
      "cd my-gatsby-site && gatsby build && rm -rf /home/bob/www/my-gatsby-site && cp -r ./public /home/bob/www/my-gatsby-site"
    );
    res.status(200).end();
  });
};
