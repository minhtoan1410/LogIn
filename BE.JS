const nodemailer = require("nodemailer");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
let users = [];
let pendingUsers = {};

app.post("/register", async function (req, res) {
  const { us, pa, gm } = req.body;
  if (gm.length <= 10 || !gm.endsWith("@gmail.com")) {
    return res.status(400).json({ success: false, msg: "Invalid gmail" });
  }
  if (users.find((u) => u.username == us)) {
    return res.status(400).json({ success: false, msg: "Username exists" });
  }
  if (users.find((u) => u.gmail == gm)) {
    return res.status(400).json({ success: false, msg: "Gmail exists" });
  }
  let otpCode = Math.floor(Math.random() * 90000 + 10000)
    .toString()
    .padStart(5, "0");
  let userTmp = {
    user: us,
    password: pa,
    otp: otpCode,
  };
  pendingUsers[gm] = userTmp;
  res.json({ success: false, sg: "Mã OTP đã gửi" });
});

// async function sendData() {
//   const mapRes = await fetch("http://localhost:8080/userMap");
//   const userMap = await mapRes.json();
//   const dataRes = await fetch("http://localhost:8080/userData");
//   const userData = await dataRes.json();
//   const n = userData.length;
//   const userAccount = {
//     id: userData.length,
//     name: us,
//     password: pa,
//     gmail: gm,
//   };
//   userMap[us] = userData.length;
//   const sendUserData = await fetch("http://localhost:8080/userData", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(userAccount),
//   });
//   const sendUserMap = await fetch("http://localhost:8080/userMap", {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(userMap),
//   });
// }

// async function sendMail(mail, otpCode) {
//   const transport = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "phanminht971@gmail.com",
//       pass: "ubud caaj kygd xbrz",
//     },
//   });
//   await transport.sendMail({
//     from: "phanminht971@gmail.com",
//     to: mail,
//     subject: "Mã OTP của bạn",
//     text: `Mã OTP của bạn là ${OTP}`,
//   });
// }

// async function checkData() {
//   let us = document.querySelector("#user").value;
//   let pa = document.querySelector("#pass").value;
//   const mapRes = await fetch("http://localhost:8080/userMap");
//   const userMap = await mapRes.json();
//   const dataRes = await fetch("http://localhost:8080/userData");
//   const userData = await dataRes.json();
//   const idx = userMap[us];
//   console.log(userData[idx]);
//   if (idx !== undefined) {
//     if (pa === userData[idx].password) {
//       alert("Login succesfully");
//     } else {
//       alert("Wrong Username or Password");
//     }
//   } else {
//     alert("Wrong Username or Password");
//   }
// }
