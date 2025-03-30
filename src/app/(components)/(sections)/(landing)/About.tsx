import { ShieldCross } from 'iconsax-react';
import Image from 'next/image';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '../../(elements)/Dialog';

export default function About() {
  // useEffect(() => {
  //   animateOnScroll('.about .info', '.about .info', 'animate__slideInRight');
  //   animateOnScroll(
  //     '.about .video-thumb',
  //     '.about .info',
  //     'animate__slideInLeft'
  //   );
  // }, []);

  return (
    <section className="flex bg-[#b3c6d5] h-dvh overflow-hidden">
      <div className=" lg:ml-10 lg:-mr-20 max-lg:gap-2 max-lg:mb-4 flex items-center w-dvw p-8 overflow-hidden lg:flex-row flex-col">
        <div
          className="bg-[#202e43e6] text-[#c1d5e6] max-w-md p-8 z-20 w-full rounded-md"
          style={{ animationDuration: '.3s' }}
        >
          <h1 className="font-[Gilroy-ExtraBold] text-4xl mb-4">ABOUT US</h1>
          <p className="font-[QuickSand-Light] text-base">
            Marking a difference in Helicopter Airlines, Altitude Air Pvt. Ltd.
            is committed to the highest level of safety and performance!
            Comprising of veterans who have made a significant growth and
            contribution in the field of tourism and made Nepal proud, our team
            of highly qualified and experienced personnel is our biggest pride
            and strength!
          </p>
        </div>
        <div className="lg:flex-1 w-full ">
          <Dialog>
            <DialogTrigger asChild>
              <div
                className="relative lg:-ml-10 cursor-pointer"
                style={{ animationDuration: '.3s' }}
              >
                <div className="relative w-full">
                  <Image
                    src="https://i.ytimg.com/vi_webp/vNCWbmSLYeY/maxresdefault.webp"
                    alt="video thumbnail"
                    width={100}
                    height={100}
                    quality={75}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-lg w-full h-full"
                  />
                </div>

                <Image
                  src="/icons/play.svg"
                  alt="play svg image"
                  className="play_icon absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  height={100}
                  width={100}
                />
              </div>
            </DialogTrigger>

            <DialogContent className="w-[90%] max-w-[720px] p-4 rounded-lg shadow-lg">
              <div className="relative w-full h-0 pb-[56.25%]">
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/vNCWbmSLYeY?autoplay=1"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <DialogClose className="absolute top-4 right-4">
                <ShieldCross size="32" className="text-white " />
              </DialogClose>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
