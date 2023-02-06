const sender = require("../config/EmailConfig");
const TicketRepository = require("../repository/ticket-repository");
const repo = new TicketRepository();

// sendMail
const sendBasicEmail = async (mailFrom, mailTo, mailSubject, mailBody) => {
  try {
    // using nodemailer
    const response = sender.sendMail({
      from: mailFrom,
      to: mailTo,
      subject: mailSubject,
      text: mailBody,
    });
    // console.log(response); -> this will give smtp response object
  } catch (error) {
    console.log(error);
  }
};

const createNotification = async (data) => {
  try {
    const response = await repo.create(data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// We need to fetch all the emails that are pending and time < currentTime
const fetchPendingEmails = async () => {
  try {
    const response = await repo.get({ status: "PENDING" });
    return response;
  } catch (error) {
    console.log(error);
  }
};

// update status of the ticket
const updateTicket = async (ticketId, data) => {
  try {
    const response = await repo.update(ticketId, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendBasicEmail,
  fetchPendingEmails,
  createNotification,
  updateTicket,
};
