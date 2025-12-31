'use client'

import { motion } from 'framer-motion'
import { Monitor, Smartphone, Square, RectangleVertical, Crop, Maximize2, Move, FileVideo } from 'lucide-react'
import { Card, CardContent, Badge } from '@/components/ui'
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

export function Features() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Features</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Everything You Need for Video Conversion
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Convert aspect ratios, change formats, and optimize your videos for any platform.
          </p>
        </div>

        {/* Aspect Ratios */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-white mb-6 text-center">Aspect Ratios</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ASPECT_RATIOS.map((ar, index) => {
              const Icon = iconMap[ar.icon] || Square
              return (
                <motion.div
                  key={ar.ratio}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="text-center hover:border-primary-500/50 transition-colors h-full">
                    <CardContent>
                      <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-primary-400" />
                      </div>
                      <h4 className="text-2xl font-bold text-white mb-1">{ar.ratio}</h4>
                      <p className="text-white/60 text-sm mb-3">{ar.name}</p>
                      <div className="flex flex-wrap justify-center gap-1">
                        {ar.platforms.map((platform) => (
                          <Badge key={platform} variant="default" className="text-xs">
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
        </div>

        {/* Transform Modes */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-white mb-6 text-center">Transform Modes</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {TRANSFORM_MODES.map((mode, index) => {
              const Icon = iconMap[mode.icon] || Move
              return (
                <motion.div
                  key={mode.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="hover:border-secondary-500/50 transition-colors h-full">
                    <CardContent className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-secondary-500/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-secondary-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">{mode.name}</h4>
                        <p className="text-white/60 text-sm">{mode.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Formats */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-6 text-center">Output Formats</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {FORMATS.map((format, index) => (
              <motion.div
                key={format.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="text-center hover:border-white/20 transition-colors h-full">
                  <CardContent>
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mx-auto mb-3">
                      <FileVideo className="w-5 h-5 text-white/60" />
                    </div>
                    <h4 className="font-bold text-white mb-1">{format.name}</h4>
                    <p className="text-white/40 text-xs mb-2">{format.description}</p>
                    {format.free ? (
                      <Badge variant="secondary" className="text-xs">Free</Badge>
                    ) : (
                      <Badge variant="primary" className="text-xs">Pro</Badge>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
