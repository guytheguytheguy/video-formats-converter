'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { Card, CardContent, Badge } from '@/components/ui'
import { getAllPosts } from '@/lib/blog'

const categoryColors = {
  tutorial: 'primary',
  tips: 'secondary',
  updates: 'default',
} as const

export function Blog() {
  const posts = getAllPosts()

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
            <Badge variant="primary" className="mb-4">Blog</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Tutorials, Tips & Updates
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Learn how to get the most out of VideoConvert with our guides and tutorials.
            </p>
          </motion.div>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <Card className="h-full hover:border-white/20 transition-all group">
                  <CardContent className="flex flex-col h-full">
                    {/* Category */}
                    <Badge
                      variant={categoryColors[post.category]}
                      className="self-start mb-4 capitalize"
                    >
                      {post.category}
                    </Badge>

                    {/* Title */}
                    <h2 className="text-xl font-semibold text-white mb-3 group-hover:text-primary-400 transition-colors">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-white/60 text-sm mb-4 flex-1">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-white/40 text-sm">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
