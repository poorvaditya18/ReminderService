const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config/serverConfig");

const EmailService = require("./services/email-service");
const { createChannel, subscribeMessage } = require("./utils/messageQueue");
const { REMINDER_BINDING_KEY } = require("./config/serverConfig");

const db = require("./models/index");

const TicketController = require("./controllers/ticket-controller");

const jobs = require("./utils/job");

const setupAndStartServer = async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.post("/api/v1/tickets", TicketController.create);

  const channel = await createChannel();
  subscribeMessage(channel, EmailService.subscribeEvents, REMINDER_BINDING_KEY);

  app.listen(PORT, () => {
    console.log(`Server started on at port ${PORT}`);

    // jobs();
  });
};

setupAndStartServer();
