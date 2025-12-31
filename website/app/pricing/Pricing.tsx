'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check, X, Download, CreditCard, HelpCircle } from 'lucide-react'
import { Card, CardContent, Badge, Button } from '@/components/ui'
import { PRICING } from '@/lib/constants'

const comparisonFeatures = [
  { name: 'MP4 Output', free: true, pro: true },
  { name: 'MOV, MKV, AVI, WebM Output', free: false, pro: true },
  { name: 'All Aspect Ratios (16:9, 9:16, 1:1, 4:5)', free: true, pro: true },
  { name: 'All Transform Modes (Fit, Fill, Stretch)', free: true, pro: true },
  { name: '720p Resolution', free: true, pro: true },
  { name: '1080p Resolution', free: false, pro: true },
  { name: '4K Resolution', free: false, pro: true },
  { name: 'Batch Conversion', free: false, pro: true },
  { name: 'No Watermark', free: false, pro: true },
  { name: 'CLI Access', free: true, pro: true },
  { name: 'Web Dashboard', free: true, pro: true },
  { name: 'Custom Presets', free: false, pro: true },
  { name: 'Lifetime Updates', free: true, pro: true },
  { name: 'Priority Support', free: false, pro: true },
]

const faqs = [
  {
    question: 'Is there a subscription?',
    answer: 'No! VideoConvert Pro is a one-time purchase. Pay once and use forever, including all future updates.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and Apple Pay through our secure payment provider LemonSqueezy.',
  },
  {
    question: 'Can I try before I buy?',
    answer: 'Yes! The free version is fully functional with MP4 output and 720p resolution. The only limitation is the watermark.',
  },
  {
    question: 'What if I need a refund?',
    answer: 'We offer a 14-day money-back guarantee. If you are not satisfied, contact us for a full refund.',
  },
  {
    question: 'How do I activate my Pro license?',
    answer: 'After purchase, you will receive a license key via email. Enter it in the app settings to unlock Pro features.',
  },
  {
    question: 'Can I use Pro on multiple computers?',
    answer: 'Yes! Your license key works on up to 3 devices that you own. Contact us if you need more seats.',
  },
]

export function Pricing() {
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
            <Badge variant="secondary" className="mb-4">Pricing</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Start free, upgrade when you need more. No subscriptions, no hidden fees.
            </p>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-24">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full">
              <CardContent className="p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">{PRICING.free.name}</h2>
                  <p className="text-white/60 mb-4">Perfect for getting started</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-white">$0</span>
                    <span className="text-white/60">forever</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {PRICING.free.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-secondary-500 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/download">
                  <Button variant="outline" className="w-full" size="lg">
                    <Download className="w-5 h-5 mr-2" />
                    Download Free
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card variant="gradient" className="h-full border-primary-500/30 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge variant="primary" className="shadow-lg">Most Popular</Badge>
              </div>
              <CardContent className="p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">{PRICING.pro.name}</h2>
                  <p className="text-white/60 mb-4">For power users and professionals</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-white">${PRICING.pro.price}</span>
                    <span className="text-white/40 line-through text-xl">${PRICING.pro.originalPrice}</span>
                    <span className="text-white/60">one-time</span>
                  </div>
                  <Badge variant="secondary" className="mt-2">Save 40%</Badge>
                </div>

                <ul className="space-y-4 mb-8">
                  {PRICING.pro.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button variant="primary" className="w-full" size="lg">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Get Pro License
                </Button>

                <p className="text-white/40 text-sm text-center mt-4">
                  14-day money-back guarantee
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Feature Comparison */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full max-w-3xl mx-auto">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-white font-semibold">Feature</th>
                  <th className="text-center py-4 px-4 text-white font-semibold w-32">Free</th>
                  <th className="text-center py-4 px-4 text-white font-semibold w-32">Pro</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature) => (
                  <tr key={feature.name} className="border-b border-white/5">
                    <td className="py-4 px-4 text-white/80">{feature.name}</td>
                    <td className="py-4 px-4 text-center">
                      {feature.free ? (
                        <Check className="w-5 h-5 text-secondary-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-white/20 mx-auto" />
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {feature.pro ? (
                        <Check className="w-5 h-5 text-primary-400 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-white/20 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            <HelpCircle className="w-6 h-6 inline mr-2" />
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent>
                    <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                    <p className="text-white/60 text-sm">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-white/60 mb-4">
              Still have questions?
            </p>
            <Link href="/contact">
              <Button variant="outline">
                Contact Us
              </Button>
            </Link>
          </motion.div>
        </section>
      </div>
    </div>
  )
}
