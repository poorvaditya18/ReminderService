const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config/serverConfig");

const db = require("./models/index"); 

const TicketController = require("./controllers/ticket-controller");
// const { sendBasicEmail } = require("./services/email-service");

const jobs = require("./utils/job");

const setupAndStartServer = () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.post("/api/v1/tickets", TicketController.create);

  app.listen(PORT, () => {
    console.log(`Server started on at port ${PORT}`);
    jobs();
    // sendBasicEmail(
    //   "support@admin.com",
    //   "poorvaditya18@gmail.com",
    //   "Testing Mail",
    //   "Hey How Are You ?"
    // );

    // CRON JOBS
    // cron.schedule("*/2 * * * *", () => {
    //   console.log("running a task every two minutes");
    // });

    // if (process.env.DB_SYNC) {
    //   db.sequelize.sync({ alter: true });
    // }
  });
};

setupAndStartServer();
