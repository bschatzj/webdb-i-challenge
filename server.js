const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get("/accounts", (req, res) => {
    db.select("*").from("accounts").then(accounts => res.status(200).json(accounts))
    .catch(error => res.status(500).json({ message: "Couldn't get account"}))
})
server.get("/accounts/:id", (req, res) => {
    const ID = req.params.id;
    db.select("*").from("accounts").where({ID}).then(account => res.status(200).json(account));
})
server.post("/accounts", (req, res) => {
    db("accounts").insert(req.body).then(account=>res.status(200).json(account))
    .catch(error => res.status(500).json({ message: "Couldn't update account"}))
})
server.put("/accounts/:id", (req, res) => {
    const ID = req.params.id;
    db("accounts").where({ID}).update(req.body)
    .then(account => res.status(200).json(account))
    .catch(error => res.status(500).json({message: "Couldn't update account"}))
})
server.delete("/accounts/:id", (req, res) => {
    const ID = req.params.id;
    db("accounts").where({ID}).del().then(account => res.status(200).json({message: "Account was deleted"}))
    .catch(err => res.status(500).json({message: "Couldn't delete account"}))
})

module.exports = server;