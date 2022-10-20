import { Schema, model, models } from "mongoose";

const commentSchema = new Schema({
  text: {
    type: Schema.Types.String,
    required: true,
  },
  eventId: {
    type: Schema.Types.String,
    required: true,
  },
  createdAt: {
    type: Schema.Types.Date,
    required: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
  },
  name: {
    type: Schema.Types.String,
    required: true,
  },
});

const Comment = models.Comment || model("Comment", commentSchema);

export default Comment;
