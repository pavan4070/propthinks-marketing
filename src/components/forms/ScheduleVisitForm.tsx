'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, AlertCircle, Loader2, Calendar } from 'lucide-react';
import { scheduleVisitSchema, type ScheduleVisitInput } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { scheduleVisit } from '@/lib/api';

interface ScheduleVisitFormProps {
  propertyId: string;
  propertyName: string;
}

export function ScheduleVisitForm({ propertyId, propertyName }: ScheduleVisitFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ScheduleVisitInput>({
    resolver: zodResolver(scheduleVisitSchema),
    defaultValues: {
      property_id: propertyId,
    },
  });

  const onSubmit = async (data: ScheduleVisitInput) => {
    setIsSubmitting(true);
    setMessage(null);

    try {
      await scheduleVisit(data);
      setMessage({
        type: 'success',
        text: 'Visit request submitted! Our team will contact you shortly.',
      });
      reset({ property_id: propertyId });
    } catch {
      setMessage({
        type: 'error',
        text: 'Failed to submit request. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
      <div className="bg-[#0f1729] p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-[#1fb6e0]/20 flex items-center justify-center">
            <Calendar className="h-5 w-5 text-[#1fb6e0]" />
          </div>
          <h3 className="text-xl font-bold text-white">Schedule a Visit</h3>
        </div>
        <p className="text-slate-300 text-sm">
          Interested in <span className="text-white font-medium">{propertyName}</span>? Book a property tour with our team.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
        <input type="hidden" {...register('property_id')} />

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[#0f1729] mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <Input id="name" {...register('name')} placeholder="Enter your full name" />
          {errors.name && (
            <p className="text-sm text-red-600 mt-1.5 flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" />
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-[#0f1729] mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <Input
              id="phone"
              {...register('phone')}
              placeholder="10-digit number"
              type="tel"
            />
            {errors.phone && (
              <p className="text-sm text-red-600 mt-1.5 flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#0f1729] mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <Input id="email" {...register('email')} placeholder="your@email.com" type="email" />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1.5 flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="preferred_date" className="block text-sm font-medium text-[#0f1729] mb-2">
            Preferred Date & Time <span className="text-red-500">*</span>
          </label>
          <Input
            id="preferred_date"
            {...register('preferred_date')}
            type="datetime-local"
            min={new Date().toISOString().slice(0, 16)}
          />
          {errors.preferred_date && (
            <p className="text-sm text-red-600 mt-1.5 flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" />
              {errors.preferred_date.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-[#0f1729] mb-2">
            Message <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <Textarea
            id="message"
            {...register('message')}
            placeholder="Any specific requirements or questions..."
            className="min-h-[80px]"
          />
          {errors.message && (
            <p className="text-sm text-red-600 mt-1.5 flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" />
              {errors.message.message}
            </p>
          )}
        </div>

        {message && (
          <div
            className={`p-4 rounded-xl text-sm flex items-start gap-3 ${
              message.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-100'
                : 'bg-red-50 text-red-800 border border-red-100'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 bg-[#1fb6e0] hover:bg-[#1fb6e0]/90 text-[#0f1729] font-semibold shadow-lg shadow-[#1fb6e0]/25"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Scheduling...
            </>
          ) : (
            'Schedule Visit'
          )}
        </Button>

        <p className="text-xs text-slate-500 text-center">
          By submitting, you agree to our{' '}
          <a href="/terms" className="text-[#1fb6e0] hover:underline">
            Terms
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-[#1fb6e0] hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </form>
    </div>
  );
}
