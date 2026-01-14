import { nonempty } from '@/core/utils/formUtils';
import { z } from 'zod';

export const contactFormSchema = z.object({
  firstName: z
    .string()
    .max(32, 'Must be less than or equal to 32 characters.')
    .pipe(nonempty),
  lastName: z
    .string()
    .max(32, 'Must be less than or equal to 32 characters.')
    .pipe(nonempty),
  email: z.string().email('Not a valid email'),
  tel: z.string().min(10, 'Number must be at least 10 digits'),
  date: z.date(),
  details: z.string().max(5000).optional().nullable(),
  isContact: z.boolean().optional().nullable(),
});

export type ContactFormType = z.infer<typeof contactFormSchema>;

export interface ContactType {
  id: number;
  address: string;
  airportNumber: string;
  copyright: string;
  headNumber: string;
  latitude: string;
  longitude: string;
  inquiry1: string;
  inquiry2: string;
  inquiry3: string;
  bookingEmail: string;
  bookingInquiry: string;
}
export interface SocialLinkType {
  id: number;
  instagram: string;
  facebook: string;
  youtube: string;
  twitter: string;
}
export interface GeneralType {
  id: number;
  siteTitle: string;
  favIcon: string;
  QRcode: string;
  VideoUrl: string;
  PDF: string;
}
