const nodemailer = require("nodemailer");
require("dotenv").config();

const uId = process.env.MAIL_ADDRESS;

async function sendMail(sendTOId, sendSubject, sendText) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: uId,
      pass: process.env.MAIL_PASSWORD
    }
  });
  let mailOptions = {
    from: uId,
    to: sendTOId,
    subject: sendSubject,
    html: sendText
  };

  await transporter.sendMail(mailOptions, function (err, info) {
    if (err) return err;
    else {
      console.log(info);
      return info;
    }
  });
}
exports.sendMail = sendMail;
