'use client';

import { aboutSubheadings } from '@/core/constants/appConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { PaginatedResponseType } from '@/core/types/responseTypes';
import { classNames } from '@/core/ui/components/CalendarPicker';
import axiosInstance from '@/core/utils/axoisInst';
import blogApi from '@/modules/blog/blogApi';
import { BlogCategoryType } from '@/modules/blog/blogType';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ItemsData } from '../(modules)/MainMenu';
import SibeBarSubheadings from './SideBarSubheadings';

interface BlogCategoriesType {
  slug: string;
  name: string;
}

interface ChoppersType {
  id: number;
  name: string;
}

export default function SideDrawer({
  show,
  setDrawer,
}: {
  show: boolean;
  setDrawer: Dispatch<SetStateAction<boolean>>;
}) {
  const dispatch = useAppDispatch();
  const currentPath = usePathname();
  const toggleOpen = 'left-0';
  const toggleClose = '-left-60';

  const [choppers, setChoppers] = useState<ChoppersType[] | undefined>();

  const menuItems = ItemsData;
  useEffect(() => {
    dispatch(blogApi.endpoints.getAllBlogCategory.initiate(1));
  }, [dispatch]);

  const blogCategories = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries['getAllBlogCategory(1)']
        ?.data as PaginatedResponseType<BlogCategoryType>
  );
  useEffect(() => {
    axiosInstance.get('/chopper/').then((item) => {
      const chopperList = item.data.data;
      setChoppers(chopperList);
    });
  }, []);

  const getCurrentTab = (currentPath: string) => {
    if (currentPath.includes('blog')) {
      return 'blog';
    }
    if (currentPath.includes('about')) {
      return 'about';
    }
    if (currentPath.includes('description')) {
      return 'description';
    }
    return undefined;
  };

  // const [blogsDropActive, setBlogsDrop] = useState(false);
  // const [aboutDropActive, setAboutDrop] = useState(false);
  // const [fleetsDropActive, setFleetsDrop] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'blog' | 'about' | 'description' | undefined
  >(getCurrentTab(currentPath));

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-screen w-full z-0 bg-black/75 transition-all delay-300 ${show ? 'fixed ' : 'hidden'}`}
      ></div>
      <div
        className={`fixed top-0 max-w-60 w-full h-screen transition-all delay-300 ease-in-out bg-white/90 backdrop-blur-2xl ${show ? toggleOpen : toggleClose}`}
      >
        <div className="bg-white w-full flex justify-center">
          <Link href="/" className="flex items-center relative h-16 w-16">
            <Image
              alt="altitude-air-logo"
              src="/images/inverse-logo.webp"
              width={100}
              height={100}
              quality={75}
              sizes="(max-width: 768px) 75vw, 33vw"
              className="object-contain"
            />
          </Link>
        </div>
        <nav className="bg-white h-full overflow-x-scroll">
          <ul className="flex flex-col">
            <li
              className={classNames(
                `relative z-10`,
                currentPath.startsWith('/about')
                  ? 'bg-custom-blue/85 text-white'
                  : ''
              )}
              onClick={() => {
                setDrawer(false);
              }}
            >
              <Link href={'/about'} className="flex items-center px-4 h-16">
                ABOUT
              </Link>
            </li>
            <SibeBarSubheadings
              setDrawer={setDrawer}
              subHeadingPath="about"
              currentPath={currentPath}
              isActive={currentPath.includes('about')}
              subHeadings={aboutSubheadings.map((item) => {
                return { id: item.link, name: item.title };
              })}
            />
            <li
              className={classNames(
                `relative z-10 hover:bg-gray-500 hover:text-white`,
                currentPath === '/packages'
                  ? 'bg-custom-blue/85 text-white hover:bg-none'
                  : ''
              )}
              onClick={() => {
                setDrawer(false);
              }}
            >
              <Link href={'/packages'} className="flex items-center px-4 h-16">
                PACKAGES
              </Link>
            </li>
            <li
              className={classNames(
                `relative z-10 hover:bg-gray-500 hover:text-white`,
                currentPath.startsWith('/blog')
                  ? 'bg-custom-blue/85 text-white hover:bg-none'
                  : ''
              )}
              onClick={() => {
                setDrawer(false);
              }}
            >
              <Link href={'/blog'} className="flex items-center px-4 h-16">
                OUR SERVICES
              </Link>
            </li>
            {blogCategories ? (
              <SibeBarSubheadings
                setDrawer={setDrawer}
                subHeadingPath="blog"
                currentPath={currentPath}
                isActive={currentPath.includes('blog')}
                subHeadings={blogCategories.results.map((item) => {
                  return { id: `blog#${item.id}`, name: item.name };
                })}
              />
            ) : (
              <></>
            )}

            <li
              className={classNames(
                `relative z-10 hover:bg-gray-500 hover:text-white`,
                currentPath === '/voluntary-hazard-report'
                  ? 'bg-custom-blue/85 text-white hover:bg-none'
                  : ''
              )}
              onClick={() => {
                setDrawer(false);
              }}
            >
              <Link
                href={'/voluntary-hazard-report'}
                className="flex items-center px-4 h-16"
              >
                VOLUNTARY HAZARD
              </Link>
            </li>

            <li
              className={classNames(
                `relative z-10 hover:bg-gray-500 hover:text-white`,
                currentPath.startsWith('/description')
                  ? 'bg-custom-blue/85 text-white hover:bg-none'
                  : ''
              )}
              onClick={() => {
                // setActiveTab('description');
                setDrawer(false);
              }}
            >
              <Link
                href={'/description'}
                className="flex items-center px-4 h-16"
              >
                FLEETS
              </Link>
            </li>
            {choppers ? (
              <SibeBarSubheadings
                setDrawer={setDrawer}
                subHeadingPath="description"
                currentPath={currentPath}
                isActive={currentPath.includes('description')}
                subHeadings={choppers.map((item) => {
                  return { id: `/description#${item.id}`, name: item.name };
                })}
              />
            ) : (
              <></>
            )}
            {/* {fleetsDropActive ? (
              choppers?.map((item) => {
                return (
                  <li
                    key={item.name}
                    className={classNames(
                      `relative z-10 hover:bg-gray-500 hover:text-white`,
                      currentPath === `/description/${item.id}`
                        ? 'bg-custom-blue/95 text-white hover:bg-none'
                        : ''
                    )}
                  >
                    <Link
                      href={`/description/${item.id}`}
                      className="flex items-center h-14 px-4"
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })
            ) : (
              <></>
            )} */}
            {/* <li
              className={classNames(
                `relative z-10 hover:bg-gray-500 hover:text-white`,
                currentPath === '/gallery'
                  ? 'bg-custom-blue/85 text-white hover:bg-none'
                  : ''
              )}
              onClick={() => {
                setDrawer(false);
              }}
            >
              <Link href={'/gallery'} className="flex items-center px-4 h-16">
                GALLERY
              </Link>
            </li> */}
            {/* <li
              className={classNames(
                `relative z-10 hover:bg-gray-500 hover:text-white`,
                currentPath === '/news'
                  ? 'bg-custom-blue/85 text-white hover:bg-none'
                  : ''
              )}
              onClick={() => {
                setDrawer(false);
              }}
            >
              <Link href={'/news'} className="flex items-center px-4 h-16">
                NEWS
              </Link>
            </li> */}
            <li
              className={classNames(
                `relative z-10 hover:bg-gray-500 hover:text-white`,
                currentPath === '/contact'
                  ? 'bg-custom-blue/85 text-white hover:bg-none'
                  : ''
              )}
            >
              <Link href={'/contact'} className="flex items-center px-4 h-16">
                CONTACT
              </Link>
            </li>
          </ul>
        </nav>
        {menuItems && menuItems.length > 0 ? (
          <nav className="bg-white h-full overflow-x-scroll">
            <ul className="flex flex-col gap-3">
              {menuItems.map((item, index) => (
                <li key={index} className={`relative z-10`}>
                  <Link
                    href={item.link ?? '#'}
                    className="flex items-center px-4 h-16"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
    </>
  );
}
