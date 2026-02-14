import { z } from 'zod';

// Schedule visit form validation
export const scheduleVisitSchema = z.object({
  property_id: z.string().uuid('Invalid property ID'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100).trim(),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number (10 digits, starting with 6-9)'),
  email: z.string().email('Invalid email address').toLowerCase(),
  preferred_date: z.string().datetime('Invalid date format'),
  message: z.string().max(500, 'Message too long').optional(),
});

export type ScheduleVisitInput = z.infer<typeof scheduleVisitSchema>;

// Owner inquiry form validation
export const ownerInquirySchema = z.object({
  name: z.string().min(2).max(200).trim(),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number'),
  email: z.string().email().toLowerCase(),
  property_type: z.enum(['apartment', 'house', 'villa', 'commercial', 'land', 'pg', 'other'], {
    errorMap: () => ({ message: 'Please select a property type' }),
  }),
  city: z.string().min(2).max(100).optional(),
  message: z.string().max(2000).optional(),
});

export type OwnerInquiryInput = z.infer<typeof ownerInquirySchema>;

// Property search filters validation
export const propertySearchSchema = z.object({
  city: z.string().optional(),
  bhk: z.number().int().min(1).max(5).optional(),
  min_rent: z.number().int().min(0).optional(),
  max_rent: z.number().int().min(0).optional(),
  property_type: z.string().optional(),
});

export type PropertySearchInput = z.infer<typeof propertySearchSchema>;

// Signup form validation
export const signupSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name too long').trim(),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name too long').trim(),
  email: z.string().email('Invalid email address').toLowerCase(),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Invalid phone number (10 digits, starting with 6-9)'),
  city: z.string().min(1, 'Please select a city'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password too long'),
});

export type SignupInput = z.infer<typeof signupSchema>;
