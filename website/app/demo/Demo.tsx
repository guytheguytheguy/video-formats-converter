'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Upload, Play, Download, Check, Monitor, Smartphone,
  Square, RectangleVertical, Crop, Maximize2, Move, RefreshCw
} from 'lucide-react'
import { Card, CardContent, Badge, Button } from '@/components/ui'

const aspectRatios = [
  { ratio: '16:9', name: 'Landscape', icon: Monitor, width: 160, height: 90 },
  { ratio: '9:16', name: 'Portrait', icon: Smartphone, width: 90, height: 160 },
  { ratio: '1:1', name: 'Square', icon: Square, width: 120, height: 120 },
  { ratio: '4:5', name: 'Portrait+', icon: RectangleVertical, width: 100, height: 125 },
]

const transformModes = [
  { id: 'fit', name: 'Fit', icon: Maximize2, description: 'Letterbox' },
  { id: 'fill', name: 'Fill', icon: Crop, description: 'Crop to fill' },
  { id: 'stretch', name: 'Stretch', icon: Move, description: 'Distort' },
]

const formats = ['MP4', 'MOV', 'MKV', 'AVI', 'WebM']

type DemoState = 'upload' | 'configure' | 'converting' | 'complete'

export function Demo() {
  const [state, setState] = useState<DemoState>('upload')
  const [selectedRatio, setSelectedRatio] = useState('9:16')
  const [selectedMode, setSelectedMode] = useState('fit')
  const [selectedFormat, setSelectedFormat] = useState('MP4')
  const [progress, setProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const handleUpload = () => {
    setState('configure')
  }

  const handleConvert = () => {
    setState('converting')
    setProgress(0)
  }

  useEffect(() => {
    if (state === 'converting') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setState('complete')
            return 100
          }
          return prev + 2
        })
      }, 50)
      return () => clearInterval(interval)
    }
  }, [state])

  const handleReset = () => {
    setState('upload')
    setProgress(0)
  }

  const currentRatio = aspectRatios.find((r) => r.ratio === selectedRatio)

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="primary" className="mb-4">Interactive Demo</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Try VideoConvert
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              See how easy it is to convert video aspect ratios. This is a simulated demo —
              download the app for actual conversion.
            </p>
          </motion.div>
        </div>

        {/* Demo Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Card variant="gradient" className="overflow-hidden">
            <CardContent className="p-0">
              {/* Progress Steps */}
              <div className="flex border-b border-white/10">
                {['Upload', 'Configure', 'Convert', 'Download'].map((step, index) => {
                  const stepStates: DemoState[] = ['upload', 'configure', 'converting', 'complete']
                  const isActive = stepStates.indexOf(state) >= index
                  const isCurrent = stepStates[index] === state
                  return (
                    <div
                      key={step}
                      className={`flex-1 py-4 text-center text-sm font-medium border-b-2 transition-colors ${
                        isCurrent
                          ? 'border-primary-500 text-primary-400'
                          : isActive
                          ? 'border-secondary-500 text-secondary-400'
                          : 'border-transparent text-white/40'
                      }`}
                    >
                      {step}
                    </div>
                  )
                })}
              </div>

              <div className="p-8">
                <AnimatePresence mode="wait">
                  {/* Upload State */}
                  {state === 'upload' && (
                    <motion.div
                      key="upload"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-center"
                    >
                      <div
                        onClick={handleUpload}
                        onDragOver={(e) => {
                          e.preventDefault()
                          setIsDragging(true)
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(e) => {
                          e.preventDefault()
                          setIsDragging(false)
                          handleUpload()
                        }}
                        className={`
                          border-2 border-dashed rounded-xl p-12 cursor-pointer transition-all
                          ${isDragging
                            ? 'border-primary-500 bg-primary-500/10'
                            : 'border-white/20 hover:border-white/40'
                          }
                        `}
                      >
                        <Upload className="w-12 h-12 text-white/40 mx-auto mb-4" />
                        <p className="text-white font-medium mb-2">
                          Drop your video here or click to browse
                        </p>
                        <p className="text-white/40 text-sm">
                          Supports MP4, MOV, MKV, AVI, WebM (Demo: Click to simulate)
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Configure State */}
                  {state === 'configure' && (
                    <motion.div
                      key="configure"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Preview */}
                        <div className="text-center">
                          <h3 className="text-white font-semibold mb-4">Preview</h3>
                          <div className="flex items-center justify-center gap-4">
                            {/* Source */}
                            <div>
                              <div className="w-32 h-[72px] bg-gradient-to-br from-blue-500/30 to-blue-500/10 rounded-lg border border-blue-500/30 flex items-center justify-center mb-2">
                                <Play className="w-6 h-6 text-blue-400" />
                              </div>
                              <p className="text-white/40 text-xs">Original (16:9)</p>
                            </div>

                            {/* Arrow */}
                            <div className="text-white/40">→</div>

                            {/* Target */}
                            <div>
                              <div
                                style={{
                                  width: currentRatio ? currentRatio.width * 0.8 : 72,
                                  height: currentRatio ? currentRatio.height * 0.8 : 128,
                                }}
                                className="bg-gradient-to-br from-primary-500/30 to-secondary-500/10 rounded-lg border border-primary-500/30 flex items-center justify-center mb-2 mx-auto transition-all"
                              >
                                <Play className="w-6 h-6 text-primary-400" />
                              </div>
                              <p className="text-white/40 text-xs">{selectedRatio}</p>
                            </div>
                          </div>
                        </div>

                        {/* Options */}
                        <div className="space-y-6">
                          {/* Aspect Ratio */}
                          <div>
                            <h3 className="text-white font-semibold mb-3">Aspect Ratio</h3>
                            <div className="grid grid-cols-4 gap-2">
                              {aspectRatios.map((ar) => (
                                <button
                                  key={ar.ratio}
                                  onClick={() => setSelectedRatio(ar.ratio)}
                                  className={`p-3 rounded-lg border text-center transition-all ${
                                    selectedRatio === ar.ratio
                                      ? 'border-primary-500 bg-primary-500/10'
                                      : 'border-white/10 hover:border-white/20'
                                  }`}
                                >
                                  <ar.icon className={`w-4 h-4 mx-auto mb-1 ${
                                    selectedRatio === ar.ratio ? 'text-primary-400' : 'text-white/60'
                                  }`} />
                                  <span className={`text-xs ${
                                    selectedRatio === ar.ratio ? 'text-white' : 'text-white/60'
                                  }`}>
                                    {ar.ratio}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Transform Mode */}
                          <div>
                            <h3 className="text-white font-semibold mb-3">Transform Mode</h3>
                            <div className="grid grid-cols-3 gap-2">
                              {transformModes.map((mode) => (
                                <button
                                  key={mode.id}
                                  onClick={() => setSelectedMode(mode.id)}
                                  className={`p-3 rounded-lg border text-center transition-all ${
                                    selectedMode === mode.id
                                      ? 'border-secondary-500 bg-secondary-500/10'
                                      : 'border-white/10 hover:border-white/20'
                                  }`}
                                >
                                  <mode.icon className={`w-4 h-4 mx-auto mb-1 ${
                                    selectedMode === mode.id ? 'text-secondary-400' : 'text-white/60'
                                  }`} />
                                  <span className={`text-xs block ${
                                    selectedMode === mode.id ? 'text-white' : 'text-white/60'
                                  }`}>
                                    {mode.name}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Format */}
                          <div>
                            <h3 className="text-white font-semibold mb-3">Output Format</h3>
                            <div className="flex flex-wrap gap-2">
                              {formats.map((format) => (
                                <button
                                  key={format}
                                  onClick={() => setSelectedFormat(format)}
                                  className={`px-3 py-1.5 rounded-lg border text-sm transition-all ${
                                    selectedFormat === format
                                      ? 'border-primary-500 bg-primary-500/10 text-white'
                                      : 'border-white/10 text-white/60 hover:border-white/20'
                                  }`}
                                >
                                  {format}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 text-center">
                        <Button onClick={handleConvert} size="lg" variant="primary">
                          <Play className="w-5 h-5 mr-2" />
                          Start Conversion
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Converting State */}
                  {state === 'converting' && (
                    <motion.div
                      key="converting"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-center py-8"
                    >
                      <div className="w-24 h-24 rounded-full border-4 border-primary-500/20 border-t-primary-500 animate-spin mx-auto mb-6" />
                      <h3 className="text-xl font-semibold text-white mb-2">Converting...</h3>
                      <p className="text-white/60 mb-6">
                        Processing your video with FFmpeg
                      </p>
                      <div className="max-w-md mx-auto">
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-100"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <p className="text-white/40 text-sm mt-2">{progress}%</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Complete State */}
                  {state === 'complete' && (
                    <motion.div
                      key="complete"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-center py-8"
                    >
                      <div className="w-20 h-20 rounded-full bg-secondary-500/20 flex items-center justify-center mx-auto mb-6">
                        <Check className="w-10 h-10 text-secondary-500" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">Conversion Complete!</h3>
                      <p className="text-white/60 mb-6">
                        Your video has been converted to {selectedRatio} in {selectedFormat} format.
                      </p>
                      <div className="flex items-center justify-center gap-4">
                        <Button variant="primary" disabled>
                          <Download className="w-5 h-5 mr-2" />
                          Download (Demo)
                        </Button>
                        <Button variant="outline" onClick={handleReset}>
                          <RefreshCw className="w-5 h-5 mr-2" />
                          Try Again
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-white/60 mb-4">
            Like what you see? Download the real app for actual video conversion.
          </p>
          <Link href="/download">
            <Button size="lg" variant="primary">
              <Download className="w-5 h-5 mr-2" />
              Download VideoConvert
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
