import { Metadata } from 'next'
import { About } from './About'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about VideoConvert - our mission, values, and the team behind the app.',
}

export default function AboutPage() {
  return <About />
}
