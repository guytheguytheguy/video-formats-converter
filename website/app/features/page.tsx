import { Metadata } from 'next'
import { Features } from './Features'

export const metadata: Metadata = {
  title: 'Features',
  description: 'Explore all features of VideoConvert - aspect ratio conversion, format support, transform modes, and more.',
}

export default function FeaturesPage() {
  return <Features />
}
