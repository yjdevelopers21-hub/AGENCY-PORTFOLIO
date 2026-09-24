'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  LayoutDashboard,
  Inbox,
  FolderKanban,
  Layers,
  MessageSquareQuote,
  Settings,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Clock,
  Mail,
  Phone,
  Database,
  RefreshCw,
  Search,
  Sparkles,
  Eye,
  X,
  UploadCloud,
  ImageIcon,
  Loader2,
  Globe,
  Code2,
  BarChart3,
  FileText,
  Tag,
  Palette,
  CheckCircle2,
  Calendar,
  Building2,
} from 'lucide-react';

interface AdminUser {
  email: string;
  role: string;
}

interface DashboardStats {
  totalInquiries: number;
  newInquiries: number;
  totalProjects: number;
  totalServices: number;
  totalTestimonials: number;
  dbState?: {
    isConfigured: boolean;
    isConnected: boolean;
    stateText: string;
  };
}

interface InquiryData {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  scopeLevel?: string;
  timeline?: string;
  subject?: string;
  message: string;
  status: string;
  source?: string;
  createdAt: string;
}

interface ProjectData {
  _id?: string;
  id?: string;
  title: string;
  slug?: string;
  category: string;
  description: string;
  longDescription?: string;
  client?: string;
  timeline?: string;
  services?: string[];
  image?: string;
  accentColor?: string;
  tags?: string[];
  featured?: boolean;
  order?: number;
  liveUrl?: string;
  githubUrl?: string;
  challenge?: string;
  solution?: string;
  metrics?: { label: string; value: string }[];
}

interface ServiceData {
  _id?: string;
  id?: string;
  title: string;
  slug?: string;
  iconName?: string;
  description?: string;
  shortDescription?: string;
}

interface TestimonialData {
  _id?: string;
  id?: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating?: number;
}

export default function AdminDashboardPage() {
  const router = useRouter();

  // Auth & State
  const [authLoading, setAuthLoading] = useState(true);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'inquiries' | 'projects' | 'services' | 'testimonials' | 'settings'>('overview');

  // Stats & Diagnostics
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [seeding, setSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<string | null>(null);

  // Inquiries
  const [inquiries, setInquiries] = useState<InquiryData[]>([]);
  const [inquiryFilter, setInquiryFilter] = useState('all');
  const [inquirySearch, setInquirySearch] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryData | null>(null);

  // Projects
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectData | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    slug: '',
    category: 'Website Development',
    description: '',
    longDescription: '',
    client: '',
    timeline: '3-4 Weeks',
    liveUrl: '',
    githubUrl: '',
    accentColor: '#7c3aed',
    services: 'Website Development, UI/UX Design',
    tags: 'Next.js, Tailwind, TypeScript',
    challenge: '',
    solution: '',
    metric1Value: '99/100',
    metric1Label: 'Lighthouse Performance',
    metric2Value: '+140%',
    metric2Label: 'Conversion Rate',
    metric3Value: '< 0.8s',
    metric3Label: 'Page Load Speed',
    image: '',
    order: 0,
    featured: true,
  });
  const [imageUploading, setImageUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WEBP, SVG, etc.)');
      return;
    }
    setImageUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/webp', 0.85);
          setProjectForm((prev) => ({ ...prev, image: compressedDataUrl }));
        } else {
          setProjectForm((prev) => ({ ...prev, image: event.target?.result as string }));
        }
        setImageUploading(false);
      };
      img.onerror = () => {
        setProjectForm((prev) => ({ ...prev, image: event.target?.result as string }));
        setImageUploading(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processImageFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  // Services
  const [services, setServices] = useState<ServiceData[]>([]);

  // Testimonials
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);

  // Site Settings
  const [settingsForm, setSettingsForm] = useState({
    name: 'YJ DEVELOPERS',
    tagline: 'Invisible Complexity. Visible Impact.',
    subtagline: 'YJ DEVELOPERS designs and develops fast, modern and scalable websites, mobile applications and high-impact video editing for ambitious businesses.',
    email: 'hello@yjdevelopers.com',
    phone: '+91 90765 43210',
    copyrightYear: 2026,
  });
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSaved, setSettingsSaved] = useState(false);

  const loadDashboardData = useCallback(async () => {
    try {
      fetch('/api/admin/stats', { cache: 'no-store' }).then((res) => res.json()).then((d) => d.success && setStats(d.data));
      fetch('/api/inquiries', { cache: 'no-store' }).then((res) => res.json()).then((d) => d.success && setInquiries(d.data));
      fetch('/api/projects', { cache: 'no-store' }).then((res) => res.json()).then((d) => d.success && setProjects(d.data));
      fetch('/api/services', { cache: 'no-store' }).then((res) => res.json()).then((d) => d.success && setServices(d.data));
      fetch('/api/testimonials', { cache: 'no-store' }).then((res) => res.json()).then((d) => d.success && setTestimonials(d.data));
      fetch('/api/settings', { cache: 'no-store' }).then((res) => res.json()).then((d) => {
        if (d.success && d.data) {
          setSettingsForm({
            name: d.data.name || 'YJ DEVELOPERS',
            tagline: d.data.tagline || 'Invisible Complexity. Visible Impact.',
            subtagline: d.data.subtagline || '',
            email: d.data.email || 'hello@yjdevelopers.com',
            phone: d.data.phone || '+91 90765 43210',
            copyrightYear: d.data.copyrightYear || 2026,
          });
        }
      });
    } catch (e) {
      console.error('Error loading dashboard data:', e);
    }
  }, []);


  // Initial Auth Check & Data Fetching
  useEffect(() => {
    fetch('/api/admin/auth')
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated) {
          router.replace('/admin/login');
        } else {
          setAdminUser(data.admin);
          setAuthLoading(false);
          loadDashboardData();
        }
      })
      .catch(() => {
        router.replace('/admin/login');
      });
  }, [router, loadDashboardData]);

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.replace('/admin/login');
  };

  const handleSeedDatabase = async () => {
    setSeeding(true);
    setSeedResult(null);
    try {
      const res = await fetch('/api/admin/seed', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setSeedResult('Database seeded successfully!');
        loadDashboardData();
      } else {
        setSeedResult(`Notice: ${data.error}`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Seed error';
      setSeedResult(`Seed error: ${msg}`);
    } finally {
      setSeeding(false);
      setTimeout(() => setSeedResult(null), 5000);
    }
  };

  // Inquiry actions
  const handleUpdateInquiryStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      setInquiries((prev) => prev.map((inq) => (inq._id === id ? { ...inq, status: newStatus } : inq)));
      if (selectedInquiry && selectedInquiry._id === id) {
        setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      setInquiries((prev) => prev.filter((inq) => inq._id !== id));
      if (selectedInquiry && selectedInquiry._id === id) setSelectedInquiry(null);
    } catch (e) {
      console.error(e);
    }
  };

  // Project actions
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const metrics = [
        { value: projectForm.metric1Value, label: projectForm.metric1Label },
        { value: projectForm.metric2Value, label: projectForm.metric2Label },
        { value: projectForm.metric3Value, label: projectForm.metric3Label },
      ].filter((m) => m.value && m.value.trim() && m.label && m.label.trim());

      const payload = {
        title: projectForm.title,
        slug: projectForm.slug || projectForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        category: projectForm.category,
        description: projectForm.description,
        longDescription: projectForm.longDescription || projectForm.description,
        client: projectForm.client,
        timeline: projectForm.timeline,
        liveUrl: projectForm.liveUrl,
        githubUrl: projectForm.githubUrl,
        accentColor: projectForm.accentColor || '#7c3aed',
        services: typeof projectForm.services === 'string'
          ? projectForm.services.split(',').map((s) => s.trim()).filter(Boolean)
          : projectForm.services,
        tags: typeof projectForm.tags === 'string'
          ? projectForm.tags.split(',').map((t) => t.trim()).filter(Boolean)
          : projectForm.tags,
        challenge: projectForm.challenge,
        solution: projectForm.solution,
        metrics,
        image: projectForm.image || '/landing-page.png',
        order: Number(projectForm.order) || 0,
        featured: projectForm.featured,
      };

      if (editingProject && (editingProject._id || editingProject.id)) {
        const id = editingProject._id || editingProject.id;
        await fetch(`/api/projects/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      setProjectModalOpen(false);
      setEditingProject(null);
      loadDashboardData();
    } catch (e) {
      console.error(e);
      alert('Error saving project');
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      setProjects((prev) => prev.filter((p) => p._id !== id && p.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  // Settings Save
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsForm),
      });
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setSavingSettings(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <Sparkles className="w-8 h-8 text-purple-400 animate-spin mb-4" />
        <p className="text-sm text-slate-400 font-medium">Verifying admin session...</p>
      </div>
    );
  }

  // Filtered inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesFilter = inquiryFilter === 'all' || inq.status === inquiryFilter;
    const matchesSearch =
      inq.name.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.email.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      (inq.service || '').toLowerCase().includes(inquirySearch.toLowerCase()) ||
      (inq.message || '').toLowerCase().includes(inquirySearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-purple-500 selection:text-white">
      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 border-b border-slate-800/80 backdrop-blur-xl px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="flex items-center gap-2.5">
            <Image
              src="/black-logo.png"
              alt="YJ Logo"
              width={28}
              height={28}
              className="w-7 h-7 object-contain invert"
            />
            <div className="flex items-center">
              <span className="font-black text-sm uppercase tracking-wider text-white">YJ</span>
              <span className="font-light text-sm uppercase tracking-wider text-purple-400 ml-1">DEVELOPERS</span>
              <span className="ml-2.5 px-2 py-0.5 rounded-md bg-purple-500/20 border border-purple-500/40 text-[10px] font-bold text-purple-300 uppercase tracking-widest">
                ADMIN
              </span>
            </div>
          </Link>
        </div>

        {/* Database Status & Quick Actions */}
        <div className="flex items-center gap-3">
          {/* Database Connection Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950 border border-slate-800 text-xs">
            <span
              className={`w-2 h-2 rounded-full ${
                stats?.dbState?.isConnected
                  ? 'bg-emerald-400 animate-pulse'
                  : 'bg-amber-400'
              }`}
            />
            <span className="text-slate-300 font-medium">
              MongoDB: <strong className="text-white">{stats?.dbState?.stateText || 'Ready'}</strong>
            </span>
          </div>

          <button
            onClick={handleSeedDatabase}
            disabled={seeding}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 text-xs font-semibold transition-colors disabled:opacity-50"
            title="Seed default projects, services, and testimonials to Atlas"
          >
            <Database className={`w-3.5 h-3.5 ${seeding ? 'animate-spin' : ''}`} />
            <span>{seeding ? 'Seeding...' : 'Seed Atlas DB'}</span>
          </button>

          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors border border-slate-700"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Seed notification banner */}
      {seedResult && (
        <div className="bg-purple-600/20 border-b border-purple-500/40 px-4 py-2 text-center text-xs text-purple-200 font-semibold flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>{seedResult}</span>
        </div>
      )}

      {/* Main Body with Sidebar Tabs */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 bg-slate-900/60 border-r border-slate-800/80 p-4 shrink-0">
          <div className="space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'overview'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview & Stats</span>
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'inquiries'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Inbox className="w-4 h-4" />
                <span>Inquiries & Leads</span>
              </div>
              {inquiries.filter((i) => i.status === 'new').length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px]">
                  {inquiries.filter((i) => i.status === 'new').length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'projects'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <FolderKanban className="w-4 h-4" />
              <span>Projects / Portfolio</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'services'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Services (3 Core)</span>
            </button>

            <button
              onClick={() => setActiveTab('testimonials')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'testimonials'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <MessageSquareQuote className="w-4 h-4" />
              <span>Testimonials</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'settings'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Site & Contact Settings</span>
            </button>
          </div>

          {/* Admin User Info Box */}
          <div className="mt-8 p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-1">Signed in as</span>
            <span className="font-semibold text-white truncate block">{adminUser?.email}</span>
            <span className="text-[10px] text-purple-400 font-medium capitalize mt-0.5 block">{adminUser?.role}</span>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-extrabold text-white tracking-tight mb-1">
                  Dashboard Overview
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Real-time analytics and quick controls for YJ DEVELOPERS.
                </p>
              </div>

              {/* 4 Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-2">Total Inquiries</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-black text-white">{inquiries.length}</span>
                    <Inbox className="w-5 h-5 text-purple-400" />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
                  <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider block mb-2">New Unread Leads</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-black text-emerald-400">
                      {inquiries.filter((i) => i.status === 'new').length}
                    </span>
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-2">Active Projects</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-black text-white">{projects.length}</span>
                    <FolderKanban className="w-5 h-5 text-indigo-400" />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-2">Core Services</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-black text-white">{services.length || 3}</span>
                    <Layers className="w-5 h-5 text-purple-400" />
                  </div>
                </div>
              </div>

              {/* MongoDB Atlas Status Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-purple-900/40 shadow-2xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                      <Database className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white mb-1">
                        MongoDB Atlas Cloud Database
                      </h3>
                      <p className="text-xs text-slate-300">
                        Status: <span className="font-semibold text-white">{stats?.dbState?.stateText || 'Active & Ready'}</span>
                        {!stats?.dbState?.isConnected && ' — Set MONGODB_URI in .env.local to persist directly into your cloud Atlas cluster.'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleSeedDatabase}
                    disabled={seeding}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${seeding ? 'animate-spin' : ''}`} />
                    <span>{seeding ? 'Populating...' : 'Sync / Seed Initial Data'}</span>
                  </button>
                </div>
              </div>

              {/* Recent Inquiries List */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white">Recent Client Inquiries</h3>
                  <button
                    onClick={() => setActiveTab('inquiries')}
                    className="text-xs font-semibold text-purple-400 hover:text-purple-300"
                  >
                    View All &rarr;
                  </button>
                </div>

                {inquiries.length === 0 ? (
                  <p className="text-xs text-slate-500 py-6 text-center">No inquiries received yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                          <th className="pb-3 font-semibold">Client</th>
                          <th className="pb-3 font-semibold">Service</th>
                          <th className="pb-3 font-semibold">Scope / Timeline</th>
                          <th className="pb-3 font-semibold">Status</th>
                          <th className="pb-3 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {inquiries.slice(0, 5).map((inq) => (
                          <tr key={inq._id} className="hover:bg-slate-800/30 transition-colors">
                            <td className="py-3.5 pr-4">
                              <div className="font-bold text-white">{inq.name}</div>
                              <div className="text-[11px] text-slate-400">{inq.email}</div>
                            </td>
                            <td className="py-3.5 pr-4 text-slate-300 font-medium">
                              {inq.service || 'General'}
                            </td>
                            <td className="py-3.5 pr-4 text-slate-400">
                              <div>{inq.scopeLevel || 'Custom'}</div>
                              <div className="text-[10px] text-slate-500">{inq.timeline || 'Flexible'}</div>
                            </td>
                            <td className="py-3.5 pr-4">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                  inq.status === 'new'
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : inq.status === 'contacted'
                                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                    : inq.status === 'in-progress'
                                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                                    : 'bg-slate-700/40 text-slate-400 border border-slate-700'
                                }`}
                              >
                                {inq.status}
                              </span>
                            </td>
                            <td className="py-3.5 text-right space-x-2">
                              <button
                                onClick={() => setSelectedInquiry(inq)}
                                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
                                title="View Details"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <a
                                href={`mailto:${inq.email}?subject=Regarding your inquiry at YJ DEVELOPERS`}
                                className="p-1.5 rounded-lg bg-purple-600/20 text-purple-300 hover:bg-purple-600/30 inline-block"
                                title="Reply via Email"
                              >
                                <Mail className="w-3.5 h-3.5" />
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: INQUIRIES & LEADS */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-white tracking-tight mb-1">
                    Client Inquiries & Project Leads
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Submissions from the Contact form and Homepage Estimator.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Search */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search leads..."
                      value={inquirySearch}
                      onChange={(e) => setInquirySearch(e.target.value)}
                      className="pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-4">
                {['all', 'new', 'contacted', 'in-progress', 'closed'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setInquiryFilter(st)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
                      inquiryFilter === st
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {st} {st !== 'all' && `(${inquiries.filter((i) => i.status === st).length})`}
                  </button>
                ))}
              </div>

              {/* Table */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
                {filteredInquiries.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-xs">
                    No inquiries match the selected filter.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                          <th className="pb-3 font-semibold">Client</th>
                          <th className="pb-3 font-semibold">Service</th>
                          <th className="pb-3 font-semibold">Scope & Timeline</th>
                          <th className="pb-3 font-semibold">Message Preview</th>
                          <th className="pb-3 font-semibold">Status</th>
                          <th className="pb-3 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {filteredInquiries.map((inq) => (
                          <tr key={inq._id} className="hover:bg-slate-800/30 transition-colors">
                            <td className="py-3.5 pr-4">
                              <div className="font-bold text-white">{inq.name}</div>
                              <div className="text-[11px] text-slate-400">{inq.email}</div>
                              {inq.phone && <div className="text-[10px] text-slate-500">{inq.phone}</div>}
                            </td>
                            <td className="py-3.5 pr-4 text-slate-300 font-medium">
                              {inq.service || 'General'}
                            </td>
                            <td className="py-3.5 pr-4 text-slate-400">
                              <div>{inq.scopeLevel || 'Custom'}</div>
                              <div className="text-[10px] text-slate-500">{inq.timeline || 'Flexible'}</div>
                            </td>
                            <td className="py-3.5 pr-4 text-slate-400 max-w-xs truncate">
                              {inq.message}
                            </td>
                            <td className="py-3.5 pr-4">
                              <select
                                value={inq.status}
                                onChange={(e) => handleUpdateInquiryStatus(inq._id, e.target.value)}
                                className="bg-slate-950 border border-slate-800 text-slate-300 text-[11px] rounded-lg px-2 py-1 focus:outline-none focus:border-purple-500"
                              >
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="in-progress">In-Progress</option>
                                <option value="closed">Closed</option>
                              </select>
                            </td>
                            <td className="py-3.5 text-right space-x-2">
                              <button
                                onClick={() => setSelectedInquiry(inq)}
                                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
                                title="View Details"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <a
                                href={`mailto:${inq.email}?subject=Regarding your inquiry at YJ DEVELOPERS`}
                                className="p-1.5 rounded-lg bg-purple-600/20 text-purple-300 hover:bg-purple-600/30 inline-block"
                                title="Reply"
                              >
                                <Mail className="w-3.5 h-3.5" />
                              </a>
                              <button
                                onClick={() => handleDeleteInquiry(inq._id)}
                                className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: PROJECTS / PORTFOLIO */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-white tracking-tight mb-1">
                    Projects & Portfolio
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Manage case studies featured on the Work page and Homepage showcase.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingProject(null);
                    setProjectForm({
                      title: '',
                      slug: '',
                      category: 'Website Development',
                      description: '',
                      longDescription: '',
                      client: '',
                      timeline: '3-4 Weeks',
                      liveUrl: '',
                      githubUrl: '',
                      accentColor: '#7c3aed',
                      services: 'Website Development, UI/UX Design',
                      tags: 'Next.js, Tailwind, TypeScript',
                      challenge: '',
                      solution: '',
                      metric1Value: '99/100',
                      metric1Label: 'Lighthouse Performance',
                      metric2Value: '+140%',
                      metric2Label: 'Conversion Rate',
                      metric3Value: '< 0.8s',
                      metric3Label: 'Page Load Speed',
                      image: '',
                      order: 0,
                      featured: true,
                    });
                    setProjectModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold shadow-lg transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Project</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((proj) => (
                  <div
                    key={proj._id || proj.id}
                    className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group"
                  >
                    <div>
                      <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
                        {proj.image ? (
                          <img
                            src={proj.image}
                            alt={proj.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-600">
                            <ImageIcon className="w-8 h-8" />
                          </div>
                        )}
                        <span className="absolute top-2 left-2 px-2 py-0.5 bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-bold rounded uppercase tracking-wider">
                          {proj.category}
                        </span>
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute top-2 right-2 p-1.5 bg-slate-950/80 hover:bg-purple-600 backdrop-blur-md text-white rounded-lg transition-colors"
                            title="Visit Live Site"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>

                      <div className="p-5">
                        <h4 className="text-base font-bold text-white mb-1.5">{proj.title}</h4>
                        {proj.client && (
                          <span className="text-[11px] text-purple-400 font-medium block mb-2">
                            Client: {proj.client}
                          </span>
                        )}
                        <p className="text-xs text-slate-400 line-clamp-2 mb-4">{proj.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {(proj.tags || []).map((t: string) => (
                            <span key={t} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-purple-300">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-slate-500 text-[11px]">{proj.timeline || '4-6 Weeks'}</span>
                      <div className="flex items-center gap-2">
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-purple-300"
                            title="Open Live Site"
                          >
                            <Globe className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button
                          onClick={() => {
                            setEditingProject(proj);
                            const m = proj.metrics || [];
                            setProjectForm({
                              title: proj.title || '',
                              slug: proj.slug || proj.id || '',
                              category: proj.category || 'Website Development',
                              description: proj.description || '',
                              longDescription: proj.longDescription || proj.description || '',
                              client: proj.client || '',
                              timeline: proj.timeline || '3-4 Weeks',
                              liveUrl: proj.liveUrl || '',
                              githubUrl: proj.githubUrl || '',
                              accentColor: proj.accentColor || '#7c3aed',
                              services: Array.isArray(proj.services) ? proj.services.join(', ') : proj.services || '',
                              tags: Array.isArray(proj.tags) ? proj.tags.join(', ') : proj.tags || '',
                              challenge: proj.challenge || '',
                              solution: proj.solution || '',
                              metric1Value: m[0]?.value || '99/100',
                              metric1Label: m[0]?.label || 'Lighthouse Performance',
                              metric2Value: m[1]?.value || '+140%',
                              metric2Label: m[1]?.label || 'Conversion Rate',
                              metric3Value: m[2]?.value || '< 0.8s',
                              metric3Label: m[2]?.label || 'Page Load Speed',
                              image: proj.image || '',
                              order: proj.order || 0,
                              featured: proj.featured ?? true,
                            });
                            setProjectModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                          title="Edit Project"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj._id || proj.id || '')}
                          className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SERVICES */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-white tracking-tight mb-1">
                  Core Services Management
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Manage the 3 primary offerings (Website Development, App Development, Video Editing).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {services.map((srv) => (
                  <div key={srv._id || srv.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center mb-4 border border-purple-500/30 font-bold">
                        {srv.title.substring(0, 1)}
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{srv.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed mb-4">{srv.shortDescription || srv.description}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-emerald-400 font-semibold">Active & Live</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-white tracking-tight mb-1">
                    Client Testimonials
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Real client reviews displayed across the homepage.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((t) => (
                  <div key={t._id || t.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between">
                    <p className="text-xs text-slate-300 italic mb-4">&ldquo;{t.quote}&rdquo;</p>
                    <div className="pt-4 border-t border-slate-800">
                      <h4 className="text-sm font-bold text-white">{t.author}</h4>
                      <p className="text-[11px] text-purple-400 font-medium">{t.role}, {t.company}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-white tracking-tight mb-1">
                  Site & Contact Settings
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Update global agency contact info and branding live.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
                {settingsSaved && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Settings successfully updated in MongoDB Atlas!</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Agency Name
                  </label>
                  <input
                    type="text"
                    value={settingsForm.name}
                    onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={settingsForm.tagline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Subtagline / Hero Copy
                  </label>
                  <textarea
                    rows={3}
                    value={settingsForm.subtagline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, subtagline: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Primary Contact Email
                    </label>
                    <input
                      type="email"
                      value={settingsForm.email}
                      onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={settingsForm.phone}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={savingSettings}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{savingSettings ? 'Saving...' : 'Save Site Settings'}</span>
                </button>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: INQUIRY DETAILS PREVIEW */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400 block mb-1">
              Lead Details
            </span>
            <h3 className="text-xl font-extrabold text-white mb-4">{selectedInquiry.name}</h3>

            <div className="space-y-3 text-xs mb-6">
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{selectedInquiry.email}</span>
              </div>
              {selectedInquiry.phone && (
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>{selectedInquiry.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{new Date(selectedInquiry.createdAt).toLocaleString()}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                <div className="text-[10px] text-slate-500 uppercase font-semibold mb-1">Selected Requirements</div>
                <div className="font-bold text-white text-xs">{selectedInquiry.service}</div>
                <div className="text-slate-400 text-[11px]">Scope: {selectedInquiry.scopeLevel} • Timeline: {selectedInquiry.timeline}</div>
              </div>

              <div>
                <div className="text-[10px] text-slate-500 uppercase font-semibold mb-1">Message Details</div>
                <p className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {selectedInquiry.message}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <select
                value={selectedInquiry.status}
                onChange={(e) => handleUpdateInquiryStatus(selectedInquiry._id, e.target.value)}
                className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2"
              >
                <option value="new">Status: New</option>
                <option value="contacted">Status: Contacted</option>
                <option value="in-progress">Status: In-Progress</option>
                <option value="closed">Status: Closed</option>
              </select>

              <a
                href={`mailto:${selectedInquiry.email}?subject=Regarding your inquiry with YJ DEVELOPERS`}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl inline-flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Reply to Client</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT PROJECT (FULL DETAILS) */}
      {projectModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setProjectModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400 block mb-1">
                Portfolio CMS
              </span>
              <h3 className="text-2xl font-extrabold text-white">
                {editingProject ? 'Edit Portfolio Project' : 'Add New Portfolio Project'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Fill in complete project information, live links, and case study details.
              </p>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-6 text-xs">
              {/* SECTION 1: BASIC INFORMATION */}
              <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 space-y-3">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider mb-2">
                  <FolderKanban className="w-4 h-4" />
                  <span>Basic Information</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Project Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="Furniqa — Luxury Furniture Store"
                      value={projectForm.title}
                      onChange={(e) => {
                        const newTitle = e.target.value;
                        const autoSlug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                        setProjectForm((prev) => ({
                          ...prev,
                          title: newTitle,
                          slug: editingProject ? prev.slug : autoSlug,
                        }));
                      }}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Category *</label>
                    <select
                      value={projectForm.category}
                      onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="Website Development">Website Development</option>
                      <option value="App Development">App Development</option>
                      <option value="Video Editing">Video Editing</option>
                      <option value="E-Commerce">E-Commerce</option>
                      <option value="SaaS Platform">SaaS Platform</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Education">Education & LMS</option>
                      <option value="Fintech">Fintech</option>
                      <option value="Brand Design">Brand Design & UI/UX</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Slug / URL ID</label>
                    <input
                      type="text"
                      placeholder="furniqa-store"
                      value={projectForm.slug}
                      onChange={(e) => setProjectForm({ ...projectForm, slug: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-purple-500 font-mono text-[11px]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Client Name</label>
                    <input
                      type="text"
                      placeholder="Furniqa Inc."
                      value={projectForm.client}
                      onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Timeline</label>
                    <input
                      type="text"
                      placeholder="3-4 Weeks"
                      value={projectForm.timeline}
                      onChange={(e) => setProjectForm({ ...projectForm, timeline: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: LIVE LINKS & REPOSITORY */}
              <div className="p-4 bg-purple-950/20 rounded-2xl border border-purple-500/30 space-y-3">
                <div className="flex items-center gap-2 text-purple-300 font-bold text-xs uppercase tracking-wider mb-2">
                  <Globe className="w-4 h-4 text-purple-400" />
                  <span>Live URLs & Links</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-purple-200 font-semibold mb-1 flex items-center justify-between">
                      <span>Visit Live Site URL</span>
                      {projectForm.liveUrl && (
                        <a
                          href={projectForm.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-purple-400 hover:text-purple-300 underline inline-flex items-center gap-1"
                        >
                          <span>Test Link</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </label>
                    <div className="relative">
                      <Globe className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                      <input
                        type="url"
                        placeholder="https://furniqa-store.vercel.app"
                        value={projectForm.liveUrl}
                        onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                        className="w-full pl-9 pr-3.5 py-2 bg-slate-950 border border-purple-500/40 rounded-xl text-white focus:outline-none focus:border-purple-400 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">GitHub / Code URL (Optional)</label>
                    <div className="relative">
                      <Code2 className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                      <input
                        type="url"
                        placeholder="https://github.com/org/project"
                        value={projectForm.githubUrl}
                        onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                        className="w-full pl-9 pr-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-purple-500 text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3: DESCRIPTIONS & CASE STUDY */}
              <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 space-y-3">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider mb-2">
                  <FileText className="w-4 h-4" />
                  <span>Descriptions & Case Study</span>
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Short Description * (Cards & Hero)</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="A modern eCommerce platform with seamless shopping experience and sub-second page loads."
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-purple-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Detailed Overview (Case Study Page)</label>
                  <textarea
                    rows={2}
                    placeholder="Engineered with ultra-fast server rendering, client-side state caching, and responsive micro-interactions."
                    value={projectForm.longDescription}
                    onChange={(e) => setProjectForm({ ...projectForm, longDescription: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-purple-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">The Client Challenge</label>
                    <textarea
                      rows={2}
                      placeholder="The client required a modern platform capable of delivering sub-second loads..."
                      value={projectForm.challenge}
                      onChange={(e) => setProjectForm({ ...projectForm, challenge: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-purple-500 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">The Engineering Solution</label>
                    <textarea
                      rows={2}
                      placeholder="Architected a Next.js App Router solution with edge caching..."
                      value={projectForm.solution}
                      onChange={(e) => setProjectForm({ ...projectForm, solution: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-purple-500 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 4: TAGS, DELIVERABLES & BRANDING */}
              <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 space-y-3">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider mb-2">
                  <Tag className="w-4 h-4" />
                  <span>Tech Stack & Deliverables</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Tech Stack Tags (Comma-separated)</label>
                    <input
                      type="text"
                      placeholder="Next.js, Tailwind, TypeScript, Stripe, Framer Motion"
                      value={projectForm.tags}
                      onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Key Deliverables (Comma-separated)</label>
                    <input
                      type="text"
                      placeholder="UI/UX Design, Web Development, Payment Gateway"
                      value={projectForm.services}
                      onChange={(e) => setProjectForm({ ...projectForm, services: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Accent Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={projectForm.accentColor || '#7c3aed'}
                        onChange={(e) => setProjectForm({ ...projectForm, accentColor: e.target.value })}
                        className="w-8 h-8 rounded-lg border border-slate-800 bg-slate-950 cursor-pointer p-0.5"
                      />
                      <input
                        type="text"
                        value={projectForm.accentColor}
                        onChange={(e) => setProjectForm({ ...projectForm, accentColor: e.target.value })}
                        className="w-24 px-2 py-1 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Display Priority Order</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={projectForm.order}
                      onChange={(e) => setProjectForm({ ...projectForm, order: Number(e.target.value) })}
                      className="w-24 px-3 py-1 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 5: KEY PERFORMANCE METRICS */}
              <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 space-y-3">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider mb-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>Key Performance & Results Metrics</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-2.5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1.5">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Metric 1</span>
                    <input
                      type="text"
                      placeholder="99/100"
                      value={projectForm.metric1Value}
                      onChange={(e) => setProjectForm({ ...projectForm, metric1Value: e.target.value })}
                      className="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-white font-bold text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Lighthouse Performance"
                      value={projectForm.metric1Label}
                      onChange={(e) => setProjectForm({ ...projectForm, metric1Label: e.target.value })}
                      className="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-slate-400 text-[11px]"
                    />
                  </div>

                  <div className="p-2.5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1.5">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Metric 2</span>
                    <input
                      type="text"
                      placeholder="+140%"
                      value={projectForm.metric2Value}
                      onChange={(e) => setProjectForm({ ...projectForm, metric2Value: e.target.value })}
                      className="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-white font-bold text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Conversion Rate"
                      value={projectForm.metric2Label}
                      onChange={(e) => setProjectForm({ ...projectForm, metric2Label: e.target.value })}
                      className="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-slate-400 text-[11px]"
                    />
                  </div>

                  <div className="p-2.5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1.5">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Metric 3</span>
                    <input
                      type="text"
                      placeholder="< 0.8s"
                      value={projectForm.metric3Value}
                      onChange={(e) => setProjectForm({ ...projectForm, metric3Value: e.target.value })}
                      className="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-white font-bold text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Page Load Speed"
                      value={projectForm.metric3Label}
                      onChange={(e) => setProjectForm({ ...projectForm, metric3Label: e.target.value })}
                      className="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-slate-400 text-[11px]"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 6: PROJECT COVER IMAGE */}
              <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 space-y-3">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider mb-2">
                  <ImageIcon className="w-4 h-4" />
                  <span>Project Cover Image *</span>
                </div>

                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml, image/gif"
                  onChange={handleImageFileChange}
                  className="hidden"
                />

                {/* Image Preview Box if image exists */}
                {projectForm.image ? (
                  <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 group">
                    <div className="relative aspect-video w-full">
                      <img
                        src={projectForm.image}
                        alt="Project preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={imageUploading}
                          className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-lg transition-all cursor-pointer"
                        >
                          <UploadCloud className="w-3.5 h-3.5" />
                          <span>Change Photo</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setProjectForm((prev) => ({ ...prev, image: '' }))}
                          className="px-3 py-1.5 bg-red-600/80 hover:bg-red-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-lg transition-all cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                    <div className="p-2.5 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                        <CheckCircle className="w-3.5 h-3.5" /> Image Attached
                      </span>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-purple-400 hover:text-purple-300 underline font-medium cursor-pointer"
                      >
                        Upload different photo
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Dropzone / Upload Area */
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                      isDragging
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-slate-800 hover:border-purple-500/50 bg-slate-950/50 hover:bg-slate-950'
                    }`}
                  >
                    {imageUploading ? (
                      <div className="flex flex-col items-center justify-center py-3 text-purple-400">
                        <Loader2 className="w-8 h-8 animate-spin mb-2" />
                        <span className="text-xs font-semibold">Optimizing and preparing image...</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-2">
                        <div className="w-12 h-12 rounded-2xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-3 shadow-inner">
                          <UploadCloud className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold text-white mb-1">
                          Click to upload or drag & drop photo
                        </span>
                        <span className="text-[11px] text-slate-500">
                          PNG, JPG, WEBP, SVG (Auto-compressed to high-res WebP)
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Direct URL input fallback */}
                <div className="pt-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] text-slate-500 font-medium">Or paste image URL / static path:</span>
                  </div>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/... or /landing-page.png"
                    value={projectForm.image}
                    onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 text-xs focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>
              </div>

              {/* SECTION 7: VISIBILITY & SUBMISSION */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="feat"
                    checked={projectForm.featured}
                    onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                    className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-purple-600 focus:ring-purple-500 cursor-pointer"
                  />
                  <label htmlFor="feat" className="text-slate-300 font-semibold cursor-pointer">
                    Feature on Homepage Showcase
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setProjectModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Save Project</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
