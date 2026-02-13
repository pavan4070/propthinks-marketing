import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-[#0f1729] shadow-sm transition-all duration-200',
          'placeholder:text-slate-400',
          'hover:border-slate-300',
          'focus:outline-none focus:ring-2 focus:ring-[#1fb6e0]/20 focus:border-[#1fb6e0]',
          'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-60',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-700',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
