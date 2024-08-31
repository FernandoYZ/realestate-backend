import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import { Status } from "../dto/create-permission.dto";

export type PermissionDocument = Permission & Document;

@Schema()
class Submodule {
    @Prop({ required: true, default: () => uuidv4() })
    id: string;

    @Prop({ required: true })
    name: string;
}

const SubmoduleSchema = SchemaFactory.createForClass(Submodule);

@Schema()
export class Permission extends Document {
    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;

    @Prop({ required: true, unique: true, index: true })
    module: string;

    @Prop({ type: [SubmoduleSchema], required: true })
    submodules: Submodule[];

    @Prop({ required: true, enum: Status, default: Status.activated })
    status: Status;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);