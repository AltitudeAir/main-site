import { fetchData } from '@/core/api/api_client';
import { apiPaths } from '@/core/api/apiConstants';
import { customMetaDataGenerator } from '@/core/helpers/customMetaDataGenerator';
import { PaginatedResponseType } from '@/core/types/responseTypes';
import { BlogType } from '@/modules/servicess/servicessType';
import { Metadata } from 'next';
import BlogItem from './(components)/BlogItem';
import Title from './(components)/Title';

export const metadata: Metadata = customMetaDataGenerator({
  title: 'Our Services',
  description:
    'We are the first aviators in Nepal to bring an Airbus Helicopter for commercial operation',
  ogImage1: 'https://altitudeairnepal.com/images/resized-images/Services.JPG',
  ogImage2: 'https://altitudeairnepal.com/images/resized-images/Services.JPG',
});
export default async function Blog() {
  const { data: blogData, error: blogDataError } = await fetchData<
    PaginatedResponseType<BlogType>
  >(apiPaths.blogUrl);

  return (
    <main className="blog-main pb-10 ">
      <Title />
      {/* {loading && <div className="loader" />} */}
      <div className="blog-item-list " id="blog">
        {!blogDataError &&
          blogData?.results?.map((item, index) => (
            <BlogItem
              blogCategory={item.blogCategory.toString()}
              key={index}
              id={item.id.toString()}
              direction={index % 2 === 0 ? 'right' : 'left'}
              title={item.title}
              description={item.description}
              date={item.date}
              coverImage={item.coverImage}
            />
          ))}
      </div>
    </main>
  );
}
