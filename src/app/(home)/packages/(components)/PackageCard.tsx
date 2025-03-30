import { parseHtml } from '@/core/utils/helper';
import { PackagesDataType } from '@/modules/packages/packagesType';
import Image from 'next/image';
import Link from 'next/link';
import { FaLocationDot } from 'react-icons/fa6';

export default function PackageCard({ item }: { item: PackagesDataType }) {
  const defaultImage = '/images/no-image.png'; // Replace with your default image path
  const coverImage = item.cover_image ? item.cover_image : defaultImage;
  return (
    <Link
      href={`/packages/${item.slug}`}
      className="relative col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 before:absolute before:-top-2 before:-bottom-2 before:-left-2 before:-right-2 before:border-dashed before:border-custom-blue-light/20 before:-z-10 before:hover:border-2 before:hover:bg-custom-bg/60 transition-all duration-200 group"
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-2 mb-2">
          <div className="w-full h-64 relative overflow-hidden">
            <Image
              src={coverImage}
              alt="image"
              fill
              sizes="(max-width: 2000px) 75vw, 33vw"
              className="group-hover:scale-105 transition-all duration-300 ease-in-out object-cover"
            />
          </div>
          <h3 className="text-lg font-medium text-custom-blue leading-6 line-clamp-1">
            {item.title}
          </h3>
          <div className="flex items-center gap-2">
            <p className="text-xs text-custom-blue-light capitalize font-light flex items-center gap-2">
              <FaLocationDot /> {item.address}
            </p>
            <p className="text-xs text-custom-blue-light">&#9679;</p>
            <p className="text-xs text-custom-blue-light capitalize font-light flex items-center gap-2">
              <span className="font-medium">Duration</span>{' '}
              {/* {convertToHours()} */}
              {item.duration}
            </p>
          </div>
          <p className="text-sm text-custom-blue/60 font-normal line-clamp-4">
            {parseHtml(item.description ?? '')}
          </p>
        </div>
        <div className="flex items-center gap-5 mt-2 justify-between ">
          <div className="text-center basis-28 text-sm font-medium  py-2 px-5 text-custom-primary bg-custom-blue hover:bg-custom-blue/90 hover:shadow-md">
            Book Now
          </div>
          <div className="text-custom-blue-light text-sm flex flex-col items-end">
            <p className="text-sm">Starting from </p>
            <p className="text-custom-blue font-medium text-base">
              ${item.price}
              {item.pricing_type === 'fixed' ? '' : '/p'}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
