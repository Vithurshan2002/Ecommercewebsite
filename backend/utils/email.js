const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (options) => {
  const transport = {
   service:process.env.SERVICE,
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD,
    },
  };
  const transpoter = nodemailer.createTransport(transport);

  const message = {
    from: process.env.USER,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  const data= await transpoter.sendMail(message);
  console.log(data);
};

module.exports = sendEmail;
