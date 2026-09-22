# YJ DEVELOPERS - Agency Portfolio & Management Platform

A high-performance, dynamic digital agency portfolio and content management web platform built with Next.js 16, TypeScript, Tailwind CSS / Vanilla CSS, Framer Motion, and MongoDB Atlas.

---

## 🚀 Core Features

- **Dynamic Data Layer**: MongoDB Atlas integration for services, projects, inquiries, testimonials, and site settings.
- **Agency Specializations**:
  - 🌐 **Website Development**: Full-stack web apps, landing pages, interactive eCommerce.
  - 📱 **App Development**: Cross-platform iOS & Android mobile applications.
  - 🎬 **Video Editing**: Cinematic video editing, motion design, color grading, brand reels.
- **Admin Dashboard (`/admin`)**:
  - Secure JWT-based admin authentication (`/admin/login`).
  - Manage client inquiries & project requests.
  - CRUD operations for projects, services, testimonials, and site branding.
  - Database seeding utility and connection health diagnostics.
- **Interactive UI & Motion**:
  - Smooth Framer Motion animations & visual effects.
  - Responsive project modal viewer with category filters.
  - Glassmorphic navigation and high-contrast dark theme.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB Atlas via Mongoose
- **Styling**: Tailwind CSS & Vanilla CSS
- **Animations**: Framer Motion, Lucide Icons
- **Authentication**: JWT & bcryptjs

---

## ⚙️ Getting Started

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/yjdevelopers21-hub/AGENCY-PORTFOLIO.git
cd AGENCY-PORTFOLIO
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net/yj_developers?retryWrites=true&w=majority"
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=admin@yjdevelopers.com
ADMIN_PASSWORD=admin123456
```

### 3. Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) for the main agency portfolio or [http://localhost:3000/admin](http://localhost:3000/admin) to access the Admin Dashboard.

---

## 📜 License

MIT License. Built by **YJ DEVELOPERS**.
