import { forwardRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

interface AccessibleFormFieldProps {
  id: string
  label: string
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'textarea'
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  error?: string
  required?: boolean
  disabled?: boolean
  className?: string
  helpText?: string
  'aria-describedby'?: string
}

export const AccessibleFormField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  AccessibleFormFieldProps
>(({ 
  id, 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  error, 
  required, 
  disabled, 
  className,
  helpText,
  ...props 
}, ref) => {
  const errorId = error ? `${id}-error` : undefined
  const helpId = helpText ? `${id}-help` : undefined
  const describedBy = [errorId, helpId, props['aria-describedby']]
    .filter(Boolean)
    .join(' ') || undefined

  const inputProps = {
    id,
    placeholder,
    value,
    onChange: onChange ? (e: any) => onChange(e.target.value) : undefined,
    required,
    disabled,
    'aria-invalid': !!error,
    'aria-describedby': describedBy,
    className: cn(
      error && "border-destructive focus:ring-destructive",
      className
    )
  }

  return (
    <div className="space-y-2">
      <Label 
        htmlFor={id}
        className={cn(
          "flex items-center gap-1",
          required && "after:content-['*'] after:text-destructive"
        )}
      >
        {label}
      </Label>
      
      {type === 'textarea' ? (
        <Textarea
          {...inputProps}
          ref={ref as any}
        />
      ) : (
        <Input
          {...inputProps}
          type={type}
          ref={ref as any}
        />
      )}
      
      {helpText && (
        <p id={helpId} className="text-sm text-muted-foreground">
          {helpText}
        </p>
      )}
      
      {error && (
        <Alert variant="destructive" className="mt-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription id={errorId}>
            {error}
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
})

AccessibleFormField.displayName = 'AccessibleFormField'

interface AccessibleFormProps {
  children: ReactNode
  onSubmit?: (e: React.FormEvent) => void
  className?: string
  'aria-label'?: string
  'aria-labelledby'?: string
}

export function AccessibleForm({ 
  children, 
  onSubmit, 
  className,
  ...props 
}: AccessibleFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className={cn("space-y-4", className)}
      noValidate // We handle validation manually for better UX
      {...props}
    >
      {children}
    </form>
  )
}

interface FormSectionProps {
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export function FormSection({ title, description, children, className }: FormSectionProps) {
  const titleId = `section-${title.toLowerCase().replace(/\s+/g, '-')}`
  
  return (
    <fieldset className={cn("space-y-4", className)}>
      <legend className="sr-only">{title}</legend>
      <div>
        <h3 id={titleId} className="text-lg font-medium">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">
            {description}
          </p>
        )}
      </div>
      <div role="group" aria-labelledby={titleId} className="space-y-4">
        {children}
      </div>
    </fieldset>
  )
}