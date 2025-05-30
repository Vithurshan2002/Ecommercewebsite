const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (options) => {
  const transport = {
    host: process.env.HOST,
    port: Number(process.env.MAILPORT),
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD,
    },
  };
  const transpoter = nodemailer.createTransport(transport);

  const message = {
    from: `${process.env.FROMNAME} <${process.env.FROMMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  const data= await transpoter.sendMail(message);
  console.log(data);
};

module.exports = sendEmail;
