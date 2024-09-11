import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';
import { User } from 'src/security/users/schemas/user.schema';

export type TokenDocument = Token & Document;

@Schema({ timestamps: true })
export class Token extends Document {
  @Prop({ 
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
    required: true,
    autopopulate: {
      select: 'name lastname ips',
    }
  })
  user: User;

  @Prop({ required: true, unique: true })
  token: string;

  @Prop({ required: true })
  expiresAt: Date;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
TokenSchema.plugin(require('mongoose-autopopulate'));
