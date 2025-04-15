'use client';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';

export default function PackageLocation({
  latitude,
  longtitude,
}: {
  latitude: number;
  longtitude: number;
}) {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY ?? '';
  const mapContainer = useRef(null);
  const map = useRef<any>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) {
      return;
    }
    if (!map.current && mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/icyhotshoto/cktb59q6y7iz518uqowun3l0k',
        center: [longtitude, latitude],
        zoom: 8,
      });

      new mapboxgl.Marker({ color: '#fbc200' })
      .setLngLat([longtitude, latitude])
      .addTo(map.current);
    }
  }, []);

  return (
    <div className="bg-custom-gray-light/45 overflow-hidden  sm:rounded-md shadow-sm hover:shadow-lg mb-10 mt-5 h-80 sm:h-96">
      <div ref={mapContainer} className="!w-full !h-full"></div>
    </div>
  );
}
