import { Metadata } from 'next'
import { Demo } from './Demo'

export const metadata: Metadata = {
  title: 'Demo',
  description: 'Try VideoConvert interactive demo - see how easy it is to convert video aspect ratios and formats.',
}

export default function DemoPage() {
  return <Demo />
}
