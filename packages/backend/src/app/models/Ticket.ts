import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { List } from "./List";
import { Tag } from "./Tag";

export class Ticket {
  @prop({ required: true })
  public title!: string;

  @prop({ ref: () => List, required: true })
  public list!: Ref<List>;

  @prop({ ref: () => Tag, default: [] })
  public tags!: Ref<Tag>[];

  @prop({ required: true })
  public startDate!: Date;

  @prop({ required: true })
  public endDate!: Date;
}

const TicketModel = getModelForClass(Ticket, {
  schemaOptions: { timestamps: true },
});

export default TicketModel;
