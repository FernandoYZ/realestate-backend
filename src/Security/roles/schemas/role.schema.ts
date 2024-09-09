import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Status } from "../../../enums/status.enum";

export type RoleDocument = Role & Document;

@Schema()
export class Role extends Document {
    @Prop({ required: true, unique: true, index: true })
    name: string;

    @Prop({ required: false, default: "Descripción del rol a ejercer" })
    description: string;

    @Prop({ required: true, enum: Status, default: Status.pending })
    status: Status;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
