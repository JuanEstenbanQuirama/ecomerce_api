// importar nodemailer
const nodemailer = require("nodemailer");
require("dotenv").config();

// crear el transporter
const transporter = nodemailer.createTransport({ // admite dos parametros
  host: "smtp.gmail.com", // send mail transfer protocol (estou usando servicio de google gmail)
  port: 465, // (por gmail)
  secure: true,
  auth: {
    user: process.env.G_USER,
    pass: process.env.G_PASSWORD,
  },
});

// exportar el transporter
module.exports = transporter;
