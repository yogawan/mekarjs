import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String, enum: ["ongoing", "completed"],
        default: "ongoing"
    },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);