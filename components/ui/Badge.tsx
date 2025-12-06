import React from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'university' | 'condition' | 'status' | 'verified'
  children: React.ReactNode
}

export function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  const variantStyles = {
    default: 'bg-slate-100 text-slate-800',
    university: 'bg-blue-100 text-blue-800 font-semibold',
    condition: 'bg-green-100 text-green-800 font-medium',
    status: 'bg-yellow-100 text-yellow-800',
    verified: 'bg-indigo-100 text-indigo-800 font-medium',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

