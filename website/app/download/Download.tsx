'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Download as DownloadIcon, Monitor, Apple, Check, HardDrive, Cpu, MemoryStick } from 'lucide-react'
import { Card, CardContent, Badge, Button } from '@/components/ui'
import { detectPlatform } from '@/lib/utils'
import { APP_VERSION } from '@/lib/constants'

const platforms = [
  {
    id: 'windows',
    name: 'Windows',
    icon: Monitor,
    requirements: 'Windows 10 or later',
    available: true,
    downloads: [
      { name: 'Installer (.exe)', url: 'https://github.com/guytheguytheguy/video-formats-converter/releases/download/v1.0.0/VideoConvert.Setup.1.0.0.exe', recommended: true },
      { name: 'Portable (.exe)', url: 'https://github.com/guytheguytheguy/video-formats-converter/releases/download/v1.0.0/VideoConvert.1.0.0.exe', recommended: false },
    ],
  },
  {
    id: 'macos',
    name: 'macOS',
    icon: Apple,
    requirements: 'macOS 10.15 (Catalina) or later',
    available: false,
    comingSoon: true,
    downloads: [
      { name: 'DMG', url: '#', recommended: true },
      { name: 'ZIP', url: '#', recommended: false },
    ],
  },
  {
    id: 'linux',
    name: 'Linux',
    icon: Monitor,
    requirements: 'Ubuntu 20.04 or equivalent',
    available: false,
    comingSoon: true,
    downloads: [
      { name: 'AppImage', url: '#', recommended: true },
      { name: '.deb', url: '#', recommended: false },
    ],
  },
]

const systemRequirements = [
  { icon: Cpu, name: 'Processor', value: '64-bit Intel or AMD processor' },
  { icon: MemoryStick, name: 'Memory', value: '4 GB RAM minimum' },
  { icon: HardDrive, name: 'Storage', value: '200 MB available space' },
]

const changelog = [
  {
    version: '1.0.0',
    date: '2025-12-31',
    changes: [
      'Initial release',
      'Support for 16:9, 9:16, 1:1, 4:5 aspect ratios',
      'MP4, MOV, MKV, AVI, WebM output formats',
      'Fit, Fill, Stretch transform modes',
      'Desktop app with intuitive interface',
      'Batch conversion for Pro users',
    ],
  },
]

export function Download() {
  const [detectedPlatform, setDetectedPlatform] = useState<string>('unknown')

  useEffect(() => {
    setDetectedPlatform(detectPlatform())
  }, [])

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
            <Badge variant="secondary" className="mb-4">Download</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Download VideoConvert
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto mb-4">
              Available for Windows, macOS, and Linux. Free to use with optional Pro upgrade.
            </p>
            <p className="text-white/40">
              Current Version: <span className="text-white">{APP_VERSION}</span>
            </p>
          </motion.div>
        </div>

        {/* Platform Downloads */}
        <section className="mb-24">
          <div className="grid md:grid-cols-3 gap-6">
            {platforms.map((platform, index) => {
              const isDetected = platform.id === detectedPlatform
              return (
                <motion.div
                  key={platform.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className={`h-full ${isDetected ? 'border-primary-500/50' : ''} ${platform.comingSoon ? 'opacity-75' : ''}`}>
                    <CardContent className="p-8 text-center">
                      {isDetected && platform.available && (
                        <Badge variant="primary" className="mb-4">Detected</Badge>
                      )}
                      {platform.comingSoon && (
                        <Badge variant="outline" className="mb-4">Coming Soon</Badge>
                      )}
                      <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                        <platform.icon className="w-8 h-8 text-white/60" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{platform.name}</h3>
                      <p className="text-white/40 text-sm mb-6">{platform.requirements}</p>

                      <div className="space-y-3">
                        {platform.available ? (
                          platform.downloads.map((download) => (
                            <a key={download.name} href={download.url}>
                              <Button
                                variant={download.recommended ? 'primary' : 'outline'}
                                className="w-full"
                              >
                                <DownloadIcon className="w-4 h-4 mr-2" />
                                {download.name}
                                {download.recommended && (
                                  <Badge variant="secondary" className="ml-2 text-xs">Recommended</Badge>
                                )}
                              </Button>
                            </a>
                          ))
                        ) : (
                          <div className="py-4">
                            <p className="text-white/40 text-sm">
                              We're working on {platform.name} support. Sign up for our newsletter to be notified when it's ready!
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Installation Instructions */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Installation</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent>
                <h3 className="font-semibold text-white mb-3">Windows</h3>
                <ol className="text-white/60 text-sm space-y-2 list-decimal list-inside">
                  <li>Download the installer</li>
                  <li>Run the .exe file</li>
                  <li>Follow the installation wizard</li>
                  <li>Launch VideoConvert from Start Menu</li>
                </ol>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <h3 className="font-semibold text-white mb-3">macOS</h3>
                <ol className="text-white/60 text-sm space-y-2 list-decimal list-inside">
                  <li>Download the DMG file</li>
                  <li>Open the DMG</li>
                  <li>Drag VideoConvert to Applications</li>
                  <li>Launch from Applications folder</li>
                </ol>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <h3 className="font-semibold text-white mb-3">Linux</h3>
                <ol className="text-white/60 text-sm space-y-2 list-decimal list-inside">
                  <li>Download the AppImage</li>
                  <li>Make it executable: <code className="text-primary-400">chmod +x</code></li>
                  <li>Run the AppImage</li>
                  <li>Optionally integrate with desktop</li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* System Requirements */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">System Requirements</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {systemRequirements.map((req) => (
              <Card key={req.name}>
                <CardContent className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                    <req.icon className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-white/40 text-sm">{req.name}</p>
                    <p className="text-white font-medium">{req.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-white/40 text-sm mt-6">
            FFmpeg is bundled with the application — no additional installation required.
          </p>
        </section>

        {/* Changelog */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Changelog</h2>
          <div className="max-w-2xl mx-auto">
            {changelog.map((release) => (
              <Card key={release.version} className="mb-4">
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Badge variant="primary">v{release.version}</Badge>
                      <span className="text-white/40 text-sm">{release.date}</span>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {release.changes.map((change) => (
                      <li key={change} className="flex items-start gap-2 text-white/60 text-sm">
                        <Check className="w-4 h-4 text-secondary-500 flex-shrink-0 mt-0.5" />
                        {change}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Pro Upgrade CTA */}
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-2xl p-8 md:p-12 border border-white/5 max-w-3xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Want More Features?
            </h2>
            <p className="text-white/60 mb-6">
              Upgrade to Pro for 4K resolution, all formats, batch conversion, and no watermark.
            </p>
            <a href="/pricing">
              <Button variant="primary" size="lg">
                View Pro Features
              </Button>
            </a>
          </motion.div>
        </section>
      </div>
    </div>
  )
}
