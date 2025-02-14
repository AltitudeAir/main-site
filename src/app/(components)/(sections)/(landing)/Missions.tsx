'use client';
import useMediaQuery from '@/core/hooks/useMediaQuery';
import axiosInstance from '@/core/utils/axoisInst';
import { constants } from '@/core/utils/constants';
import mapboxgl, { Map as MapboxMap } from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import MissionItem from '../../(elements)/MissionItem';
import Tab from '../../(elements)/Tab';

interface Mission {
  imageUrl: string;
  name: string;
  info: string;
  coords: [number, number];
}

export default function Missions() {
  const mobileOnly = useMediaQuery('(max-width:768px)');
  const [readClicked, setreadClicked] = useState<{
    clicked: boolean;
    clickedBy: number;
  }>({
    clicked: false,
    clickedBy: -1,
  });
  const [missionList, setMissionList] = useState<Mission[]>([]);
  const [selected, setSelected] = useState<Mission>({
    imageUrl: '',
    name: '',
    info: '',
    coords: [83.9778, 28.19886],
  });
  const [fadeClass, setFadeClass] = useState<boolean>(true);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<MapboxMap | null>(null);
  const [lng, setLng] = useState<number>(84.3);
  const [lat, setLat] = useState<number>(28.5);
  const [zoom, setZoom] = useState<number>(5.5);

  mapboxgl.accessToken =
    'pk.eyJ1IjoiaWN5aG90c2hvdG8iLCJhIjoiY2tmeHQwc3E5MjRxajJxbzhmbDN1bjJ5aiJ9.mNKmhIjRyKxFkJYrm4dMqg';

  function flyTo(coords: [number, number]) {
    if (!map.current) {
      return;
    }
    map.current.flyTo({
      center: coords,
      minZoom: 5,
      speed: 0.4,
      zoom: 12,
    });
    const marker1 = new mapboxgl.Marker({ color: '#fbc200' })
      .setLngLat(coords)
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
  }, []);

  useEffect(() => {
    axiosInstance.get('/rescue-mission/').then((item) => {
      let finalObj = item.data.data?.map((item: any) => {
        return {
          imageUrl: constants.baseUrl + item.coverImage,
          name: item.title,
          info: item.description,
          coords: [item.longitude, item.latitude],
        };
      });
      setMissionList(finalObj);
    });
  }, []);

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
            missionList?.map((item, index) => {
              return (
                <MissionItem
                  key={item.imageUrl}
                  index={index}
                  name={item.name}
                  info={item.info}
                  imageUrl={item.imageUrl}
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
