import { cn } from '@/lib/utils'
import { HTMLAttributes, forwardRef } from 'react'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline'
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
          {
            'bg-white/10 text-white/80': variant === 'default',
            'bg-primary-500/20 text-primary-400': variant === 'primary',
            'bg-secondary-500/20 text-secondary-400': variant === 'secondary',
            'border border-white/20 text-white/80': variant === 'outline',
          },
          className
        )}
        {...props}
      />
    )
  }
)

Badge.displayName = 'Badge'

export { Badge }
