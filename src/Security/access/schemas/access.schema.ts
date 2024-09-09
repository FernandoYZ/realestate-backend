import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { Actions } from "src/enums/actions.enum";
import { Status } from "src/enums/status.enum";

export type AccessDocument = Access & Document;

@Schema({ timestamps: true })
export class Access extends Document {
    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'Role',
        autopopulate: true
    })
    role: MongooseSchema.Types.ObjectId;

    @Prop({
        required: true,
        type: [{
            type: MongooseSchema.Types.ObjectId,
            ref: 'Permission',
            autopopulate: true
        }]
    })
    permissions: MongooseSchema.Types.ObjectId[];

    @Prop({
        type: [String],
        enum: Actions,
        default: []
    })
    actions: Actions[];

    @Prop({
        required: true,
        enum: Status,
        default: Status.pending
    })
    status: Status;
}

export const AccessSchema = SchemaFactory.createForClass(Access);
AccessSchema.plugin(require('mongoose-autopopulate'));
