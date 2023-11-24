import express, { Express } from "express";
import cors from "cors";
import connectDB from "./src/db/database";
import mainRouter from "./src/app/routes";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT: string | number = process.env.PORT || 5000;

app.use(mainRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
