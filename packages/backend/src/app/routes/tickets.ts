import { Router } from "express";
import * as tickets from "../controllers/tickets";

const ticketsRouter = Router();

ticketsRouter.post("/", tickets.create);
ticketsRouter.get("/", tickets.findAll);
ticketsRouter.get("/:ticketId", tickets.findOne);
ticketsRouter.put("/:ticketId", tickets.update);
ticketsRouter.delete("/:deleteId", tickets.deleteTicket);

export default ticketsRouter;
