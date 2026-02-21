'use client'

import { forwardRef, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-dark-700 mb-1.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-3.5 py-2.5 rounded-xl border bg-white
            text-sm text-dark-800 placeholder:text-dark-300
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-primary-400/20 focus:border-primary-400
            disabled:bg-dark-50 disabled:cursor-not-allowed
            ${error ? 'border-red-500' : 'border-dark-200 hover:border-dark-300'}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-red-500">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-dark-400">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
