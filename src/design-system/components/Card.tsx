import React from 'react'
import { motion } from 'framer-motion'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'surface' | 'outline'
  hoverable?: boolean
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  hoverable = false,
  className = '',
  ...props
}) => {
  const variantStyles = {
    default: 'bg-white',
    surface: 'bg-brand-surface',
    outline: 'bg-transparent border-2 border-brand-surface',
  }

  return (
    <motion.div
      whileHover={hoverable ? { y: -4 } : {}}
      className={`
        rounded-2xl p-6 shadow-lg transition-all duration-300
        ${variantStyles[variant]}
        ${hoverable ? 'hover:shadow-xl cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  action?: React.ReactNode
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  action,
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`mb-6 ${className}`} {...props}>
      <div className="flex items-start justify-between">
        <div>
          {title && <h3 className="font-display text-2xl font-semibold text-brand-text">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-brand-textDim">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
      {children}
    </div>
  )
}

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean
}

export const CardBody: React.FC<CardBodyProps> = ({
  children,
  noPadding = false,
  className = '',
  ...props
}) => {
  return (
    <div className={`${noPadding ? '' : 'py-4'} ${className}`} {...props}>
      {children}
    </div>
  )
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'left' | 'center' | 'right'
}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  align = 'left',
  className = '',
  ...props
}) => {
  const alignStyles = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }

  return (
    <div className={`mt-6 pt-6 border-t border-brand-surface ${className}`} {...props}>
      <div className={`flex ${alignStyles[align]} space-x-4`}>
        {children}
      </div>
    </div>
  )
}