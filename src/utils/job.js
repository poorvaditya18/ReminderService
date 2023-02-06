const cron = require("node-cron");
const emailService = require("../services/email-service");

const sender = require("../config/EmailConfig");

/*
    Q.How Cron Job Works ?
  -> There was Notification expected to send  at 10:00 am
  -> There was cron job for every 5 mins
  -> We will check are there any pending emails which was expected to be sent by now and is pending
*/

const setupJobs = () => {
  cron.schedule("*/2 * * * *", async () => {
    // console.log("running a task every five minutes");
    const response = await emailService.fetchPendingEmails();
    // once you fetch the pending emails .. this  response  will be arrray
    response.forEach((email) => {
      // TIP : since emailSerice Already take time to send email hence we are not using await here
      // emailService.sendBasicEmail(
      //   "ReminderService@airline.com",
      //   email.recepientEmail,
      //   email.subject,
      //   email.content
      // );

      // This sendMail(mailOptions,Callback())
      sender.sendMail(
        {
          to: email.recepientEmail,
          subject: email.subject,
          text: email.content,
        },
        async (err, data) => {
          if (err) {
            console.log(err);
          } else {
            // if the email is sent successfully then update the parameter
            console.log(data);
            await emailService.updateTicket(email.id, { status: "SUCCESS" });
          }
        }
      );
    });
    console.log(response);
  });
};

module.exports = setupJobs;
