'use client';

import { constants } from '@/core/utils/constants';
import { useEffect, useState } from 'react';
import axiosInst from '../../../../core/utils/axoisInst';

import { Dialog, DialogContent, DialogTrigger } from '../../(elements)/Dialog';
import StepFormV2 from '../../(elements)/StepFormV2';

function Landing() {
  const [hotline, setHotline] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    axiosInst.get('/footer/').then((result) => {
      const data = result.data.data;
      setHotline(data[0].hotline);
    });

    axiosInst.get('/general/').then((result) => {
      const data = result.data.data;
      setVideoUrl(data.VideoUrl);
    });
  }, []);

  return (
    <section className="landing">
      <video
        loop={true}
        src={constants.baseUrl + videoUrl}
        autoPlay={true}
        muted={true}
      />
      <div className="cardFamily border-8 border-custom-blue bg-custom-blue/50 w-full max-w-md py-4 px-5 z-10">
        <h2 className="text-4xl font-black text-white">
          <span>Above</span> <span className="text-[]">and</span>{' '}
          <span>Beyond</span>{' '}
        </h2>
        <p className="text-lg text-gray-200 py-4">
          We provide exceptional services and fulfill your extraordinary dreams!
          Altitude Air is committed to providing the best quality flights, with
          our remarkable team.
        </p>
        <div className="flex flex-col justify-center w-full">
          <div className=" mt-2">
            <Dialog>
              <DialogTrigger asChild>
                <button className="action-button">BOOK NOW!</button>
              </DialogTrigger>
              <DialogContent>
                <StepFormV2 />
              </DialogContent>
            </Dialog>
          </div>
          <h3 className="text-xl font-black pt-1  text-gray-200">
            Contact us at:
          </h3>
          <a href={`tel:${hotline}`} className=" ">
            <h2 className="text-lg w-48 font-black text-custom-primary">
              {hotline}
            </h2>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Landing;
