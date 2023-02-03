const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config/serverConfig");

const { sendBasicEmail } = require("./services/email-service");

const setupAndStartServer = () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.listen(PORT, () => {
    console.log(`Server started on at port ${PORT}`);

    sendBasicEmail(
      "support@admin.com",
      "poorvaditya18@gmail.com",
      "Testing Mail",
      "Hey How Are You ?"
    );
  });
};

setupAndStartServer();
