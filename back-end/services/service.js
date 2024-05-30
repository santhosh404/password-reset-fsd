import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config()

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    },
  });
  
  // async..await is not allowed in global scope, must use a wrapper
  export default async function sendMail(emailId, passwordResetLink) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: process.env.USER, // sender address
      to: emailId, // list of receivers
      subject: "Reset Your Password", // Subject line
      html: `<h1>Click Here to reset your password</h1> <a href=${passwordResetLink}>${passwordResetLink}</a>`
    });
  
    return info;
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }