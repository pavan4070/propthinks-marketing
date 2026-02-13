'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100).trim(),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number (10 digits, starting with 6-9)'),
  email: z.string().email('Invalid email address').toLowerCase(),
  subject: z.enum(['general', 'property-inquiry', 'owner-inquiry', 'support', 'other'], {
    errorMap: () => ({ message: 'Please select a subject' }),
  }),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
});

type ContactInput = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    setIsSubmitting(true);
    setMessage(null);

    try {
      // For now, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Contact form data:', data);
      setMessage({
        type: 'success',
        text: 'Message sent successfully! We\'ll get back to you within 24 hours.',
      });
      reset();
    } catch {
      setMessage({
        type: 'error',
        text: 'Failed to send message. Please try again or email us directly.',
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
            <Send className="h-5 w-5 text-[#1fb6e0]" />
          </div>
          <h3 className="text-xl font-bold text-white">Send us a Message</h3>
        </div>
        <p className="text-slate-300 text-sm">
          Fill out the form below and we&apos;ll respond within 24 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
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

          <div className="sm:col-span-2">
            <label htmlFor="subject" className="block text-sm font-medium text-[#0f1729] mb-2">
              Subject <span className="text-red-500">*</span>
            </label>
            <Select id="subject" {...register('subject')}>
              <option value="">Select a subject</option>
              <option value="general">General Inquiry</option>
              <option value="property-inquiry">Looking for a Property</option>
              <option value="owner-inquiry">List My Property</option>
              <option value="support">Support / Issue</option>
              <option value="other">Other</option>
            </Select>
            {errors.subject && (
              <p className="text-sm text-red-600 mt-1.5 flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.subject.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-medium text-[#0f1729] mb-2">
              Message <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="message"
              {...register('message')}
              placeholder="How can we help you?"
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
              Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
