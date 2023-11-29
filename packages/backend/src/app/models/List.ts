import { prop, getModelForClass } from "@typegoose/typegoose";

export class List {
  @prop({ required: true })
  public name!: string;
}

const ListModel = getModelForClass(List, {
  schemaOptions: { timestamps: true },
});

export default ListModel;
