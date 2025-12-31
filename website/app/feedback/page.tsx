import { Metadata } from 'next'
import { Feedback } from './Feedback'

export const metadata: Metadata = {
  title: 'Feedback',
  description: 'Share your feedback about VideoConvert - help us improve the app.',
}

export default function FeedbackPage() {
  return <Feedback />
}
