const express = require('express');
const cors = require('cors');
const marketPlaceRoute = require("./routes/marketplace.route")
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", marketPlaceRoute)

const BASE_URL = process.env.NODE_ENV === "production" ? process.env.APP_URL : `${process.env.LOCAL_URL}:${process.env.API_PORT}`
app.listen(process.env.API_PORT, console.log(`\n\x1b[7mListening on ${BASE_URL}\x1b[0m`));

module.exports = app;