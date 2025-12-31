export const APP_NAME = 'VideoConvert'
export const APP_TAGLINE = 'Transform Videos for Any Platform'
export const APP_DESCRIPTION = 'Convert video aspect ratios and formats instantly. 100% local processing - your videos never leave your device.'
export const APP_VERSION = '1.0.0'
export const APP_URL = 'https://videoconvert.app'

export const PRICING = {
  free: {
    name: 'Free',
    price: 0,
    features: [
      'MP4 output format',
      '720p maximum resolution',
      'Single file conversion',
      'CLI & Web dashboard',
      'All aspect ratios',
      'Watermark on output',
    ],
    limitations: [
      'Watermark on videos',
      'MP4 only',
      '720p max',
      'No batch conversion',
    ],
  },
  pro: {
    name: 'Pro',
    price: 29,
    originalPrice: 49,
    features: [
      'All formats: MP4, MOV, MKV, AVI, WebM',
      'Up to 4K resolution (3840x2160)',
      'No watermark',
      'Batch conversion',
      'Custom presets',
      'Lifetime updates',
      'Priority support',
    ],
  },
}

export const ASPECT_RATIOS = [
  { ratio: '16:9', name: 'Landscape', platforms: ['YouTube', 'TV', 'Desktop'], icon: 'Monitor' },
  { ratio: '9:16', name: 'Portrait', platforms: ['TikTok', 'Reels', 'Shorts'], icon: 'Smartphone' },
  { ratio: '1:1', name: 'Square', platforms: ['Instagram', 'Facebook'], icon: 'Square' },
  { ratio: '4:5', name: 'Portrait+', platforms: ['Instagram Feed'], icon: 'RectangleVertical' },
]

export const FORMATS = [
  { name: 'MP4', description: 'Universal format, best compatibility', free: true },
  { name: 'MOV', description: 'Apple QuickTime, high quality', free: false },
  { name: 'MKV', description: 'Open source, multi-track support', free: false },
  { name: 'AVI', description: 'Microsoft format, large files', free: false },
  { name: 'WebM', description: 'Web video, royalty-free', free: false },
]

export const TRANSFORM_MODES = [
  { name: 'Fit', description: 'Preserves entire video, adds letterbox bars', icon: 'Maximize2' },
  { name: 'Fill', description: 'Crops to fill frame completely', icon: 'Crop' },
  { name: 'Stretch', description: 'Stretches to fit (may distort)', icon: 'Move' },
]

export const PLATFORMS = [
  {
    name: 'Windows',
    icon: 'Windows',
    requirements: 'Windows 10+',
    formats: ['Installer (.exe)', 'Portable (.exe)'],
    downloadUrl: '#',
  },
  {
    name: 'macOS',
    icon: 'Apple',
    requirements: 'macOS 10.15+',
    formats: ['.dmg', '.zip'],
    downloadUrl: '#',
  },
  {
    name: 'Linux',
    icon: 'Linux',
    requirements: 'Ubuntu 20.04+',
    formats: ['.AppImage', '.deb'],
    downloadUrl: '#',
  },
]

export const NAV_LINKS = [
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Download', href: '/download' },
  { name: 'Demo', href: '/demo' },
  { name: 'Docs', href: '/docs' },
  { name: 'Blog', href: '/blog' },
]

export const FOOTER_LINKS = {
  product: [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Download', href: '/download' },
    { name: 'Demo', href: '/demo' },
  ],
  resources: [
    { name: 'Documentation', href: '/docs' },
    { name: 'Blog', href: '/blog' },
    { name: 'Changelog', href: '/changelog' },
    { name: 'GitHub', href: 'https://github.com' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
  ],
}

export const SOCIAL_LINKS = [
  { name: 'Twitter', href: 'https://twitter.com', icon: 'Twitter' },
  { name: 'GitHub', href: 'https://github.com', icon: 'Github' },
  { name: 'Discord', href: 'https://discord.com', icon: 'MessageCircle' },
]
