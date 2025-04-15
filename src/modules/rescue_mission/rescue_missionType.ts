import { nonempty } from '@/core/utils/formUtils';
import { z } from 'zod';
const imageFile = z.instanceof(File).refine(
  (file) => {
    const acceptedImageTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/bmp',
      'image/webp',
    ];
    return acceptedImageTypes.includes(file.type);
  },
  {
    message: 'Invalid file type. Only image files are allowed.',
  }
);

export const rescueMissionTypeSchema = z.object({
  id: z.number().optional().nullable(),
  title: z.string().optional().pipe(nonempty),
  description: z.string().optional().pipe(nonempty),
  content: z.string().optional().pipe(nonempty),
  rescueDate: z.date().optional().nullable(),
  rescueTime: z.string().optional().nullable(),
  publisher: z.string().optional(),
  coverImage: imageFile.optional().nullable(),
  latitude: z.number(),
  longitude: z.number(),
});

export type RescueMissionSchemaType = z.infer<typeof rescueMissionTypeSchema>;

export interface RescueMissionType {
  id: number;
  title: string;
  description: string;
  content: string;
  date: string;
  publisher: string;
  coverImage: string;
  latitude: number;
  longitude: number;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}
