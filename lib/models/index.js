import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProjectSchema = new Schema({
  name: { type: String, required: true, index: true },
  token: { type: String },
  user: { type: String, required: true, index: true },
  created: { type: Date, default: Date.now },
  repositories: [{ type: String }],
});

export default ProjectSchema;
