import { contactFormSchema, ContactFormType } from '../contact/contactType';

export const hazardFormSchema = contactFormSchema;

export type HazardFormType = ContactFormType;

export interface VountaryType {
  status: string;
  data: string;
}
