import mongoose from "mongoose";

const TechnologySchema = new mongoose.Schema({
  tech_stack_logo: { type: String, required: true },
  tech_stack: { type: String, required: true }
});

const SkillSchema = new mongoose.Schema({
  skill_logo: { type: String, required: true },
  skill: { type: String, required: true }
});

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    thumb: { type: String, required: true },
    description: { type: String, required: true },
    technologies: [TechnologySchema],
    features: [{ type: String }],
    skills_used: [SkillSchema],
    status: { type: String, enum: ["Completed", "In Progress"], required: true },
    image_url: { type: String, required: true },
    github_url: { type: String, default: "" },
    demo_url: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);