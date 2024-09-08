import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Status } from "../../../enums/status.enum";

export type PermissionDocument = Permission & Document;

@Schema({ timestamps: true })
export class Permission extends Document {
    @Prop({ required: true, unique: true, index:true })
    module: string;

    @Prop({ required:true})
    submodule: string

    @Prop({ required:false, default: 'Acceso al módulo' })
    description: string;

    @Prop({ required: true, enum: Status, default: Status.pending })
    status: Status;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
PermissionSchema.index({ module:1 });
