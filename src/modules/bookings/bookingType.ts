import { nonempty } from '@/core/utils/formUtils';
import { z } from 'zod';
import { PackagesDataType } from '../packages/packagesType';

export type BookingSliceType = {
  departureDate?: Date;
  totalPerson?: string;
  package?: PackagesDataType;
};

export const transactionSchema = z.object({
  amount: z.string().optional(),
  payment_url: z.string(),
  transaction_id: z.string(),
});

export const bookingSchema = z.object({
  departureDate: z.date().optional(),
  noOfTravelers: z.number(),
  totalPrice: z.string().optional(),
  fullName: z.string().pipe(nonempty),
  email: z.string().email().pipe(nonempty),
  phone: z.string().pipe(nonempty),
  requirement: z.string().optional(),
  package: z.string().or(z.custom<PackagesDataType>()),
  currency: z.string().pipe(nonempty),
});

export const bookingDetailSchema = bookingSchema.extend({
  transactions: z.array(transactionSchema),
});

export type BookingFormType = z.infer<typeof bookingSchema>;

export type BookingDetailType = z.infer<typeof bookingDetailSchema>;
