import { Metadata } from 'next'
import { Terms } from './Terms'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'VideoConvert terms of service - license agreement and usage terms.',
}

export default function TermsPage() {
  return <Terms />
}
