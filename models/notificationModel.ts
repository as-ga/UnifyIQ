import mongoose, { Schema, models, model } from "mongoose";

export interface INotification {
  _id?: mongoose.Types.ObjectId;
  type: "task-assigned" | "task-updated" | "comment" | "project-invite";
  message: string;
  user: mongoose.Types.ObjectId;
  project?: mongoose.Types.ObjectId;
  task?: mongoose.Types.ObjectId;
  read?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    type: {
      type: String,
      enum: ["task-assigned", "task-updated", "comment", "project-invite"],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    task: {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const NotificationModel =
  models.Notification ||
  model<INotification>("Notification", notificationSchema);

export default NotificationModel;
