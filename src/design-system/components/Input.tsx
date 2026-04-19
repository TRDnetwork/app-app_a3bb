import React from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  id,
  className = '',
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
  
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-brand-text">
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-brand-textDim">{leftIcon}</span>
          </div>
        )}
        
        <input
          id={inputId}
          className={`
            w-full px-4 py-3 rounded-lg border transition-colors duration-200
            ${leftIcon ? 'pl-10' : ''}
            ${rightIcon ? 'pr-10' : ''}
            ${error 
              ? 'border-error-500 focus:border-error-500 focus:ring-error-500' 
              : 'border-brand-surface focus:border-brand-accent focus:ring-brand-accent'
            }
            bg-white focus:outline-none focus:ring-2 focus:ring-opacity-20
            disabled:bg-neutral-100 disabled:cursor-not-allowed
            ${className}
          `}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-brand-textDim">{rightIcon}</span>
          </div>
        )}
      </div>
      
      {error && (
        <p id={`${inputId}-error`} className="text-sm text-error-600">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p id={`${inputId}-helper`} className="text-sm text-brand-textDim">
          {helperText}
        </p>
      )}
    </div>
  )
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  id,
  className = '',
  ...props
}) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`
  
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium text-brand-text">
          {label}
        </label>
      )}
      
      <textarea
        id={textareaId}
        className={`
          w-full px-4 py-3 rounded-lg border transition-colors duration-200
          ${error 
            ? 'border-error-500 focus:border-error-500 focus:ring-error-500' 
            : 'border-brand-surface focus:border-brand-accent focus:ring-brand-accent'
          }
          bg-white focus:outline-none focus:ring-2 focus:ring-opacity-20
          disabled:bg-neutral-100 disabled:cursor-not-allowed
          resize-y min-h-[100px]
          ${className}
        `}
        aria-invalid={!!error}
        aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
        {...props}
      />
      
      {error && (
        <p id={`${textareaId}-error`} className="text-sm text-error-600">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p id={`${textareaId}-helper`} className="text-sm text-brand-textDim">
          {helperText}
        </p>
      )}
    </div>
  )
}