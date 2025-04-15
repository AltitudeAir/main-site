import { customMetaDataGenerator } from '@/core/helpers/customMetaDataGenerator';
import { Metadata } from 'next';
import VoluntaryHazardReport from './page';

export const metadata: Metadata = customMetaDataGenerator({
  title: 'Voluntary Hazard',
  ogImage1:
    'https://altitudeairnepal.com/images/resized-images/Voluntaryhazard.jpg',
  ogImage2:
    'https://altitudeairnepal.com/images/resized-images/Voluntaryhazard.jpg',
  description:
    'Any of the Altitude Air Pvt. Ltd. employees noticing any hazard or observing any activity or procedure that may affect the safety of the people‚ aircraft‚ vehicles.',
});
export default function VoluntaryPage() {
  return <VoluntaryHazardReport />;
}
