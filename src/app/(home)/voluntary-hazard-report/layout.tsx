import { customMetaDataGenerator } from '@/core/helpers/customMetaDataGenerator';
import { Metadata } from 'next';
import VoluntaryHazardReport from './page';

export const metadata: Metadata = customMetaDataGenerator({
  title: 'Voluntary Hazard',
  ogImage: 'https://altitudeairnepal.com/images/banner/Kalapathhar.jpg',
  description:
    'Any of the Altitude Air Pvt. Ltd. employees noticing any hazard or observing any activity or procedure that may affect the safety of the people‚ aircraft‚ vehicles or equipment should fill Part A of this form as soon as practical and submit the completed form to person responsible for safety or drop in the boxes kept in different places for collecting such forms as far as practicable. The information contained in the form shall be used only for improving safety standard of the company. Confidentiality of the information and reporter shall be maintained.',
});
export default function VoluntaryPage() {
  return <VoluntaryHazardReport />;
}
