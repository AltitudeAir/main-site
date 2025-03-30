import { parseHtml } from '@/core/utils/helper';

export default function PackageHighlights({
  data,
  hotline,
}: {
  data: string | undefined;
  hotline: string;
}) {
  return (
    <div className="flex flex-col gap-10 sm:px-0 px-3 mt-10">
      {/* <div>
        <h3 className="text-2xl font-bold text-custom-blue">Highlights</h3>
        <div className="border-2 border-dashed border-custom-gray-light mt-4">
          <ul className="py-4 px-4 flex flex-col gap-5 bg-custom-gray-light/30 m-2">
            <li className="icon-before text-base text-custom-blue">
              A safe flight is better than a routine flight in a small airport.
            </li>
            <li className="icon-before text-base text-custom-blue">
              Flight rates and airport fees are quite reasonable.
            </li>
            <li className="icon-before text-base text-custom-blue">
              Less waiting time and cancellation risk than a standard flight.
            </li>
            <li className="icon-before text-base text-custom-blue">
              Due to bad weather and a canceled flight, it is possible to rebook
              the flight.
            </li>
            <li className="icon-before text-base text-custom-blue">
              The best excursion for doing photography and videography.
            </li>
            <li className="icon-before text-base text-custom-blue">
              Compared to a plane ride, this option is more convenient, fast,
              and affordable.
            </li>
            <li className="icon-before text-base text-custom-blue">
              A leisurely journey of the well-known Sherpa settlement, the
              colorful valley, the profound canyons, and the glaciers.
            </li>
            <li className="icon-before text-base text-custom-blue">
              During the trip, explore the magnificent aerial views of
              landscapes, lush woods, rivers, and waterfalls.
            </li>
            <li className="icon-before text-base text-custom-blue">
              Comfortable seats next to windows that offer a 360-degree view of
              the glistening Alps, including Nupla peak.
            </li>
            <li className="icon-before text-base text-custom-blue">
              Outstanding vistas of 18 distinct mountain ranges, including 4
              mountains that are over 8000 meters in height.
            </li>
          </ul>
        </div>
      </div> */}

      <div>
        <h3 className="text-2xl font-bold text-custom-blue">Description</h3>
        <div className="text-base parse-html text-custom-blue flex flex-col gap-4 mt-4">
          {parseHtml(data ?? '')}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-custom-blue">
          Quick Contact for Booking
        </h3>
        <p className="text-sm px-2.1 text-custom-blue/80 flex flex-col gap-5 sm:text-base">
          Call us {hotline} (24 Hrs Available on WhatsApp )
        </p>
      </div>
    </div>
  );
}
