'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Card } from '@/components/ui/card';
import { servicesData } from '@/data/services';
import { ServiceItem } from '@/types';
import {
  Monitor,
  Code,
  ShoppingBag,
  Sparkles,
  Layers,
  Headphones,
  ArrowRight,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Monitor,
  Code,
  ShoppingBag,
  Sparkles,
  Layers,
  Headphones,
};

export function Services() {
  const [services, setServices] = React.useState<ServiceItem[]>(servicesData);

  React.useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data && data.data.length > 0) {
          setServices(data.data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="services" className="py-20 sm:py-28 bg-white">
      <Container size="wide">
        <SectionHeading
          eyebrow="WHAT WE DO"
          title="End-to-end Digital Solutions For Your Business"
          description="We combine strategy, design and technology to create digital products that look stunning and perform flawlessly."
          actionHref="/services"
          actionText="View All Services"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || Monitor;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Card className="h-full flex flex-col justify-between p-8 group hover:border-purple-200/80 transition-all duration-300">
                  <div>
                    {/* Icon Badge */}
                    <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 border border-purple-100/60 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                      <IconComponent className="w-5 h-5" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  {/* Arrow Action */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-purple-600 font-medium text-sm group-hover:text-purple-700">
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-2"
                    >
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
