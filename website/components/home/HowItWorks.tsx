'use client'

import { motion } from 'framer-motion'
import { Upload, Settings, Download } from 'lucide-react'
import { Badge } from '@/components/ui'

const steps = [
  {
    icon: Upload,
    title: 'Upload Your Video',
    description: 'Drag and drop your video file or click to browse. Supports MP4, MOV, MKV, AVI, and WebM.',
    color: 'primary',
  },
  {
    icon: Settings,
    title: 'Choose Settings',
    description: 'Select your target aspect ratio, output format, and transform mode. Preview the result instantly.',
    color: 'secondary',
  },
  {
    icon: Download,
    title: 'Download & Share',
    description: 'Your converted video is ready! Download it and share directly to TikTok, Instagram, or YouTube.',
    color: 'purple',
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="primary" className="mb-4">How It Works</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Convert in Three Simple Steps
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            No complex settings, no learning curve. Just upload, choose, and download.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-white/20 to-transparent" />
              )}

              <div className="text-center">
                {/* Step Number */}
                <div className="relative inline-flex mb-6">
                  <div className={`
                    w-24 h-24 rounded-2xl flex items-center justify-center
                    ${step.color === 'primary' ? 'bg-primary-500/10 border border-primary-500/20' : ''}
                    ${step.color === 'secondary' ? 'bg-secondary-500/10 border border-secondary-500/20' : ''}
                    ${step.color === 'purple' ? 'bg-purple-500/10 border border-purple-500/20' : ''}
                  `}>
                    <step.icon className={`
                      w-10 h-10
                      ${step.color === 'primary' ? 'text-primary-400' : ''}
                      ${step.color === 'secondary' ? 'text-secondary-400' : ''}
                      ${step.color === 'purple' ? 'text-purple-400' : ''}
                    `} />
                  </div>
                  <div className={`
                    absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                    ${step.color === 'primary' ? 'bg-primary-500 text-white' : ''}
                    ${step.color === 'secondary' ? 'bg-secondary-500 text-white' : ''}
                    ${step.color === 'purple' ? 'bg-purple-500 text-white' : ''}
                  `}>
                    {index + 1}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-white/60">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
