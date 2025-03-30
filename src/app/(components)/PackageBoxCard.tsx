import { parseHtml } from '@/core/utils/helper';
import { PackagesDataType } from '@/modules/packages/packagesType';
import { formatDuration } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { FaLocationDot } from 'react-icons/fa6';

export default function PackageBoxCard({ item }: { item: PackagesDataType }) {
  const defaultImage = '/images/no-image.png';
  const coverImage = item.cover_image ? item.cover_image : defaultImage;

  return (
    <Link
      href={`/packages/${item.slug}`}
      className="relative col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 transition-all duration-200 group block h-full px-1 py-1 pb-12"
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
              {item.duration
                ? (() => {
                    const parts = item.duration.split(':');
                    if (parts.length !== 3) return '-';
                    const [hours, minutes, seconds] = parts;
                    return formatDuration({
                      hours: parseInt(hours),
                      minutes: parseInt(minutes),
                      seconds: parseInt(seconds),
                    });
                  })()
                : '-'}
            </p>
          </div>
          <div className="text-sm text-custom-blue/60 font-normal line-clamp-4 h-20">
            {parseHtml(item.description ?? '')}
          </div>
        </div>
        <div className="flex items-center justify-between gap-5 mt-2">
          <div className="text-center text-sm font-medium py-2 px-5 text-custom-primary bg-custom-blue hover:bg-custom-blue/90 hover:shadow-md">
            Book Now
          </div>
          <p className="text-custom-blue-light text-sm flex flex-col items-end ">
            <span>Starting from </span>
            <span className="text-custom-blue font-medium">
              {item.currency === 'USD' ? '$' : 'NPR.'}
              {item.price
                ? parseFloat(item.price).toFixed(
                    item.currency === 'USD' ? 2 : 0
                  )
                : '-'}
              {item.pricing_type === 'fixed' ? '' : '/p'}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
}
