import express from 'express';
import cors from "cors";
import 'dotenv/config';

const app = express();

app.use(express.json()); 

app.listen(process.env.API_PORT, console.log(`Listening on http://localhost:${process.env.API_PORT}`));
