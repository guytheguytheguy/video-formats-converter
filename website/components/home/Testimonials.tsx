'use client'

import { motion } from 'framer-motion'
import { Star, Github, Download } from 'lucide-react'
import { Badge } from '@/components/ui'

const stats = [
  { value: '10K+', label: 'Downloads', icon: Download },
  { value: '500+', label: 'GitHub Stars', icon: Star },
  { value: '4.9', label: 'User Rating', icon: Star },
]

const testimonials = [
  {
    quote: "Finally, a video converter that doesn't require uploading to some sketchy website. Everything stays on my machine.",
    author: 'Sarah K.',
    role: 'Content Creator',
    avatar: 'SK',
  },
  {
    quote: "I convert dozens of YouTube clips to TikTok format every week. This tool saves me hours of editing time.",
    author: 'Mike R.',
    role: 'Social Media Manager',
    avatar: 'MR',
  },
  {
    quote: "The CLI integration is perfect for my workflow. I can batch convert videos programmatically.",
    author: 'David L.',
    role: 'Developer',
    avatar: 'DL',
  },
]

export function Testimonials() {
  return (
    <section className="py-24 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="primary" className="mb-4">Social Proof</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Creators Worldwide
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            See what content creators, marketers, and developers are saying about VideoConvert.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mb-16 max-w-2xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                {stat.value}
              </div>
              <p className="text-white/60 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-surface rounded-xl border border-white/5 p-6"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/80 mb-6">"{testimonial.quote}"</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-medium text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-medium text-white">{testimonial.author}</p>
                  <p className="text-white/40 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <Github className="w-5 h-5" />
            <span>Star us on GitHub</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
