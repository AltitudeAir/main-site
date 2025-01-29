'use client';
import { useAppDispatch } from '@/core/redux/clientStore';
import { useAppSelector } from '@/core/redux/hooks';
import { RootState } from '@/core/redux/store';
import { PaginatedResponseType } from '@/core/types/responseTypes';
import axiosInstance from '@/core/utils/axoisInst';
import blogApi from '@/modules/blog/blogApi';
import { BlogType } from '@/modules/servicess/servicessType';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import MenuItems from './MenuItems';

export const ItemsData = [
  {
    title: 'ABOUT',
    link: '/about',
    sub_menu: [
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
    ],
  },
  {
    title: 'AREA OF OPERATION',
    link: '/blog',
    sub_menu: [
      {
        title: 'Overview',
        link: '/about#overview',
      },
    ],
  },
  {
    title: 'VOLUNTARY HAZARD',
    link: '/voluntary-hazard-report',
  },
  {
    title: 'PACKAGES',
    link: '/packages',
  },
  {
    title: 'FLEETS',
    link: '/description',
    sub_menu: [
      {
        title: 'Overview',
        link: '/about#overview',
      },
      {
        title: 'Message From Executive Chairman',
        link: '/about#message',
      },
    ],
  },
  {
    title: 'GALLERY',
    link: '/gallery',
  },
  {
    title: 'NEWS',
    link: '/news',
  },
  {
    title: 'CONTACT',
    link: '/contact',
  },
];

interface ChoppersType {
  id: number;
  name: string;
}

const MainMenu = () => {
  const currentPath = usePathname();
  const dispatch = useAppDispatch();

  const [choppers, setChoppers] = useState<ChoppersType[] | undefined>();

  const [navItems, setNavItems] = useState([
    {
      title: 'GALLERY',
      link: '/gallery',
    },
    {
      title: 'Article',
      link: '/news',
    },
    {
      title: 'CONTACT',
      link: '/contact',
    },
  ]);
  useEffect(() => {
    dispatch(blogApi.endpoints.getAllBlog.initiate(1));
  }, [dispatch]);

  const blogCategories = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries['getAllBlog(1)']
        ?.data as PaginatedResponseType<BlogType>
  );
  useEffect(() => {
    axiosInstance.get('/chopper/').then((item) => {
      const chopperList = item.data.data;
      setChoppers(chopperList);
    });
  }, []);

  const navActiveClass =
    'before:bg-white before:border-l-4 before:border-custom-blue';
  const navHoverClass =
    'before:absolute before:w-full before:h-full before:top-0 before:left-0 hover:before:bg-white/60 before:-skew-x-12 before:-z-10';
  return (
    <nav className="hidden lg:block">
      <ul className="flex justify-end h-full uppercase text-xs font-semibold text-custom-blue">
        <MenuItems>
          <li
            className={`relative px-5 group ${navHoverClass} ${currentPath === '/about' ? navActiveClass : ''}`} // add active class letter
          >
            <Link href={'/about'} className="flex items-center h-full">
              ABOUT
            </Link>
            <div className="hidden group-hover:block group-hover:shadow absolute top-full -left-[6px] min-w-full w-max bg-custom-blue/90">
              <ul className="flex flex-col justify-end h-full uppercase text-xs font-semibold text-white">
                {[
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
                ].map((subItem, subIndex) => (
                  <li
                    key={subIndex}
                    className="relative hover:bg-custom-primary/30 before:absolute before:top-0 before:left-0 hover:before:bottom-0 hover:before:w-2 before:bg-custom-primary"
                  >
                    <Link
                      href={subItem.link}
                      className="flex items-center h-full py-2 px-3"
                    >
                      {subItem.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </MenuItems>

        <MenuItems>
          <li
            className={`relative px-5 group ${navHoverClass} ${currentPath.startsWith('/blog') ? navActiveClass : ''}`} // add active class letter
          >
            <Link href={'/blog'} className="flex items-center h-full">
              OUR SERVICES
            </Link>
            <div className="hidden group-hover:block group-hover:shadow absolute top-full -left-[6px] min-w-full w-max bg-custom-blue/90">
              <ul className="flex flex-col justify-end h-full uppercase text-xs font-semibold text-white">
                {blogCategories &&
                  blogCategories?.results.map((subItem, index) => (
                    <li
                      key={index}
                      className="relative hover:bg-custom-primary/30 before:absolute before:top-0 before:left-0 hover:before:bottom-0 hover:before:w-2 before:bg-custom-primary"
                    >
                      <Link
                        href={`/blog#${subItem.id}`}
                        className="flex items-center h-full py-2 px-3"
                      >
                        {subItem.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </li>
        </MenuItems>

        <MenuItems>
          <li
            className={`relative px-5 group ${navHoverClass} ${currentPath.startsWith('/description') ? navActiveClass : ''}`} // add active class letter
          >
            <Link href={'/description'} className="flex items-center h-full">
              FLEETS
            </Link>
            <div className="hidden group-hover:block group-hover:shadow absolute top-full -left-[6px] min-w-full w-max bg-custom-blue/90">
              <ul className="flex flex-col justify-end h-full uppercase text-xs font-semibold text-white">
                {choppers &&
                  choppers.map((subItem, subIndex) => (
                    <li
                      key={subIndex}
                      className="relative hover:bg-custom-primary/30 before:absolute before:top-0 before:left-0 hover:before:bottom-0 hover:before:w-2 before:bg-custom-primary"
                    >
                      <Link
                        href={`/description/${subItem.id}`}
                        className="flex items-center h-full py-2 px-3"
                      >
                        {subItem.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </li>
        </MenuItems>
        <MenuItems>
          <li
            className={`relative px-5 group ${navHoverClass} ${currentPath === '/news' ? navActiveClass : ''}`} // add active class letter
          >
            <Link href={'/news'} className="flex items-center h-full">
              ARTICLE
            </Link>
          </li>
        </MenuItems>
        <MenuItems>
          <li
            className={`relative px-5 group ${navHoverClass} ${currentPath === '/gallery' ? navActiveClass : ''}`} // add active class letter
          >
            <Link href={'/gallery'} className="flex items-center h-full">
              GALLERY
            </Link>
          </li>
        </MenuItems>
        <MenuItems>
          <li
            className={`relative px-5 group ${navHoverClass} ${currentPath === '/voluntary-hazard-report' ? navActiveClass : ''}`} // add active class letter
          >
            <Link
              href={'/voluntary-hazard-report'}
              className="flex items-center h-full"
            >
              VOLUNTARY HAZARD
            </Link>
          </li>
        </MenuItems>

        {/* <MenuItems>
          <li
            className={`relative px-5 group ${navHoverClass} ${currentPath === '/packages' ? navActiveClass : ''}`} // add active class letter
          >
            <Link href={'/packages'} className="flex items-center h-full">
              PACKAGES
            </Link>
          </li>
        </MenuItems> */}

        <MenuItems>
          <li
            className={`relative px-5 group ${navHoverClass} ${currentPath === '/contact' ? navActiveClass : ''}`} // add active class letter
          >
            <Link href={'/contact'} className="flex items-center h-full">
              CONTACT
            </Link>
          </li>
        </MenuItems>
      </ul>
    </nav>
  );
};

export default MainMenu;

{
  /* <li className={`relative px-5 ${navHoverClass}`}>
<a href="#" className="flex items-center h-full">
About
</a>
</li>
<li className={`relative px-5 ${navActiveClass} ${navHoverClass}`}>
<a href="#" className="flex items-center h-full">
Area of Operation
</a>
</li>
<li className={`relative px-5 ${navHoverClass}`}>
<a href="#" className="flex items-center h-full">
Voluntary Hazard
</a>
</li>
<li className={`relative px-5 ${navHoverClass}`}>
<a href="#" className="flex items-center h-full">
Fleets
</a>
</li>
<li className={`relative px-5 ${navHoverClass}`}>
<a href="#" className="flex items-center h-full">
Gallery
</a>
</li>
<li className={`relative px-5 ${navHoverClass}`}>
<a href="#" className="flex items-center h-full">
News
</a>
</li>
<li className={`relative px-5 ${navHoverClass}`}>
<a href="#" className="flex items-center h-full">
Contact
</a>
</li> */
}
