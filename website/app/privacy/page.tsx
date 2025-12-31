import { Metadata } from 'next'
import { Privacy } from './Privacy'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'VideoConvert privacy policy - learn how we protect your data and privacy.',
}

export default function PrivacyPage() {
  return <Privacy />
}
