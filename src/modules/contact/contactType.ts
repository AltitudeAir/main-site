import { nonempty } from "@/core/utils/formUtils";
import { z } from "zod";

export const contactFormSchema = z.object({
    firstName: z.string().pipe(nonempty),
    lastName: z.string().pipe(nonempty),
    email: z.string().email().pipe(nonempty),
    tel: z.string().pipe(nonempty),
    details: z.string().optional(),
    date: z.date(),

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
