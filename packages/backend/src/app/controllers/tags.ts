import { Request, Response } from "express";
import { TagModel } from "../models";

export const create = async (req: Request, res: Response) => {
  const existingTag = await TagModel.findOne({ name: req.body.name });
  if (existingTag) {
    return res.status(400).send({
      message: "A tag already exists.",
    });
  }

  const newTag = new TagModel({
    name: req.body.name,
  });

  try {
    const savedTag = await newTag.save();
    res.status(201).send({
      message: "Tag created successfully!",
      savedTag,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the tag.",
    });
  }
};

export const findAll = async (req: Request, res: Response) => {
  try {
    const tags = await TagModel.find();
    res.send(tags);
  } catch (error: any) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving tags.",
    });
  }
};

export const findOne = async (req: Request, res: Response) => {
  try {
    const tag = await TagModel.findById(req.params.tagId);
    if (!tag) {
      return res.status(404).send({
        message: `Tag not found with id ${req.params.tagId}`,
      });
    }
    res.send(tag);
  } catch (error: any) {
    if (error.kind === "ObjectId") {
      return res.status(404).send({
        message: `Tag not found with id ${req.params.tagId}`,
      });
    }
    return res.status(500).send({
      message:
        error.message || `Error retrieving tag with id ${req.params.tagId}`,
    });
  }
};

export const update = async (req: Request, res: Response) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "Tag name cannot be empty.",
    });
  }

  try {
    const tag = await TagModel.findById(req.params.tagId);

    if (!tag) {
      return res.status(404).send({
        message: `Tag not found with id ${req.params.tagId}`,
      });
    }

    tag.name = req.body.name;
    const result = await tag.save();
    res.status(200).send({
      message: "Tag updated",
      tag: result,
    });
  } catch (error: any) {
    res.status(400).send({
      message:
        error.message || `Error updating tag with id ${req.params.tagId}`,
    });
  }
};

export const deleteTag = async (req: Request, res: Response) => {
  try {
    const deletedTag = await TagModel.findByIdAndRemove(req.params.tagId);
    res.send(deletedTag);
  } catch (error: any) {
    res.status(500).send({
      message:
        error.message || `Could not delete tag with id ${req.params.tagId}`,
    });
  }
};
