import { customMetaDataGenerator } from '@/core/helpers/customMetaDataGenerator';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

interface ChoppersType {
  id: number;
  name: string;
}
export const metadata: Metadata = customMetaDataGenerator({
  title: 'Fleets',
  ogImage: 'https://altitudeairnepal.com/images/banner/banner.webp',
});
const Page = () => {
  const choppers: ChoppersType[] = [
    { id: 1, name: '9N-AMS' },
    { id: 2, name: '9N-AMX' },
  ];

  return (
    <main className="description-main">
      <section className="intro relative flex flex-col lg:flex-row">
        <div className="absolute top-36 left-1/2 transform -translate-x-1/2 z-20 text-center px-4">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-semibold">
            FLEETS
          </h1>
        </div>
        <div className="flex flex-col lg:flex-row w-full h-full">
          <Link
            href={`/description/${choppers?.[0]?.id}`}
            className="flex-1 relative cursor-pointer w-full h-[250px] md:h-[400px] lg:h-full group"
          >
            <div className="absolute inset-0 bg-black opacity-70 z-10 group-hover:opacity-0 transition-opacity duration-300"></div>
            <Image
              src="/images/description/Altitude1.jpg"
              alt="mountain background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center z-30 group-hover:hidden transition-all duration-300">
              <span className="text-white text-2xl font-semibold">9N-AMS</span>
            </div>
          </Link>
          <Link
            href={`/description/${choppers?.[1]?.id}`}
            className="flex-1 relative cursor-pointer w-full h-[250px] md:h-[400px] lg:h-full group"
          >
            <div className="absolute inset-0 bg-black opacity-80 z-10 group-hover:opacity-0 transition-opacity duration-300"></div>
            <Image
              src="/images/banner/Sheyphoksundo.jpg"
              alt="another background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center z-30 group-hover:hidden transition-all duration-300">
              <span className="text-white text-2xl font-semibold">9N-AMX</span>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Page;
