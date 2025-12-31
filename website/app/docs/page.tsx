import { Metadata } from 'next'
import { Docs } from './Docs'

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'VideoConvert documentation - learn how to use the app, CLI, and API.',
}

export default function DocsPage() {
  return <Docs />
}
