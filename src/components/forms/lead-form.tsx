'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'

const leadSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  message: z.string().optional(),
  movingTimeline: z.string().optional(),
  budgetRange: z.string().optional(),
  interests: z.array(z.string()).optional(),
  preferredAreas: z.array(z.string()).optional(),
  agreeToContact: z.boolean().refine(val => val === true, 'You must agree to be contacted'),
})

type LeadFormData = z.infer<typeof leadSchema>

interface LeadFormProps {
  sourceType: 'contact_form' | 'consultation' | 'mortgage_quote' | 'relocation_request' | 'community_info' | 'school_info'
  sourcePage: string
  showTimeline?: boolean
  showBudget?: boolean
  showInterests?: boolean
  showMessage?: boolean
  submitText?: string
  onSuccess?: () => void
}

const timelineOptions = [
  { value: 'immediately', label: 'Immediately' },
  { value: '1-3-months', label: '1-3 months' },
  { value: '3-6-months', label: '3-6 months' },
  { value: '6-12-months', label: '6-12 months' },
  { value: '12-plus-months', label: '12+ months' },
  { value: 'just-researching', label: 'Just researching' },
]

const budgetOptions = [
  { value: 'under-300k', label: 'Under $300,000' },
  { value: '300k-500k', label: '$300,000 - $500,000' },
  { value: '500k-750k', label: '$500,000 - $750,000' },
  { value: '750k-1m', label: '$750,000 - $1,000,000' },
  { value: '1m-2m', label: '$1,000,000 - $2,000,000' },
  { value: '2m-plus', label: '$2,000,000+' },
]

const interestOptions = [
  'Retirement Living',
  'Family-Friendly',
  'Golf Communities',
  'Waterfront',
  'Urban Living',
  'Suburban',
  'New Construction',
  'Luxury Homes',
]

export function LeadForm({
  sourceType,
  sourcePage,
  showTimeline = true,
  showBudget = true,
  showInterests = false,
  showMessage = true,
  submitText = 'Submit',
  onSuccess,
}: LeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      agreeToContact: false,
      interests: [],
    },
  })

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          sourceType,
          sourcePage,
          interests: selectedInterests,
        }),
      })

      if (!response.ok) throw new Error('Failed to submit')

      toast.success('Thank you! We will be in touch soon.')
      reset()
      setSelectedInterests([])
      onSuccess?.()
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            placeholder="John"
            {...register('firstName')}
            className={errors.firstName ? 'border-red-500' : ''}
          />
          {errors.firstName && (
            <p className="text-xs text-red-500">{errors.firstName.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            placeholder="Smith"
            {...register('lastName')}
            className={errors.lastName ? 'border-red-500' : ''}
          />
          {errors.lastName && (
            <p className="text-xs text-red-500">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            {...register('email')}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(555) 123-4567"
            {...register('phone')}
          />
        </div>
      </div>

      {showTimeline && (
        <div className="space-y-2">
          <Label>When are you looking to move?</Label>
          <Select onValueChange={(value) => setValue('movingTimeline', value as string)}>
            <SelectTrigger>
              <SelectValue placeholder="Select timeline" />
            </SelectTrigger>
            <SelectContent>
              {timelineOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {showBudget && (
        <div className="space-y-2">
          <Label>What is your budget?</Label>
          <Select onValueChange={(value) => setValue('budgetRange', value as string)}>
            <SelectTrigger>
              <SelectValue placeholder="Select budget range" />
            </SelectTrigger>
            <SelectContent>
              {budgetOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {showInterests && (
        <div className="space-y-2">
          <Label>What are you interested in? (Select all that apply)</Label>
          <div className="grid grid-cols-2 gap-2">
            {interestOptions.map((interest) => (
              <label
                key={interest}
                className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedInterests.includes(interest)
                    ? 'border-primary bg-primary/5'
                    : 'hover:border-primary/50'
                }`}
              >
                <Checkbox
                  checked={selectedInterests.includes(interest)}
                  onCheckedChange={() => toggleInterest(interest)}
                />
                <span className="text-sm">{interest}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {showMessage && (
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Tell us about your relocation plans..."
            rows={4}
            {...register('message')}
          />
        </div>
      )}

      <div className="flex items-start gap-2">
        <Checkbox
          id="agreeToContact"
          onCheckedChange={(checked) => setValue('agreeToContact', checked as boolean)}
        />
        <Label htmlFor="agreeToContact" className="text-sm text-muted-foreground leading-normal">
          I agree to be contacted by FloridaRelocationUSA.com and connected with local real estate professionals. *
        </Label>
      </div>
      {errors.agreeToContact && (
        <p className="text-xs text-red-500">{errors.agreeToContact.message}</p>
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          submitText
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        By submitting, you agree to our{' '}
        <a href="/privacy" className="underline hover:text-primary">Privacy Policy</a>
        {' '}and{' '}
        <a href="/terms" className="underline hover:text-primary">Terms of Service</a>.
      </p>
    </form>
  )
}
