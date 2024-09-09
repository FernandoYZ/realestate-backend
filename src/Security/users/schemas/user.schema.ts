import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { Gender } from "src/enums/gender.enum";
import { Status } from "src/enums/status.enum";

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    lastname: string;

    @Prop({
        required: true,
        type: [{
            type: MongooseSchema.Types.ObjectId,
            ref: 'Access',
            autopopulate: {
                select: 'role permissions actions',
                populate: [
                    { path: 'role', select: 'name' },
                    { path: 'permissions', select: 'module' }
                ]
            }
        }]
    })
    access: MongooseSchema.Types.ObjectId[];

    @Prop({ required:true, unique: true, maxlength:8, minlength:8 })
    identity_document: number;

    @Prop({ required:true, enum: Gender, default: [] })
    gender: string;

    @Prop({ required:true, unique:true })
    email: string;

    @Prop({ required:true, minlength: 8 })
    password: string;

    @Prop({ required: true, enum: Status, default: Status.activated})
    status: Status;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(require('mongoose-autopopulate'));