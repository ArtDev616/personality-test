
const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const router = require("./routes");

const app = express();

// use router
app.use('/api', router);

app.use(cors());
app.use(express.json());

module.exports = app;
