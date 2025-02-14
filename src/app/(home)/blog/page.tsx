'use client';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { PaginatedResponseType } from '@/core/types/responseTypes';
import blogApi from '@/modules/blog/blogApi';
import { BlogType } from '@/modules/servicess/servicessType';
import { useEffect } from 'react';
import BlogItem from './(components)/BlogItem';
import Title from './(components)/Title';

export default function Blog() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(blogApi.endpoints.getAllBlog.initiate(1));
  }, [dispatch]);

  const blogs = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries['getAllBlog(1)']
        ?.data as PaginatedResponseType<BlogType>
  );

  console.log(blogs, 'blogs datat');
  return (
    <main className="blog-main pb-10 ">
      <Title />
      {/* {loading && <div className="loader" />} */}
      <div className="blog-item-list " id="blog">
        {blogs?.results?.map((item, index) => (
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
