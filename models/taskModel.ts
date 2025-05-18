import mongoose, { Schema, models, model } from "mongoose";

export interface ITask {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  project: mongoose.Types.ObjectId;
  assignee?: mongoose.Types.ObjectId;
  status?: "todo" | "in-progress" | "done";
  dueDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    assignee: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
    },
    dueDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const TaskModel = models.Task || model<ITask>("Task", taskSchema);

export default TaskModel;
