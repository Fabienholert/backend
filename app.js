const express = require("express");
const app = express();
const mongoose = require("mongoose");

const Book = require("./models/Book.js");

mongoose
  .connect(
    "mongodb+srv://fabienholert:Leonie2014!@cluster0.rmcmj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(express.json());

app.post("/api/books", (req, res, next) => {
  delete req.body._id;
  const book = new Book({
    ...req.body,
  });
  book
    .save()
    .then(() => res.status(201).json({ message: "livre enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
  next();
});

app.use("/api/books", (req, res, next) => {});

module.exports = app;
