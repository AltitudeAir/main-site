import { nonempty } from "@/core/utils/formUtils";
import { z } from "zod";

export const bookingDetailSchema = z.object({
    package: z.number(),
    departureDate: z.date().optional(),
    noOfTravelers: z.number(),
    totalPrice: z.string().optional(),
    firstName: z.string().pipe(nonempty),
    lastName: z.string().pipe(nonempty),
    email: z.string().email().pipe(nonempty),
    phone: z.string().pipe(nonempty),
    requirement: z.string().optional(),
});

export type BookingDetailSchemaType = z.infer<typeof bookingDetailSchema>;

export interface BookingDataType {
    id: number;
    departure_date: string;
    no_of_travellers: number;
    total_price: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    requirement: string;
    package: number;
}