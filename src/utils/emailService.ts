import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config({
  path: path.join(__dirname, "../../.env"),
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    const mailOptions = {
      from: `"PharmaRx Support" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
