import nodemailer from "nodemailer";

const sendMail = async (to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "ishtiaquddin119@gmail.com",
      pass: "iqmj lwuj hlgd tvbk",
    },
  });

  await transporter.sendMail({
    from: "Book Shop 😎", // sender addres
    to, 
    subject, 
    text: "Hello world?", 
    html,
  });
};

export default sendMail;
