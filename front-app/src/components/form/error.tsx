
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FormErrorProps {
  children: ReactNode;
  className?: string;
}

export const FormError = ({children, className}:FormErrorProps) => {
  return(
    <p className={cn("text-sm font-medium text-destructive", className)}>
      {children}
    </p>
  )
}