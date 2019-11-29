import { createTransport } from "nodemailer";
import config from "../config";

const { email } = config;

export const sendEmail = options => {
  const transporter = createTransport({
    host: email.host,
    port: email.port,
    auth: {
      user: email.user,
      pass: email.pass
    }
  });

  const mailOptions = {
    from: "NATOURS <no-reply@natours.com>",
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  return transporter.sendMail(mailOptions);
};
