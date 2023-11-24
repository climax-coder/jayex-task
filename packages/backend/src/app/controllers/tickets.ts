import { Request, Response } from "express";
import TicketModel from "../models/Ticket";

export const create = async (req: Request, res: Response) => {
  if (!req.body.title) {
    return res.status(400).send({
      message: "Ticket title cannot be emply.",
    });
  }

  if (!req.body.list) {
    return res.status(400).send({
      message: "List id cannot be empty.",
    });
  }

  try {
    const ticket = new TicketModel(req.body);
    await ticket.save();
    res.status(201).send({
      message: "Ticket created successfully.",
      ticket,
    });
  } catch (error: any) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the ticket.",
    });
  }
};

export const findAll = async (req: Request, res: Response) => {
  try {
    const tickets = await TicketModel.find().populate("list tags").exec();
    res.send(tickets);
  } catch (error: any) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving tickets.",
    });
  }
};

export const findOne = async (req: Request, res: Response) => {
  try {
    const ticket = await TicketModel.findById(req.params.ticketId);
    if (!ticket) {
      res.status(404).send("No ticket found");
    } else {
      res.status(201).send(ticket);
    }
  } catch (error: any) {
    return res.status(500).send({
      message: `Error retrieving task with id ${req.params.ticketId}`,
    });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const ticket = await TicketModel.findByIdAndUpdate(
      req.params.ticketId,
      req.body,
      { new: true }
    );
    if (!ticket) {
      res.status(404).send("No ticket found");
    } else {
      res.send(ticket);
    }
  } catch (error: any) {
    res.status(400).send({
      message:
        error.message || `Error updating ticket with id ${req.params.ticketId}`,
    });
  }
};

export const deleteTicket = async (req: Request, res: Response) => {
  try {
    const deletedTicket = await TicketModel.findByIdAndRemove(
      req.params.deleteId
    );
    if (!deletedTicket) {
      res.status(404).send("No ticket found");
    } else {
      res.status(204).send(deletedTicket);
    }
  } catch (error: any) {
    res.status(500).send({
      message:
        error.message ||
        `Could not delete ticket with id ${req.params.deleteId}`,
    });
  }
};
