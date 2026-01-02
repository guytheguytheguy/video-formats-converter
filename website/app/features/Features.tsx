'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Monitor, Smartphone, Square, RectangleVertical,
  Crop, Maximize2, Move, FileVideo, Shield, Zap,
  HardDrive, Layers, Lock, Download
} from 'lucide-react'
import { Card, CardContent, Badge, Button } from '@/components/ui'
import { ASPECT_RATIOS, FORMATS, TRANSFORM_MODES } from '@/lib/constants'

const iconMap: Record<string, any> = {
  Monitor,
  Smartphone,
  Square,
  RectangleVertical,
  Crop,
  Maximize2,
  Move,
}

const coreFeatures = [
  {
    icon: Shield,
    title: '100% Local Processing',
    description: 'Your videos never leave your device. All conversion happens locally, ensuring complete privacy.',
    color: 'secondary',
  },
  {
    icon: Zap,
    title: 'Powered by FFmpeg',
    description: 'Built on the industry-standard video processing engine used by YouTube, Netflix, and professionals worldwide.',
    color: 'primary',
  },
  {
    icon: HardDrive,
    title: 'No Cloud Required',
    description: 'Works completely offline. No internet connection needed after installation.',
    color: 'purple',
  },
  {
    icon: Layers,
    title: 'Batch Processing',
    description: 'Convert multiple videos at once. Queue up your files and let VideoConvert handle the rest.',
    color: 'primary',
  },
  {
    icon: Lock,
    title: 'No Account Needed',
    description: 'Download and use immediately. No sign-up, no login, no tracking.',
    color: 'purple',
  },
]

const qualityPresets = [
  { name: 'High', crf: 18, preset: 'Slow', useCase: 'Final production' },
  { name: 'Medium', crf: 23, preset: 'Medium', useCase: 'General use' },
  { name: 'Low', crf: 28, preset: 'Fast', useCase: 'Quick exports' },
  { name: 'Draft', crf: 32, preset: 'Ultrafast', useCase: 'Preview only' },
]

export function Features() {
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
            <Badge variant="primary" className="mb-4">Features</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Everything You Need for{' '}
              <span className="gradient-text">Video Conversion</span>
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              A complete toolkit for converting video aspect ratios and formats.
              Built for content creators, marketers, and developers.
            </p>
          </motion.div>
        </div>

        {/* Core Features */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Core Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:border-white/20 transition-colors">
                  <CardContent>
                    <div className={`
                      w-12 h-12 rounded-lg flex items-center justify-center mb-4
                      ${feature.color === 'primary' ? 'bg-primary-500/10' : ''}
                      ${feature.color === 'secondary' ? 'bg-secondary-500/10' : ''}
                      ${feature.color === 'purple' ? 'bg-purple-500/10' : ''}
                    `}>
                      <feature.icon className={`
                        w-6 h-6
                        ${feature.color === 'primary' ? 'text-primary-400' : ''}
                        ${feature.color === 'secondary' ? 'text-secondary-400' : ''}
                        ${feature.color === 'purple' ? 'text-purple-400' : ''}
                      `} />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-white/60">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Aspect Ratios */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Supported Aspect Ratios</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {ASPECT_RATIOS.map((ar, index) => {
              const Icon = iconMap[ar.icon] || Square
              return (
                <motion.div
                  key={ar.ratio}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="text-center hover:border-primary-500/50 transition-colors h-full">
                    <CardContent>
                      <div className="w-16 h-16 rounded-xl bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-primary-400" />
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-2">{ar.ratio}</h3>
                      <p className="text-white/60 text-lg mb-4">{ar.name}</p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {ar.platforms.map((platform) => (
                          <Badge key={platform} variant="default">
                            {platform}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Transform Modes */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Transform Modes</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {TRANSFORM_MODES.map((mode, index) => {
              const Icon = iconMap[mode.icon] || Move
              return (
                <motion.div
                  key={mode.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:border-secondary-500/50 transition-colors">
                    <CardContent className="text-center">
                      <div className="w-16 h-16 rounded-xl bg-secondary-500/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-secondary-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">{mode.name}</h3>
                      <p className="text-white/60">{mode.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Output Formats */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Output Formats</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {FORMATS.map((format, index) => (
              <motion.div
                key={format.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="text-center hover:border-white/20 transition-colors h-full">
                  <CardContent>
                    <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mx-auto mb-3">
                      <FileVideo className="w-6 h-6 text-white/60" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-1">{format.name}</h4>
                    <p className="text-white/40 text-sm mb-3">{format.description}</p>
                    {format.free ? (
                      <Badge variant="secondary">Free</Badge>
                    ) : (
                      <Badge variant="primary">Pro</Badge>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Quality Presets */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Quality Presets</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-white font-semibold">Preset</th>
                  <th className="text-left py-4 px-4 text-white font-semibold">Quality (CRF)</th>
                  <th className="text-left py-4 px-4 text-white font-semibold">Speed</th>
                  <th className="text-left py-4 px-4 text-white font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody>
                {qualityPresets.map((preset) => (
                  <tr key={preset.name} className="border-b border-white/5">
                    <td className="py-4 px-4 text-white font-medium">{preset.name}</td>
                    <td className="py-4 px-4 text-white/60">{preset.crf}</td>
                    <td className="py-4 px-4 text-white/60">{preset.preset}</td>
                    <td className="py-4 px-4 text-white/60">{preset.useCase}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-2xl p-8 md:p-12 border border-white/5"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Start Converting?
            </h2>
            <p className="text-white/60 mb-6 max-w-xl mx-auto">
              Download VideoConvert for free and experience fast, local video conversion.
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
