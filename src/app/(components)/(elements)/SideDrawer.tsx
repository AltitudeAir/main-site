'use client';

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
import { useEffect, useState } from 'react';
import { ItemsData } from '../(modules)/MainMenu';

interface BlogCategoriesType {
  slug: string;
  name: string;
}

interface ChoppersType {
  id: number;
  name: string;
}

export default function SideDrawer({ show }: { show: boolean }) {
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

  const [blogsDropActive, setBlogsDrop] = useState(false);
  const [aboutDropActive, setAboutDrop] = useState(false);
  const [fleetsDropActive, setFleetsDrop] = useState(false);

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
              onClick={() => setAboutDrop(!aboutDropActive)}
            >
              <Link href={'/about'} className="flex items-center px-4 h-16">
                ABOUT
              </Link>
            </li>
            {aboutDropActive ? (
              [
                {
                  title: 'Overview',
                  link: '/about#overview',
                },
                {
                  title: 'Message From Executive Chairman',
                  link: '/about#message',
                },
                {
                  title: 'Board Of Directors',
                  link: '/about#board_info',
                },
                {
                  title: 'Crew',
                  link: '/about#crew',
                },
                {
                  title: 'Mission & Vision',
                  link: '/about#mission&vision',
                },
                {
                  title: 'Mission Statistics',
                  link: '/about#statistics',
                },
              ].map((item) => {
                return (
                  <li
                    key={item.title}
                    className={classNames(
                      `relative z-10 hover:bg-gray-500 hover:text-white`,
                      currentPath.startsWith(item.link)
                        ? 'bg-custom-blue/95 text-white hover:bg-none'
                        : ''
                    )}
                  >
                    <Link
                      href={item.link}
                      className="flex items-center h-14 px-4"
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })
            ) : (
              <></>
            )}
            <li
              className={classNames(
                `relative z-10 hover:bg-gray-500 hover:text-white`,
                currentPath.startsWith('/blog')
                  ? 'bg-custom-blue/85 text-white hover:bg-none'
                  : ''
              )}
              onClick={() => setBlogsDrop(!blogsDropActive)}
            >
              <Link href={'/blog'} className="flex items-center px-4 h-16">
                Our Services
              </Link>
            </li>
            {blogsDropActive ? (
              blogCategories?.results.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={classNames(
                      `relative z-10 hover:bg-gray-500 hover:text-white`,
                      currentPath === `/blog?category=${item.id}`
                        ? 'bg-custom-blue/95 text-white hover:bg-none'
                        : ''
                    )}
                  >
                    <Link
                      href={`/blog?category=${item.id}`}
                      className="flex items-center h-14 px-4"
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })
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
                currentPath === '/packages'
                  ? 'bg-custom-blue/85 text-white hover:bg-none'
                  : ''
              )}
            >
              <Link href={'/packages'} className="flex items-center px-4 h-16">
                PACKAGES
              </Link>
            </li>
            <li
              className={classNames(
                `relative z-10 hover:bg-gray-500 hover:text-white`,
                currentPath.startsWith('/description')
                  ? 'bg-custom-blue/85 text-white hover:bg-none'
                  : ''
              )}
              onClick={() => setFleetsDrop(!fleetsDropActive)}
            >
              <Link
                href={'/description'}
                className="flex items-center px-4 h-16"
              >
                FLEETS
              </Link>
            </li>
            {fleetsDropActive ? (
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
            )}
            <li
              className={classNames(
                `relative z-10 hover:bg-gray-500 hover:text-white`,
                currentPath === '/gallery'
                  ? 'bg-custom-blue/85 text-white hover:bg-none'
                  : ''
              )}
            >
              <Link href={'/gallery'} className="flex items-center px-4 h-16">
                GALLERY
              </Link>
            </li>
            <li
              className={classNames(
                `relative z-10 hover:bg-gray-500 hover:text-white`,
                currentPath === '/news'
                  ? 'bg-custom-blue/85 text-white hover:bg-none'
                  : ''
              )}
            >
              <Link href={'/news'} className="flex items-center px-4 h-16">
                NEWS
              </Link>
            </li>
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
