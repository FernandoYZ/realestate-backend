import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Status } from "../../../enums/status.enum";

export type PermissionDocument = Permission & Document;

@Schema()
export class Permission extends Document {
    @Prop({ required: true, unique: true })
    module: string;

    @Prop({ required:false, default: 'Acceso al módulo' })
    description: string;

    @Prop({ required: true, enum: Status, default: Status.activated })
    status: Status;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
