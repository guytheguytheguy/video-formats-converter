'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Book, Settings, Download, HelpCircle,
  ExternalLink, Monitor
} from 'lucide-react'
import { Card, CardContent, Badge, Button } from '@/components/ui'

const sections = [
  { id: 'quick-start', name: 'Quick Start', icon: Download },
  { id: 'using-the-app', name: 'Using the App', icon: Monitor },
  { id: 'configuration', name: 'Configuration', icon: Settings },
  { id: 'troubleshooting', name: 'Troubleshooting', icon: HelpCircle },
]

export function Docs() {
  const [activeSection, setActiveSection] = useState('quick-start')

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
            <Badge variant="primary" className="mb-4">
              <Book className="w-3 h-3 mr-1" />
              Documentation
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              VideoConvert Docs
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Learn how to use VideoConvert to convert your videos for any platform.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-[250px_1fr] gap-8">
          {/* Sidebar */}
          <nav className="hidden lg:block">
            <div className="sticky top-24 space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? 'bg-primary-500/10 text-primary-400'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <section.icon className="w-4 h-4" />
                  {section.name}
                </button>
              ))}
              <div className="pt-4 border-t border-white/10 mt-4">
                <a
                  href="https://github.com/guytheguytheguy/video-formats-converter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-white/40 hover:text-white text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  View on GitHub
                </a>
              </div>
            </div>
          </nav>

          {/* Content */}
          <div className="space-y-12">
            {/* Quick Start */}
            <section id="quick-start">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Download className="w-6 h-6 text-primary-400" />
                Quick Start
              </h2>
              <Card>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">1. Download & Install</h3>
                    <p className="text-white/60 mb-4">
                      Download VideoConvert for your platform from the{' '}
                      <Link href="/download" className="text-primary-400 hover:underline">
                        downloads page
                      </Link>.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">2. Launch the App</h3>
                    <p className="text-white/60 mb-4">
                      Open VideoConvert. The app window will appear, ready for video conversion.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">3. Convert Your First Video</h3>
                    <ol className="text-white/60 space-y-2 list-decimal list-inside">
                      <li>Drag and drop your video file or click to browse</li>
                      <li>Select your target aspect ratio (16:9, 9:16, 1:1, 4:5)</li>
                      <li>Choose transform mode (Fit, Fill, or Stretch)</li>
                      <li>Click "Convert" and wait for processing</li>
                      <li>Download your converted video</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Using the App */}
            <section id="using-the-app">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Monitor className="w-6 h-6 text-primary-400" />
                Using the App
              </h2>

              <Card className="mb-6">
                <CardContent>
                  <h3 className="text-lg font-semibold text-white mb-4">Aspect Ratios</h3>
                  <p className="text-white/60 mb-4">
                    Choose from four standard aspect ratios optimized for different platforms:
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-background rounded-lg p-4">
                      <div className="font-semibold text-white mb-1">16:9 Landscape</div>
                      <p className="text-white/40 text-sm">YouTube, TV, Desktop</p>
                    </div>
                    <div className="bg-background rounded-lg p-4">
                      <div className="font-semibold text-white mb-1">9:16 Portrait</div>
                      <p className="text-white/40 text-sm">TikTok, Reels, Shorts</p>
                    </div>
                    <div className="bg-background rounded-lg p-4">
                      <div className="font-semibold text-white mb-1">1:1 Square</div>
                      <p className="text-white/40 text-sm">Instagram Feed, Profile</p>
                    </div>
                    <div className="bg-background rounded-lg p-4">
                      <div className="font-semibold text-white mb-1">4:5 Vertical</div>
                      <p className="text-white/40 text-sm">Instagram, Facebook</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardContent>
                  <h3 className="text-lg font-semibold text-white mb-4">Transform Modes</h3>
                  <p className="text-white/60 mb-4">
                    Control how your video is adapted to the new aspect ratio:
                  </p>
                  <div className="space-y-4">
                    <div className="bg-background rounded-lg p-4">
                      <div className="font-semibold text-white mb-1">Fit (Letterbox/Pillarbox)</div>
                      <p className="text-white/40 text-sm">
                        Scales the video to fit within the frame, adding black bars where needed.
                        No content is cropped. Best for preserving the entire video.
                      </p>
                    </div>
                    <div className="bg-background rounded-lg p-4">
                      <div className="font-semibold text-white mb-1">Fill (Crop)</div>
                      <p className="text-white/40 text-sm">
                        Scales the video to completely fill the frame, cropping edges as needed.
                        No black bars. Best when you want edge-to-edge video.
                      </p>
                    </div>
                    <div className="bg-background rounded-lg p-4">
                      <div className="font-semibold text-white mb-1">Stretch</div>
                      <p className="text-white/40 text-sm">
                        Stretches the video to fill the entire frame. This will distort the video
                        if the aspect ratios don't match. Use sparingly.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardContent>
                  <h3 className="text-lg font-semibold text-white mb-4">Output Formats</h3>
                  <p className="text-white/60 mb-4">
                    Export your converted videos in these formats:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    <div className="bg-background rounded-lg p-3 text-center">
                      <div className="font-semibold text-white">MP4</div>
                      <p className="text-white/40 text-xs">Universal</p>
                    </div>
                    <div className="bg-background rounded-lg p-3 text-center">
                      <div className="font-semibold text-white">MOV</div>
                      <p className="text-white/40 text-xs">Apple</p>
                    </div>
                    <div className="bg-background rounded-lg p-3 text-center">
                      <div className="font-semibold text-white">MKV</div>
                      <p className="text-white/40 text-xs">Pro</p>
                    </div>
                    <div className="bg-background rounded-lg p-3 text-center">
                      <div className="font-semibold text-white">AVI</div>
                      <p className="text-white/40 text-xs">Pro</p>
                    </div>
                    <div className="bg-background rounded-lg p-3 text-center">
                      <div className="font-semibold text-white">WebM</div>
                      <p className="text-white/40 text-xs">Pro</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <h3 className="text-lg font-semibold text-white mb-4">Quality Presets</h3>
                  <p className="text-white/60 mb-4">
                    Choose a quality preset based on your needs:
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-3 px-2 text-white font-medium">Preset</th>
                          <th className="text-left py-3 px-2 text-white font-medium">Best For</th>
                          <th className="text-left py-3 px-2 text-white font-medium">Speed</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/5">
                          <td className="py-3 px-2 text-primary-400 font-medium">High</td>
                          <td className="py-3 px-2 text-white/60 text-sm">Final exports, professional use</td>
                          <td className="py-3 px-2 text-white/60 text-sm">Slower</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-3 px-2 text-primary-400 font-medium">Medium</td>
                          <td className="py-3 px-2 text-white/60 text-sm">Social media, general use</td>
                          <td className="py-3 px-2 text-white/60 text-sm">Balanced</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-3 px-2 text-primary-400 font-medium">Low</td>
                          <td className="py-3 px-2 text-white/60 text-sm">Quick shares, smaller files</td>
                          <td className="py-3 px-2 text-white/60 text-sm">Faster</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-3 px-2 text-primary-400 font-medium">Draft</td>
                          <td className="py-3 px-2 text-white/60 text-sm">Previews, testing</td>
                          <td className="py-3 px-2 text-white/60 text-sm">Fastest</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Configuration */}
            <section id="configuration">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Settings className="w-6 h-6 text-primary-400" />
                Configuration
              </h2>

              <Card>
                <CardContent>
                  <h3 className="text-lg font-semibold text-white mb-4">License Activation</h3>
                  <p className="text-white/60 mb-4">
                    To activate your Pro license:
                  </p>
                  <ol className="text-white/60 space-y-2 list-decimal list-inside mb-4">
                    <li>Open VideoConvert settings</li>
                    <li>Navigate to "License" tab</li>
                    <li>Enter your license key (format: VC-XXXX-XXXX-XXXX)</li>
                    <li>Click "Activate"</li>
                  </ol>
                  <p className="text-white/40 text-sm">
                    Your license key was sent to your email after purchase.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Troubleshooting */}
            <section id="troubleshooting">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-primary-400" />
                Troubleshooting
              </h2>

              <div className="space-y-4">
                <Card>
                  <CardContent>
                    <h3 className="font-semibold text-white mb-2">Video conversion fails</h3>
                    <p className="text-white/60 text-sm">
                      Ensure your input file is a valid video format. Try re-encoding with a different tool if the file is corrupted.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <h3 className="font-semibold text-white mb-2">App won't start</h3>
                    <p className="text-white/60 text-sm">
                      Check if port 3000 is already in use. You can change the port in settings or kill the process using that port.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <h3 className="font-semibold text-white mb-2">Output quality is poor</h3>
                    <p className="text-white/60 text-sm">
                      Try using the "high" quality preset. Note that upscaling low-resolution videos will not improve quality.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <h3 className="font-semibold text-white mb-2">Need more help?</h3>
                    <p className="text-white/60 text-sm mb-4">
                      Check our GitHub issues or contact support.
                    </p>
                    <div className="flex gap-4">
                      <a href="https://github.com/guytheguytheguy/video-formats-converter/issues" target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          GitHub Issues
                        </Button>
                      </a>
                      <Link href="/contact">
                        <Button variant="outline" size="sm">
                          Contact Support
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
