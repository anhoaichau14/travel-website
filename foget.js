require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/forgot-password", (req, res) => {
  const { email } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset",
    text:
      "Click vào liên kết sau để đặt lại mật khẩu của bạn: https://yourdomain.com/reset-password?email=" +
      email,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Có lỗi xảy ra khi gửi email." });
    } else {
      console.log("Email sent: " + info.response);
      res
        .status(200)
        .json({ success: true, message: "Email xác nhận đã được gửi!" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
