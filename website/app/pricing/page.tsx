import { Metadata } from 'next'
import { Pricing } from './Pricing'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'VideoConvert pricing - Free version with watermark, Pro license for $29 one-time payment.',
}

export default function PricingPage() {
  return <Pricing />
}
