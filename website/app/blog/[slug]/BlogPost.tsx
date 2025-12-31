'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, Download } from 'lucide-react'
import { Badge, Button } from '@/components/ui'
import type { BlogPost as BlogPostType } from '@/lib/blog'

interface Props {
  post: BlogPostType
}

const categoryColors = {
  tutorial: 'primary',
  tips: 'secondary',
  updates: 'default',
} as const

export function BlogPost({ post }: Props) {
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
            href="/blog"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Badge
            variant={categoryColors[post.category]}
            className="mb-4 capitalize"
          >
            {post.category}
          </Badge>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-white/60">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-xs font-medium">
                {post.author.avatar}
              </div>
              <span>{post.author.name}</span>
            </div>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
        </motion.header>

        {/* Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          <div
            className="
              [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-white [&>h1]:mt-12 [&>h1]:mb-6
              [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:mt-10 [&>h2]:mb-4
              [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-white [&>h3]:mt-8 [&>h3]:mb-3
              [&>p]:text-white/70 [&>p]:leading-relaxed [&>p]:mb-4
              [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4 [&>ul>li]:text-white/70 [&>ul>li]:mb-2
              [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-4 [&>ol>li]:text-white/70 [&>ol>li]:mb-2
              [&>blockquote]:border-l-4 [&>blockquote]:border-primary-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-white/60
              [&>code]:bg-primary-500/10 [&>code]:text-primary-400 [&>code]:px-2 [&>code]:py-0.5 [&>code]:rounded
              [&>pre]:bg-surface [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto
              [&>hr]:border-white/10 [&>hr]:my-8
              [&>strong]:text-white [&>strong]:font-semibold
            "
            dangerouslySetInnerHTML={{
              __html: post.content
                .replace(/^# (.+)$/gm, '<h1>$1</h1>')
                .replace(/^## (.+)$/gm, '<h2>$1</h2>')
                .replace(/^### (.+)$/gm, '<h3>$1</h3>')
                .replace(/^\- (.+)$/gm, '<li>$1</li>')
                .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
                .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                .replace(/\n\n/g, '</p><p>')
                .replace(/<\/li>\n<li>/g, '</li><li>')
                .split('\n').map(line => {
                  if (line.startsWith('<li>') && !line.includes('</li>')) {
                    return line + '</li>'
                  }
                  return line
                }).join('\n')
            }}
          />
        </motion.article>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-2xl p-8 border border-white/5 text-center"
        >
          <h3 className="text-xl font-bold text-white mb-3">
            Ready to Try VideoConvert?
          </h3>
          <p className="text-white/60 mb-6">
            Download for free and start converting your videos today.
          </p>
          <Link href="/download">
            <Button variant="primary">
              <Download className="w-5 h-5 mr-2" />
              Download Free
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
