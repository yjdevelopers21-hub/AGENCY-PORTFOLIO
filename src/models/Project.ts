import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  category: string;
  description: string;
  longDescription?: string;
  client?: string;
  timeline?: string;
  services?: string[];
  image: string;
  accentColor?: string;
  href?: string;
  tags: string[];
  featured: boolean;
  order: number;
  liveUrl?: string;
  githubUrl?: string;
  challenge?: string;
  solution?: string;
  metrics?: { label: string; value: string }[];
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema<IProject> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    longDescription: { type: String, default: '' },
    client: { type: String, default: '' },
    timeline: { type: String, default: '4-6 Weeks' },
    services: [{ type: String }],
    image: { type: String, required: true },
    accentColor: { type: String, default: '#7c3aed' },
    href: { type: String, default: '' },
    tags: [{ type: String }],
    featured: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    liveUrl: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    challenge: { type: String, default: '' },
    solution: { type: String, default: '' },
    metrics: [
      {
        label: { type: String },
        value: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
