'use client';

import axiosInstance from '@/core/utils/axoisInst';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Details from '../(components)/Details';

export default function Description() {
  const { slug } = useParams();

  const router = useRouter();
  const [chopperInfo, setChopperInfo] = useState({
    id: 0,
    name: '',
    image: '',
  });

  useEffect(() => {
    if (slug == null) {
      return;
    }

    axiosInstance.get('/chopper/').then((item) => {
      const chopperList = item.data.data;
      let chopper = chopperList.filter((item: any) => item.id == slug)[0];

      if (!chopper) {
        router.push('/404');
        return;
      }

      setChopperInfo({
        id: chopper.id,
        name: chopper.name,
        image: chopper.image,
      });
    });
  }, [slug]);

  return (
    <main className="description-main">
      <section className="intro relative">
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-10 text-center px-4">
          <h1 className="">
            {chopperInfo.name} <br />
            DESCRIPTION
          </h1>
        </div>

        <div className="bg-img mountain-img relative h-64 sm:h-80 md:h-96 lg:h-[32rem] ">
          <Image
            src="/images/banner/IMG_2036.JPG"
            alt="mountain background"
            fill
            className="object-cover"
          />
        </div>
      </section>

      <div className="details-wrapper">
        <Details />
      </div>
    </main>
  );
}
