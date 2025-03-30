'use client';
import axiosInst from '@/core/utils/axoisInst';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';

export default function PackageLocation({
  latitude,
  longtitude,
}: {
  latitude: number;
  longtitude: number;
}) {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiaWN5aG90c2hvdG8iLCJhIjoiY2tmeHQwc3E5MjRxajJxbzhmbDN1bjJ5aiJ9.mNKmhIjRyKxFkJYrm4dMqg';
  const mapContainer = useRef(null);
  const map = useRef<any>(null);

  useEffect(() => {
    if (map.current) {
      axiosInst
        .get('/contact/')
        .then((res) => {
          let lat = res.data.data[0].latitude;
          let lng = res.data.data[0].longitude;
          map.current?.flyTo({
            center: [lng, lat],
            minZoom: 5,
            speed: 0.8,
            zoom: 13,
          });
          new mapboxgl.Marker({ color: '#fbc200' })
            .setLngLat([lng, lat])
            .addTo(map.current);
        })
        .catch((err) => {});
    }

    if (map.current || !mapContainer.current) {
      return;
    }
    if (!map.current && mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/icyhotshoto/cktb59q6y7iz518uqowun3l0k',
        center: [latitude, longtitude],
        zoom: 8,
      });
    }
  }, []);

  return (
    <div className="bg-custom-gray-light/45 overflow-hidden  sm:rounded-md shadow-sm hover:shadow-lg mb-10 mt-5 h-80 sm:h-96">
      <div ref={mapContainer} className="!w-full !h-full"></div>
    </div>
  );
}
