import mongoose from 'mongoose';

// 1. Define what a "User" (Admin) looks like
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// 2. Define what a "Project" looks like
const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: { type: String, enum: ['video', 'design'], required: true },
  media: [String], // An array of image/video URLs
  tools: [String], // e.g. ["After Effects", "Photoshop"]
  tags: [String],  // e.g. ["Commercial", "3D"]
  visible: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

// 3. Export them so we can use them in other files
export const User = mongoose.models.User || mongoose.model('User', UserSchema);
export const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);