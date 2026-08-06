'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Send, Sparkles } from 'lucide-react';
import { Button } from './button';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ isOpen, onClose }: ProjectModalProps) {
  const [selectedService, setSelectedService] = useState('Website Design');
  const [budget, setBudget] = useState('$5k - $10k');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    'Website Design',
    'Web Development',
    'eCommerce',
    'Web Application',
    'UI/UX Design',
  ];

  const budgetRanges = ['< $5k', '$5k - $10k', '$10k - $25k', '$25k+'];

  // Scroll Lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC Key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({ name: '', email: '', company: '', message: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200 z-10 overflow-hidden my-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-purple-600 animate-ping" />
                  <span className="text-xs font-extrabold uppercase tracking-widest text-purple-700">
                    Start a Project
                  </span>
                </div>
                <h3
                  id="modal-title"
                  className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2"
                >
                  Let&apos;s build something extraordinary.
                </h3>
                <p className="text-sm text-slate-600 mb-6">
                  Fill in the details below and we&apos;ll get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Service Selection */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      What service do you need?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {services.map((srv) => (
                        <button
                          type="button"
                          key={srv}
                          onClick={() => setSelectedService(srv)}
                          className={`text-xs font-semibold px-3.5 py-2 rounded-full transition-all border ${
                            selectedService === srv
                              ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {srv}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget Selection */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Estimated Budget Range
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {budgetRanges.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setBudget(b)}
                          className={`text-xs font-medium py-2 px-3 rounded-xl border text-center transition-all ${
                            budget === b
                              ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Inputs Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="modal-name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        id="modal-name"
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="modal-email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        id="modal-email"
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="modal-company" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Company / Organization
                    </label>
                    <input
                      id="modal-company"
                      type="text"
                      placeholder="Acme Inc."
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Project Overview */}
                  <div>
                    <label htmlFor="modal-message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Project Details & Goals *
                    </label>
                    <textarea
                      id="modal-message"
                      required
                      rows={3}
                      placeholder="Tell us about your project requirements, target audience, and key goals..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full py-3.5 text-base"
                    icon={isSubmitting ? <Sparkles className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4" />}
                  >
                    {isSubmitting ? 'Sending Inquiry...' : 'Submit Project Inquiry'}
                  </Button>
                </form>
              </div>
            ) : (
              /* Success State */
              <div className="py-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-6 shadow-lg animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
                  Inquiry Received!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto mb-8">
                  Thank you, <span className="font-bold text-slate-900">{formData.name}</span>. Our engineering team at Bhoot Tech will review your project details and reach out within 24 hours.
                </p>
                <Button variant="dark" onClick={handleReset}>
                  Close Window
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
