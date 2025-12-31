'use client'

import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'
import { Card, CardContent, Badge } from '@/components/ui'
import { APP_NAME } from '@/lib/constants'

export function Terms() {
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
              <FileText className="w-3 h-3 mr-1" />
              Terms of Service
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Terms of Service
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Please read these terms carefully before using {APP_NAME}.
            </p>
            <p className="text-white/40 text-sm mt-4">Last updated: {lastUpdated}</p>
          </motion.div>
        </div>

        {/* Terms Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardContent className="space-y-8">
              <section>
                <h2 className="text-xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                <p className="text-white/60">
                  By downloading, installing, or using {APP_NAME} ("the Software"), you agree to be
                  bound by these Terms of Service ("Terms"). If you do not agree to these Terms,
                  do not use the Software.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-4">2. License Grant</h2>

                <h3 className="text-lg font-semibold text-white mb-2">2.1 Free Version</h3>
                <p className="text-white/60 mb-4">
                  The free version of {APP_NAME} is provided for personal and commercial use. It
                  includes the following limitations:
                </p>
                <ul className="list-disc list-inside text-white/60 space-y-2 mb-4">
                  <li>MP4 output format only</li>
                  <li>Maximum 720p resolution</li>
                  <li>Watermark on output videos</li>
                  <li>Single file conversion (no batch processing)</li>
                </ul>

                <h3 className="text-lg font-semibold text-white mb-2">2.2 Pro License</h3>
                <p className="text-white/60 mb-4">
                  The Pro license is a one-time purchase that grants you:
                </p>
                <ul className="list-disc list-inside text-white/60 space-y-2 mb-4">
                  <li>All output formats (MP4, MOV, MKV, AVI, WebM)</li>
                  <li>Up to 4K resolution output</li>
                  <li>No watermark</li>
                  <li>Batch conversion</li>
                  <li>Lifetime updates for the current major version</li>
                  <li>Use on up to 3 devices you own</li>
                </ul>
                <p className="text-white/60">
                  The Pro license is personal and non-transferable. It may not be shared, sold,
                  or redistributed.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-4">3. Restrictions</h2>
                <p className="text-white/60 mb-4">
                  You may NOT:
                </p>
                <ul className="list-disc list-inside text-white/60 space-y-2">
                  <li>Reverse engineer, decompile, or disassemble the Software</li>
                  <li>Modify, adapt, or create derivative works of the Software</li>
                  <li>Remove or alter any proprietary notices or labels</li>
                  <li>Use the Software to violate any laws or regulations</li>
                  <li>Redistribute or resell the Software or licenses</li>
                  <li>Share your Pro license key with others</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-4">4. Content Responsibility</h2>
                <p className="text-white/60">
                  You are solely responsible for the content you process using {APP_NAME}. You
                  represent that you have all necessary rights to the videos you convert and that
                  your use does not violate any third-party rights or applicable laws.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-4">5. Intellectual Property</h2>
                <p className="text-white/60">
                  {APP_NAME} and all associated intellectual property rights are owned by us.
                  These Terms do not grant you any rights to our trademarks, service marks, or logos.
                  The Software includes open-source components (such as FFmpeg) which are subject
                  to their respective licenses.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-4">6. Disclaimer of Warranties</h2>
                <p className="text-white/60">
                  THE SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
                  INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                  PARTICULAR PURPOSE, AND NONINFRINGEMENT. WE DO NOT WARRANT THAT THE SOFTWARE WILL
                  BE ERROR-FREE OR UNINTERRUPTED.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-4">7. Limitation of Liability</h2>
                <p className="text-white/60">
                  IN NO EVENT SHALL WE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                  CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE
                  SOFTWARE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. OUR
                  TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID FOR THE SOFTWARE.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-4">8. Refund Policy</h2>
                <p className="text-white/60">
                  We offer a 14-day money-back guarantee for Pro license purchases. If you are not
                  satisfied with the Software, contact us within 14 days of purchase for a full
                  refund. Refund requests after 14 days will be considered on a case-by-case basis.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-4">9. Updates and Support</h2>
                <p className="text-white/60">
                  Pro license holders receive lifetime updates for the current major version of
                  {APP_NAME}. We provide support through email and GitHub Issues. While we strive
                  to respond promptly, we do not guarantee specific response times.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-4">10. Termination</h2>
                <p className="text-white/60">
                  We may terminate your license if you violate these Terms. Upon termination, you
                  must cease all use of the Software and delete all copies. Sections 4-7 shall
                  survive termination.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-4">11. Changes to Terms</h2>
                <p className="text-white/60">
                  We reserve the right to modify these Terms at any time. We will notify you of
                  significant changes by updating the "Last updated" date. Continued use of the
                  Software after changes constitutes acceptance of the new Terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-4">12. Governing Law</h2>
                <p className="text-white/60">
                  These Terms shall be governed by and construed in accordance with applicable laws,
                  without regard to conflict of law principles.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-4">13. Contact</h2>
                <p className="text-white/60">
                  If you have any questions about these Terms, please contact us at{' '}
                  <a href="mailto:legal@videoconvert.app" className="text-primary-400 hover:underline">
                    legal@videoconvert.app
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
