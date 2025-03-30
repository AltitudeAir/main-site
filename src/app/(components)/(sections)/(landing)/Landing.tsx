import { apiPaths } from '@/core/api/apiConstants';
import {
  ArrayResponseType,
  ObjectResponseType,
} from '@/core/types/responseTypes';
import { Footer } from '@/modules/footer/footerType';
import { General } from '@/modules/general/footerTypes';

async function Landing({
  generalData,
  footerdata,
}: {
  generalData?: ObjectResponseType<General>;
  footerdata?: ArrayResponseType<Footer> | undefined;
}) {
  return (
    <section className="landing ">
      {generalData?.data.VideoUrl ? (
        <video
          loop={true}
          src={apiPaths.baseUrl + generalData?.data.VideoUrl}
          autoPlay={true}
          muted={true}
        />
      ) : (
        <></>
      )}
      <div className="w-full h-full z-10 container mx-auto flex items-center">
        <div className="border-8 border-custom-blue bg-custom-blue/50 w-full max-w-md py-4 px-5 ">
          <h2 className="text-4xl font-black text-white">
            <span>Above</span> <span className="text-[]">and</span>{' '}
            <span>Beyond</span>{' '}
          </h2>
          <p className="text-lg text-gray-200 py-4">
            We provide exceptional services and fulfill your extraordinary
            dreams! Altitude Air is committed to providing the best quality
            flights, with our remarkable team.
          </p>
          <div className="flex flex-col justify-center w-full">
            <div className=" mt-2">
              <a href="/packages" className="action-button">
                BOOK NOW!
              </a>
            </div>
            <h3 className="text-xl font-black pt-1  text-gray-200">
              Contact us at:
            </h3>
            <a href={`tel:${footerdata?.data[0].hotline}`} className=" ">
              <h2 className="text-lg w-48 font-black text-custom-primary">
                {footerdata?.data[0].hotline}
              </h2>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Landing;
