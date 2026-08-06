'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProjectModal } from '@/components/ui/project-modal';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Copy, Check, ChevronDown, Send, Clock, Sparkles } from 'lucide-react';

export default function ContactPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const faqs = [
    {
      q: 'What is your typical project timeline?',
      a: 'Standard website designs usually take 2 to 4 weeks. Complex web applications or custom eCommerce platforms take 4 to 8 weeks depending on integration requirements.',
    },
    {
      q: 'What technologies do you specialize in?',
      a: 'We specialize in Next.js, React, TypeScript, Tailwind CSS, Node.js, and cloud platforms like Vercel and AWS.',
    },
    {
      q: 'Do you provide ongoing support after launch?',
      a: 'Yes, we provide ongoing maintenance, Core Web Vitals monitoring, security updates, and feature enhancements.',
    },
    {
      q: 'How do project estimates and billing work?',
      a: 'We work on transparent fixed-price milestone agreements or dedicated sprint iterations so there are never hidden costs.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-purple-500 selection:text-white">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />

      <main className="flex-1 pt-28 sm:pt-36 pb-20">
        <Container size="wide">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">LET&apos;S TALK</Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] mb-6">
              Start Your Project With{' '}
              <span className="purple-gradient-text">Bhoot Tech.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Have a new web project, redesign, or technical inquiry? Reach out to our engineering team directly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            {/* Left Column: Direct Info & Copy Buttons */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="p-8 bg-slate-900 text-white rounded-3xl border-slate-800 shadow-2xl">
                <span className="text-xs font-bold uppercase tracking-widest text-purple-400 block mb-2">
                  Direct Contact
                </span>
                <h3 className="text-2xl font-extrabold text-white mb-6">
                  We respond within 24 hours.
                </h3>

                <div className="space-y-6 mb-8">
                  {/* Email */}
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-purple-400 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Email</span>
                        <span className="text-sm font-semibold text-white">hello@bhoottech.com</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy('hello@bhoottech.com', 'email')}
                      className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                      title="Copy Email"
                    >
                      {copiedField === 'email' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-purple-400 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Phone</span>
                        <span className="text-sm font-semibold text-white">+91 90765 43210</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy('+91 90765 43210', 'phone')}
                      className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                      title="Copy Phone"
                    >
                      {copiedField === 'phone' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800 flex items-center gap-3 text-xs text-slate-400">
                  <Clock className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Mon – Fri: 9:00 AM – 7:00 PM (IST)</span>
                </div>
              </Card>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <Card className="p-8 sm:p-10 bg-white border-slate-200/80 shadow-xl rounded-3xl">
                {!submitted ? (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      Send Us a Message
                    </h3>
                    <p className="text-sm text-slate-600 mb-6">
                      Fill out the form below to get started.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          placeholder="Rohit Sharma"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
                        />
                      </div>

                      <div>
                        <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          placeholder="rohit@lumina.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-subject" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Subject *
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        required
                        placeholder="New E-commerce Website Design"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Message Details *
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={4}
                        placeholder="Describe your project, goals, and ideal timeline..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="dark"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full py-3.5 text-base"
                      icon={isSubmitting ? <Sparkles className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4" />}
                    >
                      {isSubmitting ? 'Sending Message...' : 'Send Message'}
                    </Button>
                  </form>
                ) : (
                  <div className="py-12 text-center flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-6">
                      <Check className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto mb-8">
                      Thank you <span className="font-bold text-slate-900">{form.name}</span>. We will review your message and reply via email within 24 hours.
                    </p>
                    <Button variant="outline" onClick={() => setSubmitted(false)}>
                      Send Another Message
                    </Button>
                  </div>
                )}
              </Card>
            </div>
          </div>

          {/* FAQ Accordion Section */}
          <div className="max-w-4xl mx-auto border-t border-slate-200/80 pt-16">
            <div className="text-center mb-12">
              <Badge className="mb-3">FREQUENTLY ASKED QUESTIONS</Badge>
              <h2 className="text-3xl font-extrabold text-slate-900">
                Everything You Need To Know
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={faq.q}
                    className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 text-base hover:text-purple-600 transition-colors focus-visible:outline-none"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-purple-600' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pt-0 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </main>

      <Footer />
      <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
