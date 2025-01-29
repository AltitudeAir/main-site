'use client';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { PaginatedResponseType } from '@/core/types/responseTypes';
import axiosInstance from '@/core/utils/axoisInst';
import blogApi from '@/modules/blog/blogApi';
import { BlogCategoryType } from '@/modules/blog/blogType';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import SideDrawer from '../(elements)/SideDrawer';

interface ChoppersType {
  id: number;
  name: string;
}

export default function Header() {
  const [drawer, setDrawer] = useState(false);
  const dispatch = useAppDispatch();
  const [choppers, setChoppers] = useState<ChoppersType[] | undefined>();

  const showDrawerHandler = () => {
    setDrawer(true);
  };
  const hideDrawerHandler = () => {
    setDrawer(false);
  };

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

  return (
    <header>
      <nav
        className={`header_nav items-stretch ${drawer ? 'header_hide' : ''}`}
      >
        <div className="header_logo_container">
          <Link href="/" className="block relative">
            <Image
              alt="altitude-air-logo"
              src="/images/inverse-logo.webp"
              width={100}
              height={100}
              quality={75}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Link>
        </div>
        <div className="nav_links_container">
          <ul>
            <li className="header_li">
              <Link href={'/about'} className="header_link">
                ABOUT
              </Link>

              <div className="sub_menu">
                <ul>
                  <li>
                    <Link href={'/about#overview'}>Overview</Link>
                  </li>
                  <li>
                    <Link href={'/about#message'}>
                      Message From Executive Chairman
                    </Link>
                  </li>
                  <li>
                    <Link href={'/about#board_info'}>Board Of Directors</Link>
                  </li>
                  <li>
                    <Link href={'/about#crew'}>Crew</Link>
                  </li>
                  <li>
                    <Link href={'/about#statistics'}>Mission Statistics</Link>
                  </li>

                  <li>
                    <Link href={'/about#mission&vision'}>Mission & Vision</Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="header_li">
              <Link href={'/blog'} className="header_link">
                Our Services
              </Link>

              <div className="sub_menu">
                <ul>
                  {blogCategories &&
                    blogCategories?.results.map((item, index) => {
                      return (
                        <li key={index}>
                          <Link href={`/blog?category=${item.id}`}>
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </li>

            <li className="header_li">
              <Link href={'/voluntary-hazard-report'} className="header_link">
                VOLUNTARY HAZARD
              </Link>
            </li>

            <li className="header_li ">
              <Link href={'/description'} className="header_link">
                FLEETS
              </Link>
              <div className="sub_menu">
                <ul>
                  {choppers &&
                    choppers.map((item) => {
                      return (
                        <li key={item.id}>
                          <Link href={`/description/${item.id}`}>
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </li>

            <li className="header_li">
              <Link href={'/gallery'} className="header_link">
                GALLERY
              </Link>
            </li>
            <li className="header_li">
              <Link href="/news" className="header_link">
                NEWS
              </Link>
            </li>
            <li className="header_li">
              <Link href="/contact" className="header_link">
                CONTACT
              </Link>
            </li>
          </ul>
        </div>
        <div className="hamburger_container" onClick={showDrawerHandler}>
          <div />
          <div />
          <div />
        </div>
      </nav>
      {/* {drawer ? <SideDrawer show={drawer} close={hideDrawerHandler} /> : null} */}
      {drawer ? <SideDrawer show={drawer} /> : null}
    </header>
  );
}
