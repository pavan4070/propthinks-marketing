'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { ownerInquirySchema, type OwnerInquiryInput } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { submitOwnerInquiry } from '@/lib/api';

export function OwnerInquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OwnerInquiryInput>({
    resolver: zodResolver(ownerInquirySchema),
  });

  const onSubmit = async (data: OwnerInquiryInput) => {
    setIsSubmitting(true);
    setMessage(null);

    try {
      await submitOwnerInquiry(data);
      setMessage({
        type: 'success',
        text: 'Inquiry submitted! Our team will contact you within 24 hours.',
      });
      reset();
    } catch {
      setMessage({
        type: 'error',
        text: 'Failed to submit inquiry. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
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

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-[#0f1729] mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <Input
            id="phone"
            {...register('phone')}
            placeholder="10-digit mobile number"
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
            Email Address <span className="text-red-500">*</span>
          </label>
          <Input id="email" {...register('email')} placeholder="your@email.com" type="email" />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1.5 flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" />
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="property_type" className="block text-sm font-medium text-[#0f1729] mb-2">
            Property Type <span className="text-red-500">*</span>
          </label>
          <Select id="property_type" {...register('property_type')}>
            <option value="">Select property type</option>
            <option value="apartment">Apartment</option>
            <option value="house">Independent House</option>
            <option value="villa">Villa</option>
            <option value="plot">Plot/Land</option>
          </Select>
          {errors.property_type && (
            <p className="text-sm text-red-600 mt-1.5 flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" />
              {errors.property_type.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-[#0f1729] mb-2">
            City <span className="text-red-500">*</span>
          </label>
          <Select id="city" {...register('city')}>
            <option value="">Select city</option>
            <option value="Nellore">Nellore</option>
            <option value="Guntur">Guntur</option>
            <option value="Vijayawada">Vijayawada</option>
            <option value="Tirupati">Tirupati</option>
          </Select>
          {errors.city && (
            <p className="text-sm text-red-600 mt-1.5 flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" />
              {errors.city.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="block text-sm font-medium text-[#0f1729] mb-2">
            Property Details <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="message"
            {...register('message')}
            placeholder="Tell us about your property: BHK, area (sq ft), expected rent, availability date, any special features..."
          />
          {errors.message && (
            <p className="text-sm text-red-600 mt-1.5 flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" />
              {errors.message.message}
            </p>
          )}
        </div>
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
            Submitting...
          </>
        ) : (
          'Submit Inquiry'
        )}
      </Button>

      <p className="text-xs text-slate-500 text-center">
        By submitting, you agree to our{' '}
        <a href="/terms" className="text-[#1fb6e0] hover:underline">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="/privacy" className="text-[#1fb6e0] hover:underline">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
