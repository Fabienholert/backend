const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("requete reçu!");
  next();
});

app.use((req, res, next) => {
  res.status(201);
});

app.use((req, res, next) => {
  res.json({ message: "message a bien été recu!!" });
});

module.exports = app;
