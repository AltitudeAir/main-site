import { classNames } from '@/core/ui/components/CalendarPicker';
import Link from 'next/link';
import { SetStateAction } from 'react';

export type SubHeadings = Array<{
  id: number | string;
  name: string;
}>;

const SibeBarSubheadings = ({
  isActive,
  subHeadings,
  currentPath,
  subHeadingPath,
  setDrawer,
}: {
  isActive: boolean;
  setDrawer: (value: SetStateAction<boolean>) => void;
  subHeadings: SubHeadings;
  currentPath: string;
  subHeadingPath: string;
}) => {
  return (
    <ul className="ml-4 border-l-2 border-custom-blue/25 flex flex-col ">
      {isActive ? (
        subHeadings.map((item, index) => {
          return (
            <li
              key={index}
              className={classNames(
                `relative z-10 hover:bg-gray-500 hover:text-white py-2`,
                currentPath === `/${subHeadingPath}#${item.id}`
                  ? 'bg-custom-blue/95 text-white hover:bg-none'
                  : ''
              )}
            >
              <button
                role="button"
                onClick={() => setDrawer(false)}
                className="flex gap-2 items-center justify-start"
              >
                <div className="w-2 h-0 border-b-2  border-custom-blue/25"></div>
                <Link href={`${item.id}`} className=" text-start">
                  {item.name}
                </Link>
              </button>
            </li>
          );
        })
      ) : (
        <></>
      )}
    </ul>
  );
};

export default SibeBarSubheadings;
