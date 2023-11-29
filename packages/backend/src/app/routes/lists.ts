import { Router } from "express";
import * as lists from "../controllers/lists";

const listsRouter = Router();

listsRouter.post("/", lists.create);
listsRouter.get("/", lists.findAll);
listsRouter.get("/lowest-list", lists.findLowestList);
listsRouter.get("/:listId", lists.findOne);
listsRouter.put("/:listId", lists.update);
listsRouter.delete("/:listId", lists.deleteList);

export default listsRouter;
