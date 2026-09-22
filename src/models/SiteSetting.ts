import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISiteSetting extends Document {
  name: string;
  tagline: string;
  subtagline: string;
  email: string;
  phone: string;
  copyrightYear: number;
  socials: {
    platform: string;
    url: string;
    icon: string;
  }[];
  heroEyebrow?: string;
  heroHeadline?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SiteSettingSchema: Schema<ISiteSetting> = new Schema(
  {
    name: { type: String, required: true, default: 'YJ DEVELOPERS' },
    tagline: { type: String, default: 'Invisible Complexity. Visible Impact.' },
    subtagline: {
      type: String,
      default:
        'YJ DEVELOPERS designs and develops fast, modern and scalable websites, mobile applications and high-impact video editing for ambitious businesses.',
    },
    email: { type: String, default: 'hello@yjdevelopers.com' },
    phone: { type: String, default: '+91 90765 43210' },
    copyrightYear: { type: Number, default: 2026 },
    socials: [
      {
        platform: { type: String, required: true },
        url: { type: String, required: true },
        icon: { type: String, required: true },
      },
    ],
    heroEyebrow: { type: String, default: 'INVISIBLE COMPLEXITY. VISIBLE IMPACT.' },
    heroHeadline: { type: String, default: 'We Build Digital Experiences That Drive Real Impact.' },
  },
  {
    timestamps: true,
  }
);

export const SiteSetting: Model<ISiteSetting> =
  mongoose.models.SiteSetting || mongoose.model<ISiteSetting>('SiteSetting', SiteSettingSchema);
