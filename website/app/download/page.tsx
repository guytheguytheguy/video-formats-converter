import { Metadata } from 'next'
import { Download } from './Download'

export const metadata: Metadata = {
  title: 'Download',
  description: 'Download VideoConvert for Windows, macOS, and Linux. Free and easy video conversion.',
}

export default function DownloadPage() {
  return <Download />
}
