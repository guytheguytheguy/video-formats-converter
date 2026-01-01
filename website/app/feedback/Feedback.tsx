'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { MessageSquare, Send, Check, Star, Bug, Lightbulb, ThumbsUp, ArrowLeft } from 'lucide-react'
import { Card, CardContent, Badge, Button, Input } from '@/components/ui'

const feedbackTypes = [
  { id: 'bug', label: 'Bug Report', icon: Bug, color: 'text-red-400', bg: 'bg-red-500/10' },
  { id: 'feature', label: 'Feature Request', icon: Lightbulb, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  { id: 'improvement', label: 'Improvement', icon: ThumbsUp, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { id: 'other', label: 'Other', icon: MessageSquare, color: 'text-purple-400', bg: 'bg-purple-500/10' },
]

const ratingLabels = ['Terrible', 'Poor', 'Okay', 'Good', 'Excellent']

export function Feedback() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [feedbackType, setFeedbackType] = useState<string>('')
  const [rating, setRating] = useState<number>(0)
  const [hoveredRating, setHoveredRating] = useState<number>(0)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      type: feedbackType,
      rating,
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
      version: formData.get('version'),
      platform: formData.get('platform'),
    }

    // In production, send to your backend or email service
    console.log('Feedback submitted:', data)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>

        {/* Hero */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="primary" className="mb-4">
              <MessageSquare className="w-3 h-3 mr-1" />
              Feedback
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              We'd Love Your Feedback
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Help us make VideoConvert better. Report bugs, request features, or just let us know what you think.
            </p>
          </motion.div>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card variant="gradient" className="text-center">
              <CardContent className="py-16">
                <div className="w-20 h-20 rounded-full bg-secondary-500/20 flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-secondary-500" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">Thank You!</h2>
                <p className="text-white/60 mb-6 max-w-md mx-auto">
                  Your feedback has been received. We read every submission and use it to improve VideoConvert.
                </p>
                <div className="flex items-center justify-center gap-4">
                  <Link href="/">
                    <Button variant="outline">Back to Home</Button>
                  </Link>
                  <Button variant="primary" onClick={() => setSubmitted(false)}>
                    Submit More Feedback
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Feedback Type */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-3">
                      What type of feedback do you have?
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {feedbackTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setFeedbackType(type.id)}
                          className={`p-4 rounded-lg border text-center transition-all ${
                            feedbackType === type.id
                              ? 'border-primary-500 bg-primary-500/10'
                              : 'border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-lg ${type.bg} flex items-center justify-center mx-auto mb-2`}>
                            <type.icon className={`w-5 h-5 ${type.color}`} />
                          </div>
                          <span className={`text-sm ${feedbackType === type.id ? 'text-white' : 'text-white/60'}`}>
                            {type.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-3">
                      How would you rate VideoConvert overall?
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="p-1 transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-8 h-8 transition-colors ${
                              star <= (hoveredRating || rating)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-white/20'
                            }`}
                          />
                        </button>
                      ))}
                      {(hoveredRating || rating) > 0 && (
                        <span className="ml-3 text-white/60 text-sm">
                          {ratingLabels[(hoveredRating || rating) - 1]}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      Email <span className="text-white/40">(optional, for follow-up)</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                      Subject <span className="text-red-400">*</span>
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Brief summary of your feedback"
                      required
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                      Details <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      placeholder="Please provide as much detail as possible..."
                      required
                      className="w-full rounded-lg bg-surface border border-white/10 px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* App Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="version" className="block text-sm font-medium text-white mb-2">
                        App Version <span className="text-white/40">(if applicable)</span>
                      </label>
                      <Input
                        id="version"
                        name="version"
                        placeholder="e.g., 1.0.0"
                      />
                    </div>
                    <div>
                      <label htmlFor="platform" className="block text-sm font-medium text-white mb-2">
                        Platform
                      </label>
                      <select
                        id="platform"
                        name="platform"
                        className="w-full rounded-lg bg-surface border border-white/10 px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Select platform</option>
                        <option value="windows">Windows</option>
                        <option value="macos">macOS</option>
                        <option value="linux">Linux</option>
                        <option value="web">Web Dashboard</option>
                        <option value="cli">CLI</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full"
                      size="lg"
                      disabled={loading || !feedbackType}
                    >
                      {loading ? (
                        'Submitting...'
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Submit Feedback
                        </>
                      )}
                    </Button>
                    <p className="text-white/40 text-xs text-center mt-3">
                      By submitting, you agree to let us use this feedback to improve VideoConvert.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Alternative Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-white/40 text-sm">
            Prefer email?{' '}
            <a href="mailto:support@videoconvert.video" className="text-primary-400 hover:underline">
              support@videoconvert.video
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
