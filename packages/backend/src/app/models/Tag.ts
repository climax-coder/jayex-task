import { prop, getModelForClass } from "@typegoose/typegoose";

export class Tag {
  @prop({ required: true })
  public name!: string;
}

const TagModel = getModelForClass(Tag, {
  schemaOptions: { timestamps: true },
});

export default TagModel;
