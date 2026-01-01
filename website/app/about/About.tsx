'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Shield, Zap, Heart, Code, Github, Download } from 'lucide-react'
import { Card, CardContent, Badge, Button } from '@/components/ui'

const values = [
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your videos never leave your device. We believe in local-first software that respects your privacy.',
  },
  {
    icon: Zap,
    title: 'Simplicity',
    description: 'Video conversion should be simple. No complex settings, no learning curve — just upload and convert.',
  },
  {
    icon: Heart,
    title: 'User Focused',
    description: 'We build features that users actually need. No bloat, no unnecessary complexity.',
  },
  {
    icon: Code,
    title: 'Open Technology',
    description: 'Built on FFmpeg and open web technologies. Transparent, reliable, and proven.',
  },
]

const milestones = [
  { year: '2024', event: 'VideoConvert launched' },
  { year: '2024', event: 'Pro version released' },
  { year: '2024', event: 'CLI support added' },
  { year: '2024', event: 'Batch conversion feature' },
]

export function About() {
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="primary" className="mb-4">About</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Building the Future of{' '}
              <span className="gradient-text">Local Video Processing</span>
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              VideoConvert was born from a simple frustration: why do we need to upload our videos
              to convert them? We built a better way.
            </p>
          </motion.div>
        </div>

        {/* Story */}
        <section className="mb-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-white/60">
                <p>
                  In the age of cloud computing, simple tasks like video conversion often require
                  uploading your files to third-party servers. We asked ourselves: why?
                </p>
                <p>
                  Modern computers are more than capable of handling video processing locally.
                  FFmpeg, the industry-standard video toolkit, can run on any device. So we built
                  VideoConvert — a simple, beautiful interface for local video conversion.
                </p>
                <p>
                  VideoConvert is built for content creators, marketers, and developers who
                  value their privacy and want fast, reliable video conversion without the cloud.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-surface rounded-2xl p-8 border border-white/5"
            >
              <h3 className="text-xl font-semibold text-white mb-6">Milestones</h3>
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-16 text-primary-400 font-mono text-sm">
                      {milestone.year}
                    </div>
                    <div className="flex-1 h-px bg-white/10" />
                    <div className="text-white/80">{milestone.event}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full text-center">
                  <CardContent>
                    <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-6 h-6 text-primary-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                    <p className="text-white/60 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Open Source */}
        <section className="mb-24">
          <Card variant="gradient" className="text-center">
            <CardContent className="py-12">
              <Github className="w-12 h-12 text-white/60 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-white mb-4">Open Source at Heart</h2>
              <p className="text-white/60 max-w-xl mx-auto mb-6">
                VideoConvert is built on open source technologies like FFmpeg, Electron, and Node.js.
                We believe in transparency and giving back to the community.
              </p>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">
                  <Github className="w-5 h-5 mr-2" />
                  View on GitHub
                </Button>
              </a>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Try VideoConvert?
            </h2>
            <p className="text-white/60 mb-6">
              Try VideoConvert for all your video conversion needs.
            </p>
            <Link href="/download">
              <Button size="lg" variant="primary">
                <Download className="w-5 h-5 mr-2" />
                Download Free
              </Button>
            </Link>
          </motion.div>
        </section>
      </div>
    </div>
  )
}
