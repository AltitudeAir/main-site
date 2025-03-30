'use client';
import { constants } from '@/core/utils/constants';
import { dateFromSqlDateTime, parseHtml } from '@/core/utils/helper';
import { NewsDataType } from '@/modules/news/newsType';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import NoImage from '../../../../public/images/noImage.png';

export default function NewsItem({ data }: { data: NewsDataType }) {
  const [src, setSrc] = useState(
    !data.coverImage?.startsWith('https://')
      ? `${constants.baseUrl}${data.coverImage}`
      : data.coverImage
  );
  return (
    <Link
      href={'news/' + data.id}
      className="col-span-12 sm:col-span-6 md:col-span-4 !m-0 text-left cursor-pointer"
    >
      <div className="flex flex-col gap-2 h-full">
        <div className="relative w-full h-56 overflow-hidden">
          <Image
            src={src}
            alt="article-image"
            height={100}
            width={100}
            quality={75}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-cover"
            onError={() => setSrc(NoImage.src)}
          />
        </div>
        <h2 className="font-medium text-sm overflow-clip line-clamp-1">
          {data.title}
        </h2>

        <div className="flex items-center justify-start gap-2">
          <div className="text-xs font-medium text-gray-500">
            {data.publisher}
          </div>
          <div className="text-xs text-custom-blue-light">&#9679;</div>
          <div className="text-xs font-normal text-gray-500">
            {dateFromSqlDateTime(data.date)}
          </div>
        </div>

        <div className="!text-gray-600 text-sm overflow-clip line-clamp-4">
          {parseHtml(data.description ?? '')}
        </div>
      </div>
    </Link>
  );
}
