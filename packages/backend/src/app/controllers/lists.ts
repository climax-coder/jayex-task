import { Request, Response } from "express";
import { ListModel } from "../models";

export const create = async (req: Request, res: Response) => {
  const existingList = await ListModel.findOne({ name: req.body.name });
  if (existingList) {
    return res.status(400).send({
      message: "A list already exists.",
    });
  }

  const count = await ListModel.countDocuments();

  const newList = new ListModel({
    name: req.body.name,
    order: count + 1,
  });

  try {
    const savedList = await newList.save();
    res.status(201).send({
      message: "List created successfully!",
      savedList,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the list.",
    });
  }
};

export const findAll = async (req: Request, res: Response) => {
  try {
    const lists = await ListModel.find();
    res.send(lists);
  } catch (error: any) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving lists.",
    });
  }
};

export const findOne = async (req: Request, res: Response) => {
  try {
    const list = await ListModel.findById(req.params.listId);
    if (!list) {
      return res.status(404).send({
        message: `List not found with id ${req.params.listId}`,
      });
    }
    res.send(list);
  } catch (error: any) {
    if (error.kind === "ObjectId") {
      return res.status(404).send({
        message: `List not found with id ${req.params.listId}`,
      });
    }
    return res.status(500).send({
      message:
        error.message || `Error retrieving list with id ${req.params.listId}`,
    });
  }
};

export const findLowestOrder = async (req: Request, res: Response) => {
  try {
    const list = await ListModel.find({}).sort({ order: 1 }).limit(1);
    if (!list || list.length === 0) {
      return res.status(404).send({
        message: "No list found",
      });
    }
    res.send(list[0]);
  } catch (error: any) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving the list.",
    });
  }
};

export const update = async (req: Request, res: Response) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "List name cannot be empty.",
    });
  }

  try {
    const list = await ListModel.findById(req.params.listId);

    if (!list) {
      return res.status(404).send({
        message: `List not found with id ${req.params.listId}`,
      });
    }

    list.name = req.body.name;
    const result = await list.save();
    res.status(200).send({
      message: "List updated",
      list: result,
    });
  } catch (error: any) {
    res.status(400).send({
      message:
        error.message || `Error updating list with id ${req.params.listId}`,
    });
  }
};

export const deleteList = async (req: Request, res: Response) => {
  try {
    const deletedList = await ListModel.findByIdAndRemove(req.params.listId);
    res.send(deletedList);
  } catch (error: any) {
    res.status(500).send({
      message:
        error.message || `Could not delete list with id ${req.params.listId}`,
    });
  }
};
