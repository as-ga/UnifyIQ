import mongoose, { Schema, models, model } from "mongoose";

export interface IProject {
  _id?: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  image?: string;
  owner: mongoose.Types.ObjectId;
  members?: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const projectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);
const projectModel =
  models.Project || model<IProject>("Project", projectSchema);

export default projectModel;
