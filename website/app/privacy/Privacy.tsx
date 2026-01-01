'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, Eye, Server, FileText } from 'lucide-react'
import { Card, CardContent, Badge } from '@/components/ui'
import { APP_NAME } from '@/lib/constants'

const highlights = [
  {
    icon: Lock,
    title: 'No Video Uploads',
    description: 'Your videos are processed locally on your device and never uploaded to our servers.',
  },
  {
    icon: Eye,
    title: 'No Tracking',
    description: 'We do not use analytics or tracking cookies in the desktop application.',
  },
  {
    icon: Server,
    title: 'No Cloud Storage',
    description: 'We do not store any of your videos or personal files on our servers.',
  },
  {
    icon: FileText,
    title: 'Minimal Data',
    description: 'We only collect what is necessary for license validation and support.',
  },
]

export function Privacy() {
  const lastUpdated = 'January 15, 2024'

  return (
    <div className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="primary" className="mb-4">
              <Shield className="w-3 h-3 mr-1" />
              Privacy Policy
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Your Privacy Matters
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              {APP_NAME} is designed with privacy at its core. Your videos never leave your device.
            </p>
            <p className="text-white/40 text-sm mt-4">Last updated: {lastUpdated}</p>
          </motion.div>
        </div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid sm:grid-cols-2 gap-4 mb-16"
        >
          {highlights.map((item) => (
            <Card key={item.title}>
              <CardContent className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary-500/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-secondary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-white/60 text-sm">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Full Policy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="prose prose-invert max-w-none"
        >
          <Card>
            <CardContent className="space-y-8">
              <section>
                <h2 className="text-xl font-bold text-white mb-4">1. Introduction</h2>
                <p className="text-white/60">
                  This Privacy Policy explains how {APP_NAME} ("we", "our", or "us") collects, uses,
                  and protects your information when you use our desktop application and website.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-4">2. Information We Do NOT Collect</h2>
                <p className="text-white/60 mb-4">
                  {APP_NAME} is designed to protect your privacy. We do NOT collect:
                </p>
                <ul className="list-disc list-inside text-white/60 space-y-2">
                  <li>Your video files or their contents</li>
                  <li>Your file names or metadata</li>
                  <li>Your browsing history or usage patterns in the app</li>
                  <li>Your IP address from the desktop application</li>
                  <li>Any personal information without your explicit consent</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-4">3. Information We May Collect</h2>
                <p className="text-white/60 mb-4">
                  We may collect limited information in the following cases:
                </p>
                <h3 className="text-lg font-semibold text-white mb-2">3.1 License Validation</h3>
                <p className="text-white/60 mb-4">
                  When you activate a Pro license, we validate your license key with our payment
                  provider (LemonSqueezy). This process may involve:
                </p>
                <ul className="list-disc list-inside text-white/60 space-y-2 mb-4">
                  <li>Your license key</li>
                  <li>A device identifier for license activation</li>
                </ul>

                <h3 className="text-lg font-semibold text-white mb-2">3.2 Website Analytics</h3>
                <p className="text-white/60">
                  Our website may use privacy-respecting analytics to understand general traffic
                  patterns. This data is aggregated and does not identify individual users.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-4">4. Local Processing</h2>
                <p className="text-white/60">
                  All video conversion happens locally on your device using FFmpeg. Your videos are
                  never uploaded to our servers or any third-party services. The conversion process
                  is entirely offline-capable.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-4">5. Third-Party Services</h2>
                <p className="text-white/60 mb-4">
                  We use the following third-party services:
                </p>
                <ul className="list-disc list-inside text-white/60 space-y-2">
                  <li>
                    <strong className="text-white">LemonSqueezy</strong> - Payment processing and
                    license management. See their{' '}
                    <a href="https://www.lemonsqueezy.com/privacy" className="text-primary-400 hover:underline">
                      privacy policy
                    </a>.
                  </li>
                  <li>
                    <strong className="text-white">Vercel</strong> - Website hosting. See their{' '}
                    <a href="https://vercel.com/legal/privacy-policy" className="text-primary-400 hover:underline">
                      privacy policy
                    </a>.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-4">6. Data Security</h2>
                <p className="text-white/60">
                  Since your videos are processed locally and never leave your device, they are
                  protected by your own device's security measures. Any data transmitted for license
                  validation is encrypted using HTTPS.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-4">7. Your Rights</h2>
                <p className="text-white/60 mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-white/60 space-y-2">
                  <li>Request information about any data we may have</li>
                  <li>Request deletion of your license data</li>
                  <li>Opt out of any communications</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-4">8. Changes to This Policy</h2>
                <p className="text-white/60">
                  We may update this Privacy Policy from time to time. We will notify you of any
                  significant changes by updating the "Last updated" date at the top of this page.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-4">9. Contact Us</h2>
                <p className="text-white/60">
                  If you have any questions about this Privacy Policy, please contact us at{' '}
                  <a href="mailto:contact@videoconvert.video" className="text-primary-400 hover:underline">
                    contact@videoconvert.video
                  </a>.
                </p>
              </section>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
