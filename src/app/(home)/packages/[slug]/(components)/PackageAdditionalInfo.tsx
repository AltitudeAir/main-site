import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import packagesApi from '@/modules/packages/packagesApi';
import { PackagesDataType } from '@/modules/packages/packagesType';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { GiPathDistance } from 'react-icons/gi';
import { HiOutlineUserGroup } from 'react-icons/hi2';
import { IoLocationOutline, IoTimeOutline } from 'react-icons/io5';

export default function PackageAdditionalInfo() {
  const router = useRouter();
  const param = useParams();
  const slug = param.slug as string;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(packagesApi.endpoints.getEachPackage.initiate(slug));
  }, [dispatch, slug]);

  const packageItem = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getEachPackage("${slug}")`]
        ?.data as PackagesDataType
  );

  return (
    <div className="border-2 border-dashed border-custom-gray-light">
      <div className="grid grid-cols-12 place-content-center gap-5 bg-custom-gray-light/30 p-5 m-2">
        <div className="col-span-6 md:col-span-4">
          <div className="flex items-center gap-2">
            <IoTimeOutline size={35} className="text-custom-blue" />
            <div className="flex flex-col items-start justify-center">
              <p className="text-sm text-custom-blue capitalize font-normal">
                Duration
              </p>
              <p className="text-base text-custom-blue font-semibold">
                {packageItem?.duration}
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-6 md:col-span-4">
          <div className="flex items-center gap-2">
            <IoLocationOutline size={35} className="text-custom-blue" />
            <div className="flex flex-col items-start justify-center">
              <p className="text-sm text-custom-blue capitalize font-normal">
                Destination
              </p>
              <p className="text-base text-custom-blue font-semibold">
                {packageItem?.address}
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-6 md:col-span-4">
          <div className="flex items-center gap-2">
            <GiPathDistance size={35} className="text-custom-blue" />
            <div className="flex flex-col items-start justify-center">
              <p className="text-sm text-custom-blue capitalize font-normal">
                Starts At
              </p>
              <p className="text-base text-custom-blue font-semibold">
                Kathmandu
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-6 md:col-span-4">
          <div className="flex items-center gap-2">
            <GiPathDistance size={35} className="text-custom-blue" />
            <div className="flex flex-col items-start justify-center">
              <p className="text-sm text-custom-blue capitalize font-normal">
                Ends At
              </p>
              <p className="text-base text-custom-blue font-semibold">
                {packageItem?.title}
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-6 md:col-span-4">
          <div className="flex items-center gap-2">
            <HiOutlineUserGroup size={35} className="text-custom-blue" />
            <div className="flex flex-col items-start justify-center">
              <p className="text-sm text-custom-blue capitalize font-normal">
                Group Size
              </p>
              <p className="text-base text-custom-blue font-semibold">
                {packageItem?.max_size}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
