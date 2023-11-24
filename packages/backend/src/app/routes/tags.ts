import { Router } from "express";
import * as tags from "../controllers/tags";

const tagsRouter = Router();

tagsRouter.post("/", tags.create);
tagsRouter.get("/", tags.findAll);
tagsRouter.get("/:tagId", tags.findOne);
tagsRouter.put("/:tagId", tags.update);
tagsRouter.delete("/:tagId", tags.deleteTag);

export default tagsRouter;
