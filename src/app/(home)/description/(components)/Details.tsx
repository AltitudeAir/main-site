/* eslint-disable @next/next/no-img-element */
import axiosInstance from '@/core/utils/axoisInst';
import { constants } from '@/core/utils/constants';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function Details(props: any) {
  const { slug } = useParams();
  const router = useRouter();

  const [featureList, setFeatureList] = useState({
    exterior: {
      // height: "Non voluptas ea cons",
      // wingSpan: "Qui voluptate ut et ",
      // length: "Officia quia est dol",
      // externalBaggage: "Aut obcaecati qui ul",
    },
    interior: {
      // cabinHeight: "Dolores in ab odio s",
      // cabinWidth: "Deserunt dolore fugi",
      // cabinLength: "Facere qui ipsum vo",
      // cabinVolume: "Ipsam molestiae est ",
      // doorHeight: "Officia voluptates l",
      // doorWidth: "Amet esse molestia",
      // internalBaggage: "Libero vitae perfere",
    },
    occupancy: {
      // crew: "Quod consectetur et",
      // passenger: "Labore sunt officiis",
    },
    operatingWeights: {
      // maxToWeight: "Ut deserunt hic labo",
      // maxLandWeight: "Exercitation omnis r",
      // operatingWeight: "Aliquid possimus de",
      // emptyWeight: "Voluptate esse cons",
      // fuelCapacity: "In tempore magna fu",
      // payloadUseful: "Nostrum culpa volup",
      // payloadWFullFuel: "Ipsum et aperiam ut ",
      // maxPayload: "Ad labore consequunt",
    },
    range: {
      // normalRange: "Debitis rerum et omn",
      // maxRange: "Excepturi in perspic",
      // serviceCelling: "Recusandae Temporib",
    },
    performance: {
      // rateOfClimb: "Quibusdam quas sunt ",
      // maxSpeed: "Qui saepe deserunt e",
      // normalCruise: "Eaque lorem ad sit e",
    },
    power: {
      // engine: "Deserunt eveniet ni",
      // engineMfg: "Voluptatem sed dolo",
      // engineModel: "Voluptas dicta illum",
    },
  });

  const [chopperInfo, setChopperInfo] = useState({
    // id: 7,
    // name: "Troy Hutchinson",
    // image: "/media/chopper/high-altitude_sCfR8as.jpg",
  });

  const [selected, setSelected] = useState({
    index: 0,
    heading: 'EXTERIOR',
    details: {},
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
      delete chopper['id'];
      delete chopper['name'];
      delete chopper['image'];

      setFeatureList(chopper);

      setSelected({
        index: 0,
        heading: Object.keys(chopper)[0],
        details: chopper[Object.keys(chopper)[0]],
      });
    });
  }, [slug]);

  return (
    <section className="details-section">
      <div className="tabs">
        <ul id="scroll-track">
          {Object.keys(featureList).map((item, index) => {
            return (
              <li
                className={selected.index === index ? 'selected' : ''}
                key={index}
              >
                <a
                  onClick={() =>
                    setSelected({
                      index: index,
                      heading: getFeatureName(item),
                      details: (featureList as any)[item],
                    })
                  }
                >
                  {getFeatureName(item)}
                </a>

                <div
                  className="highlight"
                  style={{
                    marginLeft: (selected.index - index) * 8 + 'rem',
                    animationName: 'slide-tab-highlighter',
                    animationDuration: '.3s',
                    animationTimingFunction: 'ease-in',
                    animationDirection: 'forwards',
                  }}
                />
                <div className="highlight highlight--hover" />
              </li>
            );
          })}
          <div
            className="arrow arrow--left mobile-only"
            onClick={(e) => {
              e.stopPropagation();
              document.getElementById('scroll-track')?.scrollBy(-100, 0);
            }}
          />
          <div
            className="arrow arrow--right mobile-only"
            onClick={(e) => {
              e.stopPropagation();
              document.getElementById('scroll-track')?.scrollBy(100, 0);
            }}
          />
        </ul>
      </div>
      <HeliDescription descriptionState={selected} chopperInfo={chopperInfo} />;
    </section>
  );
}
function getFeatureName(featureKey: any) {
  const features = {
    height: 'Height',
    wingSpan: 'Wing Span',
    length: 'Length',
    externalBaggage: 'External Baggage',
    cabinHeight: 'Cabin Height',
    cabinWidth: 'Cabin Width',
    cabinLength: 'Cabin Length',
    cabinVolume: 'Cabin Volume',
    doorHeight: 'Door Height',
    doorWidth: 'Door Width',
    internalBaggage: 'Internal Baggage',
    crew: 'Crew',
    passenger: 'Passenger',
    maxToWeight: 'Max To Weight',
    maxLandWeight: 'Max Land Weight',
    operatingWeight: 'Operating Weight',
    emptyWeight: 'Empty Weight',
    fuelCapacity: 'Fuel Capacity',
    payloadUseful: 'Payload Useful',
    payloadWFullFuel: 'Payload W Full Fuel',
    maxPayload: 'Max Payload',
    normalRange: 'Normal Range',
    maxRange: 'Max Range',
    serviceCelling: 'Service Sling',
    rateOfClimb: 'Rate of Climb',
    maxSpeed: 'Max Speed',
    normalCruise: 'Normal Cruise',
    engine: 'Engine',
    engineMfg: 'Engine Manufacture Date',
    engineModel: 'Engine Model',
    operatingWeights: 'Operating Weights',
  };

  let featureName;
  if ((features as any)[featureKey]) {
    featureName = (features as any)[featureKey];
  } else {
    featureName = featureKey;
  }

  return featureName;
}

function HeliDescription({ descriptionState, chopperInfo, heading }: any) {
  const [opacityClass, setOpacityClass] = useState('');
  useEffect(() => {
    setOpacityClass('full-opacity');
  }, []);

  return (
    <div className={`content ${opacityClass}`}>
      <img src={constants.baseUrl + chopperInfo.image} alt={chopperInfo.name} />
      <div className="feature-details">
        <div className="heading">
          <h1>{descriptionState.heading}</h1>
        </div>

        <div className="items">
          {Object.keys(descriptionState.details).map((item, index) => {
            return (
              <div className="item" key={index}>
                <p>
                  <span>{getFeatureName(item)}: </span>
                  {descriptionState.details[item]}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Details;
