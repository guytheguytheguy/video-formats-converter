'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Download, Play, Shield, Zap } from 'lucide-react'
import { Button, Badge } from '@/components/ui'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="primary" className="mb-6">
              <Shield className="w-3 h-3 mr-1" />
              100% Local Processing - Your Videos Stay Private
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            Transform Videos for{' '}
            <span className="gradient-text">Any Platform</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-8"
          >
            Convert YouTube videos to TikTok, Instagram Reels, and more.
            Change aspect ratios and formats instantly — all without uploading to the cloud.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link href="/download">
              <Button size="lg" variant="primary">
                <Download className="w-5 h-5 mr-2" />
                Download Free
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline">
                <Play className="w-5 h-5 mr-2" />
                Try Demo
              </Button>
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 text-white/40 text-sm"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-secondary-500" />
              <span>No Cloud Upload</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-secondary-500" />
              <span>Instant Conversion</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-secondary-500" />
              <span>Windows, Mac, Linux</span>
            </div>
          </motion.div>
        </div>

        {/* Hero Visual - Aspect Ratio Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 relative"
        >
          <div className="bg-surface/80 backdrop-blur-xl rounded-2xl border border-white/10 p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              {/* 16:9 Preview */}
              <div className="text-center">
                <div className="w-48 h-27 md:w-64 md:h-36 bg-gradient-to-br from-primary-500/30 to-primary-500/10 rounded-lg border border-primary-500/30 flex items-center justify-center mb-3">
                  <span className="text-primary-400 font-mono text-sm">16:9</span>
                </div>
                <p className="text-white/60 text-sm">YouTube / Desktop</p>
              </div>

              {/* Arrow */}
              <div className="text-white/40">
                <svg className="w-8 h-8 md:rotate-0 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>

              {/* 9:16 Preview */}
              <div className="text-center">
                <div className="w-20 h-36 md:w-24 md:h-44 bg-gradient-to-br from-secondary-500/30 to-secondary-500/10 rounded-lg border border-secondary-500/30 flex items-center justify-center mb-3">
                  <span className="text-secondary-400 font-mono text-sm">9:16</span>
                </div>
                <p className="text-white/60 text-sm">TikTok / Reels</p>
              </div>

              {/* 1:1 Preview */}
              <div className="text-center">
                <div className="w-28 h-28 md:w-32 md:h-32 bg-gradient-to-br from-purple-500/30 to-purple-500/10 rounded-lg border border-purple-500/30 flex items-center justify-center mb-3">
                  <span className="text-purple-400 font-mono text-sm">1:1</span>
                </div>
                <p className="text-white/60 text-sm">Instagram / FB</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
