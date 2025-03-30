import { fetchData } from '@/core/api/api_client';
import { apiPaths } from '@/core/api/apiConstants';
import {
  ArrayResponseType,
  ObjectResponseType,
  PaginatedResponseType,
} from '@/core/types/responseTypes';
import { Footer } from '@/modules/footer/footerType';
import { General } from '@/modules/general/footerTypes';
import { PackagesDataType } from '@/modules/packages/packagesType';
import { RescueMissionType } from '@/modules/rescue_mission/rescue_missionType';
import { ReviewType } from '@/modules/review/reviewType';
import Enquiry from '../(components)/(elements)/Enquiry';
import EnquiryDetails from '../(components)/(elements)/EnquiryDetails';
import About from '../(components)/(sections)/(landing)/About';
import GetInTouch from '../(components)/(sections)/(landing)/GetInTouch';
import Highlights from '../(components)/(sections)/(landing)/Highlights';
import Landing from '../(components)/(sections)/(landing)/Landing';
import Missions from '../(components)/(sections)/(landing)/Missions';
import Package from '../(components)/(sections)/(landing)/Package';
import Reviews from '../(components)/(sections)/(landing)/Reviews';

export default async function Home() {
  const { data: paginatedPackagesResponse, error: packageError } =
    await fetchData<PaginatedResponseType<PackagesDataType>>(
      apiPaths.getPackages
    );

  const { data: rescueMissions, error: rescueMissionsError } = await fetchData<
    PaginatedResponseType<RescueMissionType>
  >(apiPaths.rescuemissionUrl);

  const { data: reviews, error: reviewsError } = await fetchData<
    PaginatedResponseType<ReviewType>
  >(apiPaths.reviewurl);

  const { data: footerdata, error: footerdataError } = await fetchData<
    ArrayResponseType<Footer>
  >(apiPaths.footerUrl);

  const { data: generalData, error: generalDataError } = await fetchData<
    ObjectResponseType<General>
  >(apiPaths.generalUrl);

  return (
    <>
      {/* <SplashScreen /> */}
      <Enquiry>
        <EnquiryDetails />
      </Enquiry>
      {!generalDataError && generalData ? (
        <Landing footerdata={footerdata} generalData={generalData} />
      ) : (
        <></>
      )}
      <Highlights />
      {!packageError && paginatedPackagesResponse ? (
        <Package paginatedPackagesResponse={paginatedPackagesResponse} />
      ) : (
        <></>
      )}
      {/* <Services /> */}
      <About />
      {!rescueMissionsError && rescueMissions ? (
        <Missions missions={rescueMissions} />
      ) : (
        <></>
      )}
      {/* <News /> */}
      {/* <Gallery /> */}
      {/* <GalleryV2 /> */}
      {!reviewsError && reviews ? <Reviews reviews={reviews} /> : <></>}
      <GetInTouch footerdata={footerdata} />
    </>
  );
}
