import express from 'express';
import cors from "cors";
import marketPlaceRoute from "./routes/marketplace.route.js"
import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", marketPlaceRoute)

app.listen(process.env.API_PORT, console.log(`Listening on http://localhost:${process.env.API_PORT}`));
