'use client';
import { dateFromSqlDateTime, parseHtml } from '@/core/utils/helper';
import Image from 'next/image';
import Link from 'next/link';

export interface BlogItemType {
  id: string | null;
  title?: string;
  description?: string;
  content?: string;
  date: string | null;
  publisher?: string;
  coverImage?: string;
  blogCategory: string | null;
  direction: string;
}

export default function BlogItem({
  id,
  title,
  description,
  date,
  coverImage,
  direction,
}: BlogItemType) {
  return (
    <div className={`blog-item ${direction || ''}`} id={id ?? undefined}>
      <div className="image_container">
        <div className="absolute_shadow relative " />
        <Image
          src={coverImage as string}
          alt="blog heli image"
          //   onError={(e) => {
          //     e.currentTarget.src = '/images/errors/placeholder.webp';
          //   }}
          height={100}
          width={100}
          quality={75}
          className="rounded-md cursor-pointer "
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="text_container">
        <Link href={`/blog/${id}`} passHref>
          <h2>{title}</h2>
        </Link>
        <p className="publish-date">
          Published on {date ? dateFromSqlDateTime(date) : ''}
        </p>
        <p>{parseHtml(description ?? '')}</p>
        <Link href={`/blog/${id}`}>
          <div className="mt-3">
            <button className="font-extrabold p-3 border-[2px] cursor-pointer hover:bg-[#c0d9f499] transition-colors duration-500 ease-in-out">
              VIEW MORE
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}
