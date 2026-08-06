'use client';

import React, { useState } from 'react';
import { Calculator, Check, Sparkles, Clock, DollarSign } from 'lucide-react';
import { Button } from './button';

interface ProjectEstimatorProps {
  onOpenModal?: () => void;
}

export function ProjectEstimator({ onOpenModal }: ProjectEstimatorProps) {
  const [projectType, setProjectType] = useState<'website' | 'ecommerce' | 'webapp' | 'uiux'>('website');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'Responsive Layouts',
    'SEO Suite & Analytics',
  ]);
  const [timeline, setTimeline] = useState<'standard' | 'expedited'>('standard');

  const projectTypeOptions: { id: 'website' | 'ecommerce' | 'webapp' | 'uiux'; name: string; basePrice: number; baseWeeks: number }[] = [
    { id: 'website', name: 'Website Design & Dev', basePrice: 2500, baseWeeks: 3 },
    { id: 'ecommerce', name: 'eCommerce Online Store', basePrice: 4500, baseWeeks: 4 },
    { id: 'webapp', name: 'Custom Web Application', basePrice: 6500, baseWeeks: 6 },
    { id: 'uiux', name: 'UI/UX Design System', basePrice: 2000, baseWeeks: 2 },
  ];

  const featureOptions = [
    { id: 'Responsive Layouts', name: 'Mobile-First Responsive', price: 300, weeks: 0.5 },
    { id: 'SEO Suite & Analytics', name: 'Advanced SEO & Analytics', price: 400, weeks: 0.5 },
    { id: 'Custom CMS', name: 'Custom Headless CMS', price: 1200, weeks: 1.5 },
    { id: 'Payment Gateway', name: 'Stripe / Payment Integration', price: 800, weeks: 1 },
    { id: 'Authentication', name: 'User Auth & Dashboard', price: 1000, weeks: 1 },
    { id: 'Framer Animations', name: 'Premium Micro-Animations', price: 600, weeks: 0.5 },
  ];

  const toggleFeature = (name: string) => {
    if (selectedFeatures.includes(name)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== name));
    } else {
      setSelectedFeatures([...selectedFeatures, name]);
    }
  };

  // Calculate Total Price and Weeks
  const currentType = projectTypeOptions.find((t) => t.id === projectType) || projectTypeOptions[0];
  const featureCosts = featureOptions
    .filter((f) => selectedFeatures.includes(f.name))
    .reduce((acc, f) => ({ price: acc.price + f.price, weeks: acc.weeks + f.weeks }), { price: 0, weeks: 0 });

  let totalPrice = currentType.basePrice + featureCosts.price;
  let totalWeeks = Math.ceil(currentType.baseWeeks + featureCosts.weeks);

  if (timeline === 'expedited') {
    totalPrice = Math.round(totalPrice * 1.25);
    totalWeeks = Math.max(2, Math.floor(totalWeeks * 0.7));
  }

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl bg-slate-900 text-white p-6 sm:p-10 shadow-2xl border border-slate-800 my-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-500/40 text-purple-400 flex items-center justify-center">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Interactive Project Cost & Timeline Estimator
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Configure your project scope below for instant estimate calculations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Estimator Options */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Project Type */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              1. Choose Project Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {projectTypeOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setProjectType(opt.id)}
                  className={`text-left p-3 rounded-xl border text-xs font-medium transition-all ${
                    projectType === opt.id
                      ? 'bg-purple-600 border-purple-500 text-white shadow-md'
                      : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="font-bold">{opt.name}</div>
                  <div className="text-[11px] opacity-80 mt-0.5">
                    From ${opt.basePrice} · ~{opt.baseWeeks}w
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Features */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              2. Select Extra Features
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {featureOptions.map((feat) => {
                const isSelected = selectedFeatures.includes(feat.name);
                return (
                  <button
                    type="button"
                    key={feat.id}
                    onClick={() => toggleFeature(feat.name)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all ${
                      isSelected
                        ? 'bg-purple-950/60 border-purple-500 text-purple-200'
                        : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                    }`}
                  >
                    <span>{feat.name}</span>
                    {isSelected ? (
                      <Check className="w-4 h-4 text-purple-400 shrink-0 ml-2" />
                    ) : (
                      <span className="text-[10px] text-slate-500 ml-2">+${feat.price}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Timeline Urgency */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              3. Delivery Speed
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTimeline('standard')}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                  timeline === 'standard'
                    ? 'bg-slate-800 border-purple-500 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                Standard Pace
              </button>
              <button
                type="button"
                onClick={() => setTimeline('expedited')}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                  timeline === 'expedited'
                    ? 'bg-purple-600 border-purple-500 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                ⚡ Fast-Track (+25%)
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Calculated Estimate Card */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-purple-950/80 border border-slate-700/80">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-purple-300">
                Estimated Summary
              </span>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <span className="text-xs text-slate-400 block mb-1">Estimated Budget</span>
                <div className="flex items-baseline text-3xl font-extrabold text-white">
                  <DollarSign className="w-6 h-6 text-purple-400 -mr-1" />
                  <span>{totalPrice.toLocaleString()}</span>
                  <span className="text-xs text-slate-400 font-normal ml-1">USD</span>
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-400 block mb-1">Estimated Delivery</span>
                <div className="flex items-center text-xl font-bold text-slate-200 gap-2">
                  <Clock className="w-5 h-5 text-purple-400" />
                  <span>{totalWeeks} Weeks</span>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 leading-relaxed border-t border-slate-800 pt-4 mb-6">
              * Estimate includes full responsive engineering, QA testing, code handoff, and initial maintenance.
            </div>
          </div>

          <Button
            variant="primary"
            size="md"
            showArrow
            onClick={onOpenModal}
            className="w-full py-3"
          >
            Lock In This Estimate
          </Button>
        </div>
      </div>
    </div>
  );
}
