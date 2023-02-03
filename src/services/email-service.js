const sender = require("../config/EmailConfig");

const sendBasicEmail = async (mailFrom, mailTo, mailSubject, mailBody) => {
  try {
    const response = sender.sendMail({
      from: mailFrom,
      to: mailTo,
      subject: mailSubject,
      text: mailBody,
    });
    // console.log(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendBasicEmail };
