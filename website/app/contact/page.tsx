import { Metadata } from 'next'
import { Contact } from './Contact'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the VideoConvert team for support, feedback, or business inquiries.',
}

export default function ContactPage() {
  return <Contact />
}
