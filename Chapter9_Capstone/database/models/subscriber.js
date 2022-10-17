import { Schema, model, models } from "mongoose";

const subscriberSchema = new Schema({
  emailAddress: {
    type: Schema.Types.String,
    unique: true,
    required: true,
  },
  createdAt: {
    type: Schema.Types.Date,
    required: true,
  },
});

const Subscriber = models.Subscriber || model("Subscriber", subscriberSchema);

export default Subscriber;
