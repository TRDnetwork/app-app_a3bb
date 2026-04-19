import React from 'react'

export type BadgeVariant = 'default' | 'primary' | 'success' | 'error' | 'warning' | 'info'
export type BadgeSize = 'sm' | 'md' | 'lg'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
  dot?: boolean
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-neutral-100 text-neutral-800',
  primary: 'bg-brand-accent text-white',
  success: 'bg-success-100 text-success-800',
  error: 'bg-error-100 text-error-800',
  warning: 'bg-warning-100 text-warning-800',
  info: 'bg-info-100 text-info-800',
}

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className = '',
  ...props
}) => {
  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      {dot && (
        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current opacity-75" />
      )}
      {children}
    </span>
  )
}