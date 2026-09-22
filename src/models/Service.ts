import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IService extends Document {
  title: string;
  slug: string;
  iconName: string;
  shortDescription: string;
  fullDescription?: string;
  features: string[];
  scopeOptions: {
    tier: string;
    description: string;
    typicalTimeline: string;
  }[];
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema: Schema<IService> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true },
    iconName: { type: String, default: 'Globe' },
    shortDescription: { type: String, required: true, trim: true },
    fullDescription: { type: String, default: '' },
    features: [{ type: String }],
    scopeOptions: [
      {
        tier: { type: String, required: true },
        description: { type: String, required: true },
        typicalTimeline: { type: String, required: true },
      },
    ],
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);
