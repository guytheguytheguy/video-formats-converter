import { Metadata } from 'next'
import { Blog } from './Blog'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'VideoConvert blog - tutorials, tips, and updates about video conversion.',
}

export default function BlogPage() {
  return <Blog />
}
