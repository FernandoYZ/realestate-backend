import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    lastname: string;

    @Prop({ required:true })
    identity_document: number;

    @Prop({ required:false, enum: ['Masculino', 'Femenino', 'Otros'] })
    gender: string;

    @Prop({ required:true, unique:true })
    email: string;

    @Prop({ required:true })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
