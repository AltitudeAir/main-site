'use client';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import axiosInstance from '@/core/utils/axoisInst';
import { constants } from '@/core/utils/constants';
import { parseHtml } from '@/core/utils/helper';
import blogApi from '@/modules/blog/blogApi';
import { BlogType } from '@/modules/blog/blogType';
import Link from 'next/dist/client/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BlogItemType } from '../(components)/BlogItem';

export default function BlogItem() {
  const router = useRouter();
  const param = useParams();
  const blogId = param.blogId as string;
  const dispatch = useAppDispatch();
  const [url, setUrl] = useState('');
  const [news, setNews] = useState<BlogItemType[]>([]);

  console.log(param, 'param');

  // const [blogItem, setBlogItem] = useState<BlogItemType>({
  //   id: null,
  //   title: '',
  //   description: '',
  //   content: '',
  //   direction: '',
  //   date: null,
  //   publisher: '',
  //   coverImage: '',
  //   blogCategory: null,
  // });

  useEffect(() => {
    dispatch(blogApi.endpoints.getEachBlog.initiate(parseInt(blogId)));
  }, [dispatch, blogId]);

  const blogItem = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getEachBlog-${blogId}`]?.data as BlogType
  );

  // console.log(blogId, 'blogId');
  useEffect(() => {
    axiosInstance
      .get('/news/latest/3/')
      .then((item) => {
        setNews(item.data.data);
      })
      .catch((err) => {});
    setUrl(window.location.origin + '/blog/' + param.slug);
  }, [param.slug, router]);

  function sharePopup(url: string) {
    window.open(
      url,
      'myWindow',
      'status = 1, height = 500, width = 360, resizable = 0'
    );
  }

  return (
    // <Layout>
    //     <Head>
    //         <title>{blogItem.title}</title>
    //         <meta property="og:title" content={blogItem.title} />
    //         <meta property="og:type" content="article" />
    //         <meta
    //             property="og:image"
    //             content={constants.baseUrl + blogItem.coverImage}
    //         />
    //         <meta property="og:description" content={blogItem.description} />
    //         <meta property="description" key="description" content={blogItem.description} />

    //         <meta property="og:url" content={url} />
    //     </Head>
    <>
      <main className="blog_item_main">
        <div className="featured-img relative">
          <Image
            src={blogItem?.coverImage as string}
            alt="cover-image"
            width={100}
            height={100}
            quality={75}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            // onError={(e) => {
            //   const target = e.currentTarget as HTMLImageElement;
            //   target.src =
            //     constants.baseUrl + '/images/errors/placeholder.webp';
            // }}
          />
          <div className="fading-bottom" />
        </div>
        <section className="blog_item_section">
          <article>
            <h2>{blogItem?.title}</h2>
            <div className="socials_container">
              <a
                rel="noreferrer"
                href="#"
                onClick={() =>
                  sharePopup(`https://www.facebook.com/sharer.php?u=${url}`)
                }
              >
                {/* <FontAwesomeIcon className="icon" icon={faFacebookSquare} /> */}
              </a>
              <a
                rel="noreferrer"
                href="#"
                onClick={() =>
                  sharePopup(
                    `https://twitter.com/share?url=${url}&text=${blogItem.title}`
                  )
                }
              >
                {/* <FontAwesomeIcon className="icon" icon={faTwitterSquare} /> */}
              </a>
              <a
                rel="noreferrer"
                href="#"
                onClick={() =>
                  sharePopup(
                    `https://www.linkedin.com/shareArticle?url=${url}&title=${blogItem.title}`
                  )
                }
              >
                {/* <FontAwesomeIcon className="icon" icon={faLinkedin} /> */}
              </a>
            </div>

            {parseHtml(blogItem?.content ?? '')}
          </article>
          <aside>
            <div className="relative">
              <Image
                src="/icons/recent.svg"
                alt=""
                className="recent_svg"
                width={100}
                height={100}
                quality={75}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            <h2 className="recent_h2">Recent Articles</h2>

            {news &&
              news.map((item, index) => {
                return (
                  <div className="flex gap-2 recent_news_wrapper" key={index}>
                    <div className="basis-2/5 shrink-0 image_container relative w-20">
                      <Image
                        src={constants.baseUrl + item.coverImage}
                        alt="News item"
                        onError={(e) => {
                          e.currentTarget.src =
                            '/images/errors/placeholder.webp';
                        }}
                        height={100}
                        width={100}
                        quality={75}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="grow text_container">
                      <Link href={`/news/${item.id}`}>
                        <h3>{item.title}</h3>
                      </Link>
                      <p>{parseHtml(item.description ?? '') + ' '}</p>
                    </div>
                  </div>
                );
              })}
          </aside>
        </section>
      </main>
    </>

    // </Layout>
  );
}
