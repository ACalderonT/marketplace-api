const express = require('express');
const cors = require('cors');
const marketPlaceRoute = require("./routes/marketplace.route")
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", marketPlaceRoute)

app.listen(process.env.API_PORT, console.log(`Listening on http://localhost:${process.env.API_PORT}`));

module.exports = app;