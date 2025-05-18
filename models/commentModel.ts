import mongoose, { Schema, models, model } from "mongoose";

export interface IComment {
  _id?: mongoose.Types.ObjectId;
  content: string;
  task: mongoose.Types.ObjectId;
  author: mongoose.Types.ObjectId;
  parentComment?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const commentSchema = new Schema<IComment>(
  {
    content: {
      type: String,
      required: true,
    },
    task: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    parentComment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  { timestamps: true }
);

const CommentModel =
  models.Comment || model<IComment>("Comment", commentSchema);

export default CommentModel;
