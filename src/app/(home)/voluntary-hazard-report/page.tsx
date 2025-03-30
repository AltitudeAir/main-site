import ScrollIndicator from '@/app/(components)/(elements)/ScrollIndicator';
import { fetchData } from '@/core/api/api_client';
import { apiPaths } from '@/core/api/apiConstants';
import { ObjectResponseType } from '@/core/types/responseTypes';
import { constants } from '@/core/utils/constants';
import Forms from './(components)/Form';

export default async function VoluntaryHazardReport() {
  const { data: voluntaryData } = await fetchData<ObjectResponseType<string>>(
    apiPaths.getVolutneryHazardUrl
  );

  return (
    <>
      <main className="hazard-main">
        <section>
          <div className=" relative featured-img !bg-[url(/images/banner/Kalapathhar.jpg)] ">
            <div className="absolute top-0 left-0 z-0 bg-black/50 w-full h-full"></div>
            <div
              className="relative flex w-full h-full items-center justify-center z-10 text-white text-3xl md:text-5xl lg:text-5xl xl:text-5xl"
              style={{ fontFamily: 'BankGothic-Regular' }}
            >
              Voluntary Hazard
            </div>

            <div className="fading-bottom" />
            <ScrollIndicator id="hazard_intro" />
          </div>
        </section>
        <section className="section_hazard_intro" id="hazard_intro">
          <div className="hazard_intro">
            <h2>Voluntary Hazard Report - Altitude Air Nepal</h2>
            <hr />
            <p className="english">
              Any of the Altitude Air Pvt. Ltd. employees noticing any hazard or
              observing any activity or procedure that may affect the safety of
              the people‚ aircraft‚ vehicles or equipment should fill Part A of
              this form as soon as practical and submit the completed form to
              person responsible for safety or drop in the boxes kept in
              different places for collecting such forms as far as practicable.
              The information contained in the form shall be used only for
              improving safety standard of the company. Confidentiality of the
              information and reporter shall be maintained.
            </p>
            <p className="nepali">
              अल्टिच्युड एयरका कुनै पनि कर्मचारीले, व्यक्ति, विमान, वाहन वा
              उपकरणको सुरक्षामा प्रतिकुल असर हुने गतिविधि वा खतराजन्य
              परिस्थितिको अवलोकन वा पहिचान गरेमा यस फारमको “ भाग ए “ भरि
              सुरक्षाका लागि जिम्मेवार व्यक्ति समक्ष प्रस्तुत गर्ने वा विभिन्न
              ठाउँमा राखिएका सुचना संकलन पेटिकामा यथाशिघ्र छिटो खसालि दिनु होला
              । यस फारममा भरिएका जानकारी कम्पनीको सुरक्षामानक सुधारको लागि मात्र
              प्रयोग गरिनेछ । फारममा उल्लेखित व्यक्तिगत विवरण गोप्य राखिने छ ।
            </p>
            <hr />
            <p>Please send your message below or download the form here.</p>
            <a
              href={constants.baseUrl + voluntaryData?.data}
              target="_blank"
              rel="noreferrer"
            >
              <button className="button-outline-light">DOWNLOAD NOW</button>
            </a>
          </div>
        </section>

        <section className="form-section">
          <div className="corner-border--top" />

          <h2>Voluntary Hazard Form</h2>
          <Forms />
          <div className="corner-border--bottom" />
        </section>
      </main>
    </>
  );
}
