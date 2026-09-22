import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITestimonial extends Document {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  rating: number;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema: Schema<ITestimonial> = new Schema(
  {
    quote: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    avatar: { type: String, default: '' },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    featured: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
