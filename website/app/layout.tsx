import type { Metadata } from 'next'
import { Header, Footer } from '@/components/layout'
import { APP_NAME, APP_DESCRIPTION, APP_URL } from '@/lib/constants'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} - Transform Videos for Any Platform`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: [
    'video converter',
    'aspect ratio converter',
    '16:9 to 9:16',
    'YouTube to TikTok',
    'video format converter',
    'free video converter',
    'local video converter',
  ],
  authors: [{ name: 'VideoConvert' }],
  creator: 'VideoConvert',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: APP_URL,
    title: `${APP_NAME} - Transform Videos for Any Platform`,
    description: APP_DESCRIPTION,
    siteName: APP_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${APP_NAME} - Transform Videos for Any Platform`,
    description: APP_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
