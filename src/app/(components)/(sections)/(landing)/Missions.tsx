'use client';
import useMediaQuery from '@/core/hooks/useMediaQuery';
import { PaginatedResponseType } from '@/core/types/responseTypes';
import { Coordinates, RescueMissionType } from '@/modules/rescue_mission/rescue_missionType';
import mapboxgl, { Map as MapboxMap } from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import MissionItem from '../../(elements)/MissionItem';
import Tab from '../../(elements)/Tab';

interface Mission {
  imageUrl: string;
  name: string;
  info: string;
  coords: Coordinates;
}

export default function Missions({
  missions: rescueData,
}: {
  missions?: PaginatedResponseType<RescueMissionType>;
}) {
  const mobileOnly = useMediaQuery('(max-width:768px)');
  const [readClicked, setreadClicked] = useState<{
    clicked: boolean;
    clickedBy: number;
  }>({
    clicked: false,
    clickedBy: -1,
  });
  const missionList: Mission[] =
    rescueData?.results.map((item) => {
      return {
        coords: {
          latitude: item.latitude,
          longitude: item.longitude,
        },
        imageUrl: item.coverImage,
        info: item.description,
        name: item.title,
      };
    }) ?? [];

  const [selected, setSelected] = useState<Mission>({
    imageUrl: missionList[0].imageUrl ?? '',
    name: missionList[0].name ?? '',
    info: missionList[0].info ?? '',
    coords: missionList[0].coords ?? '',
  });
  const [fadeClass, setFadeClass] = useState<boolean>(true);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<MapboxMap | null>(null);
  const [lng, setLng] = useState<number>(84.3);
  const [lat, setLat] = useState<number>(28.5);
  const [zoom, setZoom] = useState<number>(5.5);

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY ?? '';

  function flyTo(coords: Coordinates) {
    if (!map.current) {
      return;
    }
    
    map.current.flyTo({
      center: [coords.longitude, coords.latitude],
      minZoom: 5,
      speed: 0.4,
      zoom: 12,
    });
    const marker1 = new mapboxgl.Marker({ color: '#fbc200' })
      .setLngLat([coords.longitude, coords.latitude])
      .addTo(map.current);
  }

  useEffect(() => {
    if (map.current) {
      return;
    }
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/icyhotshoto/cktb59q6y7iz518uqowun3l0k',
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.scrollZoom.disable();
  }, [lng, lat, zoom]);

  const selectedItemHandler = (position: number) => {
    if (missionList.length === 0 || position > missionList.length - 1) {
      return;
    }
    setSelected(missionList[position]);
    if (mobileOnly) {
      setFadeClass((prevState) => {
        return !prevState;
      });
    }
  };

  return (
    <section className="missions">
      <div className="mission_wrapper">
        <div className="heading">
          <h2>
            RESCUE <br />
            MISSIONS
          </h2>
        </div>
        <div className="mission-list">
          {!mobileOnly &&
            rescueData?.results?.map((item, index) => {
              return (
                <MissionItem
                  key={index}
                  index={index}
                  name={item.title}
                  coords={{
                    latitude: item.latitude,
                    longitude: item.longitude,
                  }}
                  info={item.description}
                  imageUrl={item.coverImage}
                  flyTo={flyTo}
                  readClicked={readClicked}
                  setReadClicked={setreadClicked}
                />
              );
            })}
          {mobileOnly && (
            <MissionItem
              index={0}
              imageUrl={selected.imageUrl}
              info={selected.info}
              name={selected.name}
              coords={selected.coords}
              readClicked={readClicked}
              setReadClicked={setreadClicked}
              fadeClass={fadeClass}
            />
          )}
        </div>
      </div>
      <div className="map-wrapper">
        <div ref={mapContainer} style={{ width: '600px', height: '350px' }} />
      </div>
      {mobileOnly && <Tab selectedHandler={selectedItemHandler} />}
    </section>
  );
}
