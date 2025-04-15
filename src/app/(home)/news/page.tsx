import NewsItem from '@/app/(components)/(elements)/NewsItem';
import { fetchData } from '@/core/api/api_client';
import { apiPaths } from '@/core/api/apiConstants';
import { customMetaDataGenerator } from '@/core/helpers/customMetaDataGenerator';
import { ObjectResponseType } from '@/core/types/responseTypes';
import { NewsDataType } from '@/modules/news/newsType';
import { Metadata } from 'next';

export const metadata: Metadata = customMetaDataGenerator({
  title: 'News',
  description: 'Recent News & Events in Altitude air Neapl',
  ogImage1: 'https://altitudeairnepal.com/images/resized-images/News.webp',
  ogImage2: 'https://altitudeairnepal.com/images/resized-images/News.webp',
});
export default async function NewsList() {
  const { data: newsData, error: newsMessageDataError } = await fetchData<
    ObjectResponseType<NewsDataType[]>
  >(apiPaths.getNewsUrl);
  return (
    <main className="news-main">
      <div className="relative featured-img">
        <h1>Recent News & Events</h1>
        <div className="absolute bottom-0 left-0 top-0 right-0 bg-gradient-to-t from-custom-blue to-transparent"></div>
      </div>
      <section className="news-section">
        <div className="container mx-auto">
          <h2 className="text-center text-xl font-bold mb-10">IN THE NEWS</h2>
          <div className="grid px-3 sm:px-0 grid-cols-12 gap-y-10 gap-x-0 sm:gap-x-10 max-w-6xl mx-auto my-5">
            {!newsMessageDataError &&
              (newsData?.data && newsData.data.length > 0 ? (
                newsData.data.map((item: any) => (
                  <NewsItem key={item.id} data={item} />
                ))
              ) : (
                <div className="col-span-12 text-center">
                  <h3 className="border-2 border-dashed mx-auto max-w-xs text-custom-gray-light text-sm font-semibold bg-custom-gray py-2">
                    No Major News to Report at This Time
                  </h3>
                </div>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
