'use client'

import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { Badge, Button } from '@/components/ui'
import { PRICING } from '@/lib/constants'
import Link from 'next/link'

export function Comparison() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Pricing</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Free Forever, Pro When You Need It
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Start with our free version. Upgrade to Pro for advanced features and no watermark.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-surface rounded-2xl border border-white/10 p-8"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">{PRICING.free.name}</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-white/60">forever</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {PRICING.free.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-secondary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-white/80">{feature}</span>
                </li>
              ))}
            </ul>

            <Link href="/download">
              <Button variant="outline" className="w-full">
                Download Free
              </Button>
            </Link>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-2xl border border-primary-500/30 p-8 relative"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge variant="primary" className="shadow-lg">Most Popular</Badge>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">{PRICING.pro.name}</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">${PRICING.pro.price}</span>
                <span className="text-white/40 line-through">${PRICING.pro.originalPrice}</span>
                <span className="text-white/60">one-time</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {PRICING.pro.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white/80">{feature}</span>
                </li>
              ))}
            </ul>

            <Link href="/pricing">
              <Button variant="primary" className="w-full">
                Get Pro License
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
