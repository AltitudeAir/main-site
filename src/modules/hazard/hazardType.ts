import { nonempty } from "@/core/utils/formUtils";
import { z } from "zod";

export const hazardFormSchema = z.object({
    firstName: z.string().max(32, "Must be less than or equal to 32 characters.").pipe(nonempty),
    lastName: z.string().max(32, "Must be less than or equal to 32 characters.").pipe(nonempty),
    email: z.string().email("Not a valid email"),
    tel: z.string().min(10, "Number must be at least 10 digits"),
    date: z.date(),
    details: z.string().max(5000)
});

export type HazardFormType = z.infer<typeof hazardFormSchema>;

export interface VountaryType {
    status: string;
    data: string;
}
