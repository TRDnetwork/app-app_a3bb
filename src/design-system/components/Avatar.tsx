import React from 'react'

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl'

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  size?: AvatarSize
  fallback?: string
  status?: 'online' | 'offline' | 'away' | 'busy'
}

const sizeStyles: Record<AvatarSize, string> = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-12 h-12 text-base',
  lg: 'w-16 h-16 text-lg',
  xl: 'w-24 h-24 text-xl',
}

const statusStyles: Record<string, string> = {
  online: 'bg-success-500',
  offline: 'bg-neutral-400',
  away: 'bg-warning-500',
  busy: 'bg-error-500',
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'md',
  fallback,
  status,
  className = '',
  ...props
}) => {
  const initials = fallback
    ?.split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className={`relative inline-block ${className}`} {...props}>
      <div
        className={`
          rounded-full overflow-hidden flex items-center justify-center
          bg-brand-surface text-brand-text font-medium
          ${sizeStyles[size]}
        `}
      >
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <span>{initials || '?'}</span>
        )}
      </div>
      
      {status && (
        <span
          className={`
            absolute bottom-0 right-0 block rounded-full border-2 border-white
            ${statusStyles[status]}
            ${size === 'sm' ? 'w-2 h-2' : 'w-3 h-3'}
          `}
        />
      )}
    </div>
  )
}