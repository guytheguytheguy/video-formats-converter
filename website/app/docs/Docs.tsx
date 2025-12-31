'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Book, Terminal, Code, Settings, Download, HelpCircle,
  ChevronRight, Copy, Check, ExternalLink
} from 'lucide-react'
import { Card, CardContent, Badge, Button } from '@/components/ui'

const sections = [
  { id: 'quick-start', name: 'Quick Start', icon: Download },
  { id: 'cli', name: 'CLI Usage', icon: Terminal },
  { id: 'api', name: 'API Reference', icon: Code },
  { id: 'configuration', name: 'Configuration', icon: Settings },
  { id: 'troubleshooting', name: 'Troubleshooting', icon: HelpCircle },
]

const cliCommands = [
  {
    command: 'vconvert input.mp4 -r 9:16 -o output.mp4',
    description: 'Convert video to 9:16 portrait aspect ratio',
  },
  {
    command: 'vconvert input.mp4 -r 1:1 -m fill -o output.mp4',
    description: 'Convert to square with fill (crop) mode',
  },
  {
    command: 'vconvert input.mp4 -f webm -q high -o output.webm',
    description: 'Convert to WebM with high quality',
  },
  {
    command: 'vconvert input.mp4 -r 9:16 --resolution 1080p',
    description: 'Convert with specific resolution',
  },
]

const cliOptions = [
  { flag: '-r, --ratio', value: '<ratio>', description: 'Target aspect ratio (16:9, 9:16, 1:1, 4:5)' },
  { flag: '-m, --mode', value: '<mode>', description: 'Transform mode (fit, fill, stretch)' },
  { flag: '-f, --format', value: '<format>', description: 'Output format (mp4, mov, mkv, avi, webm)' },
  { flag: '-q, --quality', value: '<quality>', description: 'Quality preset (high, medium, low, draft)' },
  { flag: '-o, --output', value: '<path>', description: 'Output file path' },
  { flag: '--resolution', value: '<res>', description: 'Output resolution (4k, 1080p, 720p, 480p)' },
  { flag: '--batch', value: '<dir>', description: 'Batch convert all videos in directory (Pro)' },
  { flag: '-h, --help', value: '', description: 'Show help' },
]

function CodeBlock({ code, language = 'bash' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      <pre className="bg-background rounded-lg p-4 overflow-x-auto">
        <code className="text-sm text-white/80 font-mono">{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied ? (
          <Check className="w-4 h-4 text-secondary-500" />
        ) : (
          <Copy className="w-4 h-4 text-white/60" />
        )}
      </button>
    </div>
  )
}

export function Docs() {
  const [activeSection, setActiveSection] = useState('quick-start')

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="primary" className="mb-4">
              <Book className="w-3 h-3 mr-1" />
              Documentation
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              VideoConvert Docs
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Learn how to use VideoConvert, from basic usage to advanced CLI automation.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-[250px_1fr] gap-8">
          {/* Sidebar */}
          <nav className="hidden lg:block">
            <div className="sticky top-24 space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? 'bg-primary-500/10 text-primary-400'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <section.icon className="w-4 h-4" />
                  {section.name}
                </button>
              ))}
              <div className="pt-4 border-t border-white/10 mt-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-white/40 hover:text-white text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  View on GitHub
                </a>
              </div>
            </div>
          </nav>

          {/* Content */}
          <div className="space-y-12">
            {/* Quick Start */}
            <section id="quick-start">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Download className="w-6 h-6 text-primary-400" />
                Quick Start
              </h2>
              <Card>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">1. Download & Install</h3>
                    <p className="text-white/60 mb-4">
                      Download VideoConvert for your platform from the{' '}
                      <Link href="/download" className="text-primary-400 hover:underline">
                        downloads page
                      </Link>.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">2. Launch the App</h3>
                    <p className="text-white/60 mb-4">
                      Open VideoConvert. The web dashboard will automatically open in your browser at{' '}
                      <code className="text-primary-400 bg-primary-500/10 px-2 py-0.5 rounded">
                        http://localhost:3000
                      </code>
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">3. Convert Your First Video</h3>
                    <ol className="text-white/60 space-y-2 list-decimal list-inside">
                      <li>Drag and drop your video file or click to browse</li>
                      <li>Select your target aspect ratio (16:9, 9:16, 1:1, 4:5)</li>
                      <li>Choose transform mode (Fit, Fill, or Stretch)</li>
                      <li>Click "Convert" and wait for processing</li>
                      <li>Download your converted video</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* CLI Usage */}
            <section id="cli">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Terminal className="w-6 h-6 text-primary-400" />
                CLI Usage
              </h2>

              <Card className="mb-6">
                <CardContent>
                  <h3 className="text-lg font-semibold text-white mb-4">Basic Syntax</h3>
                  <CodeBlock code="vconvert <input> [options] -o <output>" />
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardContent>
                  <h3 className="text-lg font-semibold text-white mb-4">Examples</h3>
                  <div className="space-y-4">
                    {cliCommands.map((cmd, index) => (
                      <div key={index}>
                        <CodeBlock code={cmd.command} />
                        <p className="text-white/40 text-sm mt-2">{cmd.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <h3 className="text-lg font-semibold text-white mb-4">Options Reference</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-3 px-2 text-white font-medium">Flag</th>
                          <th className="text-left py-3 px-2 text-white font-medium">Value</th>
                          <th className="text-left py-3 px-2 text-white font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cliOptions.map((opt) => (
                          <tr key={opt.flag} className="border-b border-white/5">
                            <td className="py-3 px-2">
                              <code className="text-primary-400 text-sm">{opt.flag}</code>
                            </td>
                            <td className="py-3 px-2 text-white/60 text-sm">{opt.value}</td>
                            <td className="py-3 px-2 text-white/60 text-sm">{opt.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* API Reference */}
            <section id="api">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Code className="w-6 h-6 text-primary-400" />
                API Reference
              </h2>

              <Card className="mb-6">
                <CardContent>
                  <h3 className="text-lg font-semibold text-white mb-4">Node.js Module</h3>
                  <p className="text-white/60 mb-4">
                    VideoConvert can be used as a Node.js module for programmatic access.
                  </p>
                  <CodeBlock
                    code={`const { convert } = require('videoconvert');

// Basic conversion
await convert({
  input: 'input.mp4',
  output: 'output.mp4',
  ratio: '9:16',
  mode: 'fit',
  format: 'mp4',
  quality: 'high'
});

// With progress callback
await convert({
  input: 'input.mp4',
  output: 'output.mp4',
  ratio: '1:1',
  onProgress: (percent) => {
    console.log(\`Progress: \${percent}%\`);
  }
});`}
                    language="javascript"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <h3 className="text-lg font-semibold text-white mb-4">REST API (Web Dashboard)</h3>
                  <p className="text-white/60 mb-4">
                    The web dashboard exposes a REST API at <code className="text-primary-400">localhost:3000/api</code>.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <Badge variant="secondary" className="mb-2">POST</Badge>
                      <code className="text-white ml-2">/api/convert</code>
                      <p className="text-white/40 text-sm mt-1">Start a new conversion job</p>
                    </div>
                    <div>
                      <Badge variant="primary" className="mb-2">GET</Badge>
                      <code className="text-white ml-2">/api/status/:jobId</code>
                      <p className="text-white/40 text-sm mt-1">Get job status and progress</p>
                    </div>
                    <div>
                      <Badge variant="primary" className="mb-2">GET</Badge>
                      <code className="text-white ml-2">/api/download/:jobId</code>
                      <p className="text-white/40 text-sm mt-1">Download converted file</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Configuration */}
            <section id="configuration">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Settings className="w-6 h-6 text-primary-400" />
                Configuration
              </h2>

              <Card>
                <CardContent>
                  <h3 className="text-lg font-semibold text-white mb-4">License Activation</h3>
                  <p className="text-white/60 mb-4">
                    To activate your Pro license:
                  </p>
                  <ol className="text-white/60 space-y-2 list-decimal list-inside mb-4">
                    <li>Open VideoConvert settings</li>
                    <li>Navigate to "License" tab</li>
                    <li>Enter your license key (format: VC-XXXX-XXXX-XXXX)</li>
                    <li>Click "Activate"</li>
                  </ol>
                  <p className="text-white/40 text-sm">
                    Your license key was sent to your email after purchase.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Troubleshooting */}
            <section id="troubleshooting">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-primary-400" />
                Troubleshooting
              </h2>

              <div className="space-y-4">
                <Card>
                  <CardContent>
                    <h3 className="font-semibold text-white mb-2">Video conversion fails</h3>
                    <p className="text-white/60 text-sm">
                      Ensure your input file is a valid video format. Try re-encoding with a different tool if the file is corrupted.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <h3 className="font-semibold text-white mb-2">App won't start</h3>
                    <p className="text-white/60 text-sm">
                      Check if port 3000 is already in use. You can change the port in settings or kill the process using that port.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <h3 className="font-semibold text-white mb-2">Output quality is poor</h3>
                    <p className="text-white/60 text-sm">
                      Try using the "high" quality preset. Note that upscaling low-resolution videos will not improve quality.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <h3 className="font-semibold text-white mb-2">Need more help?</h3>
                    <p className="text-white/60 text-sm mb-4">
                      Check our GitHub issues or contact support.
                    </p>
                    <div className="flex gap-4">
                      <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          GitHub Issues
                        </Button>
                      </a>
                      <Link href="/contact">
                        <Button variant="outline" size="sm">
                          Contact Support
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
