'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function HeroVisual() {
  return (
    <div className="relative w-full max-w-[640px] mx-auto lg:max-w-none flex items-center justify-center p-2 sm:p-6">
      {/* Radial Purple Glow Backplate */}
      <div
        className="absolute inset-0 -z-10 rounded-full blur-3xl opacity-70 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 60% 40%, rgba(124, 58, 237, 0.25) 0%, rgba(192, 132, 252, 0.12) 45%, transparent 70%)',
        }}
      />

      {/* Main Visual Container with Motion Entrance */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full flex items-center justify-center"
      >
        {/* Realistic Floor Shadow underneath Laptop */}
        <motion.div
          animate={{ scale: [1, 0.94, 1], opacity: [0.65, 0.45, 0.65] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[85%] h-8 rounded-[100%] bg-slate-950/40 blur-xl pointer-events-none z-0"
        />

        {/* User Laptop Visual Image */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10 w-full max-w-[580px] filter drop-shadow-[0_25px_25px_rgba(15,23,42,0.25)]"
        >
          <Image
            src="/landing-page.png"
            alt="Bhoot Tech Digital Experience Platform Showcase"
            width={1200}
            height={800}
            className="w-full h-auto object-contain rounded-2xl"
            priority
            unoptimized
          />
        </motion.div>

        {/* Floating Circle Badge (Letter 'B') on Right Edge */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute right-0 sm:-right-2 top-1/4 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-slate-900 text-white font-extrabold text-base sm:text-lg flex items-center justify-center shadow-xl border-2 border-purple-400/40"
        >
          B
        </motion.div>

        {/* Handwritten Script Tag in Bottom Right Corner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="absolute -bottom-4 right-2 sm:right-6 z-20 flex flex-col items-end pointer-events-none"
        >
          {/* Curved Arrow SVG */}
          <svg
            viewBox="0 0 50 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-8 text-slate-700 mr-8 mb-1"
          >
            <path
              d="M45 2C35 12 15 15 5 30M5 30L12 28M5 30L8 22"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Handwritten Annotation Text */}
          <span className="font-serif italic text-xs sm:text-sm font-semibold text-slate-800 tracking-wide rotate-[-3deg] bg-white/90 px-2.5 py-1 rounded-md border border-slate-200/80 shadow-md backdrop-blur-xs">
            Let&apos;s build something amazing together!
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
