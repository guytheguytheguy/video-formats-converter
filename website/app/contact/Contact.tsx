'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MessageCircle, Github, Send, Check } from 'lucide-react'
import { Card, CardContent, Badge, Button, Input } from '@/components/ui'

const contactMethods = [
  {
    icon: Mail,
    title: 'General Inquiries',
    description: 'For general questions and partnerships',
    value: 'contact@videoconvert.video',
    href: 'mailto:contact@videoconvert.video',
  },
  {
    icon: Mail,
    title: 'Support',
    description: 'Technical support and help',
    value: 'support@videoconvert.video',
    href: 'mailto:support@videoconvert.video',
  },
  {
    icon: Github,
    title: 'GitHub Issues',
    description: 'Report bugs and request features',
    value: 'github.com/guytheguytheguy/video-formats-converter',
    href: 'https://github.com/guytheguytheguy/video-formats-converter/issues',
  },
]

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setLoading(false)
    setSubmitted(true)
  }

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
            <Badge variant="primary" className="mb-4">Contact</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Have a question, feedback, or need help? We're here to assist you.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Contact Methods</h2>
            <div className="space-y-4">
              {contactMethods.map((method) => (
                <a
                  key={method.title}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Card className="hover:border-white/20 transition-colors">
                    <CardContent className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                        <method.icon className="w-6 h-6 text-primary-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{method.title}</h3>
                        <p className="text-white/40 text-sm">{method.description}</p>
                      </div>
                      <div className="text-primary-400 text-sm">{method.value}</div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>

            <div className="mt-8 p-6 bg-surface rounded-xl border border-white/5">
              <h3 className="font-semibold text-white mb-2">Response Time</h3>
              <p className="text-white/60 text-sm">
                We typically respond within 24-48 hours. For urgent issues, please use GitHub Issues
                for faster response from the community.
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>

            {submitted ? (
              <Card variant="gradient" className="text-center">
                <CardContent className="py-12">
                  <div className="w-16 h-16 rounded-full bg-secondary-500/20 flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-secondary-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                  <p className="text-white/60">
                    Thank you for reaching out. We'll get back to you soon.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="What's this about?"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="Tell us more..."
                        required
                        className="w-full rounded-lg bg-surface border border-white/10 px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full"
                      disabled={loading}
                    >
                      {loading ? (
                        'Sending...'
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
