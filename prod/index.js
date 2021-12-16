const express = require("express");
const { exec } = require("child_process");

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  console.log("Start develop");
  exec(
    "cd /app/prod-site && rm -rf /public && npx gatsby build --prefix-paths",
    (error, stdout, stderr) => {
      if (error) {
        console.error(`error: ${error.message}`);
        return;
      }

      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }

      console.log(`stdout:\n${stdout}`);
    }
  );
  res.status(200).end();
});

app.listen(port, () => {
  console.log(`Prod server listening at http://localhost:${port}`);
});
