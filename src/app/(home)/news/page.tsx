'use client';
import NewsItem, {
  NewsItemProps,
} from '@/app/(components)/(elements)/NewsItem';
import axiosInstance from '@/core/utils/axoisInst';
import { dateFromSqlDateTime } from '@/core/utils/helper';
import { useEffect, useState } from 'react';

export default function News() {
  const [news, setNews] = useState<NewsItemProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsResponse = await axiosInstance.get('/news/');
        setNews(newsResponse.data.data);
      } catch (error) {
        setError('Error fetching data');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <main className="news-main">
      <div className="featured-img">
        <div className="fading-bottom" />
        <h1>Recent News & Events</h1>
      </div>
      <section className="news-section">
        <div className="container mx-auto">
          <h2 className="text-center text-xl font-bold mb-10">IN THE NEWS</h2>
          {/* <div className="flex justify-start items-stretch flex-wrap">
            {news.map((item, index) => {
              return (
                <div className="basis-full md:basis-1/3" key={index}>
                  <NewsItem
                    id={item.id}
                    publisher={item.publisher}
                    title={item.title}
                    description={item.description}
                    date={dateFromSqlDateTime(item.date)}
                  />
                </div>
              );
            })}
          </div> */}
          <div className="grid grid-cols-12 gap-6 max-w-6xl mx-auto my-5">
            {news.map((item, index) => {
              return (
                <NewsItem
                  key={index}
                  id={item.id}
                  publisher={item.publisher}
                  title={item.title}
                  description={item.description}
                  date={dateFromSqlDateTime(item.date)}
                />
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

// export async function getStaticProps() {
//   let news;
//   try {
//     news = await axiosInstance.get("/news/");
//   } catch (error) {

//   }

//   return {
//     props: {
//       newsList: news ? news.data.data : [],
//     },
//     revalidate: 30,
//   }
// }
