import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IInquiry extends Document {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  scopeLevel?: string;
  timeline?: string;
  subject?: string;
  message: string;
  status: 'new' | 'contacted' | 'in-progress' | 'closed';
  source?: 'contact_page' | 'project_estimator' | 'general';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema: Schema<IInquiry> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true, default: '' },
    service: { type: String, trim: true, default: 'General Inquiry' },
    scopeLevel: { type: String, trim: true, default: 'Custom / Flexible' },
    timeline: { type: String, trim: true, default: 'Flexible' },
    subject: { type: String, trim: true, default: 'New Project Inquiry' },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['new', 'contacted', 'in-progress', 'closed'],
      default: 'new',
    },
    source: {
      type: String,
      enum: ['contact_page', 'project_estimator', 'general'],
      default: 'general',
    },
    notes: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

export const Inquiry: Model<IInquiry> =
  mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema);
