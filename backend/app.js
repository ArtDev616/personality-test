
const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const router = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

// use router
app.use('/api', router);

module.exports = app;
