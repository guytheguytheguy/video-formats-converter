'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Download, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui'

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-500/10 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Videos?
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-8">
            Download VideoConvert for free and start converting your videos for any platform.
            No account required, no cloud uploads — just fast, local processing.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/download">
              <Button size="lg" variant="primary">
                <Download className="w-5 h-5 mr-2" />
                Download for Free
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline">
                View Pricing
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          <p className="text-white/40 text-sm mt-6">
            Available for Windows, macOS, and Linux
          </p>
        </motion.div>
      </div>
    </section>
  )
}
