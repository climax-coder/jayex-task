import { Router } from "express";
import ticketsRouter from "./tickets";
import tagsRouter from "./tags";
import listsRouter from "./lists";

const mainRouter = Router();

mainRouter.use("/tickets", ticketsRouter);
mainRouter.use("/tags", tagsRouter);
mainRouter.use("/lists", listsRouter);

export default mainRouter;
