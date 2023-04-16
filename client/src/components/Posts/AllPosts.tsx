import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react';
import { getAllPostsAPI } from '../../apis/post';
import { axiosInstance, baseURL } from '../../configs/axios';
import { useInView } from 'react-intersection-observer';
import Posts from './Posts';

function AllPosts() {
  const { ref, inView } = useInView();
  const { data: allPosts } = getAllPostsAPI();

  const queryKey = `${baseURL}/posts`;

  const {
    status,
    data: infiniteData,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery(
    [queryKey],
    async ({ pageParam = 2 }) => {
      const res = await axiosInstance.get(`/posts?page=${pageParam}`);
      return res.data;
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        console.log('lastPage>>>', lastPage);
        console.log('allPages>>>', allPages);

        if (!lastPage) {
          return allPages.length + 1;
        } else {
          return undefined;
        }
      },
    }
    // {
    //   getNextPageParam: (lastPage, allPages) => {
    //     const nextPage = allPages.length + 1;
    //     return nextPage;
    //   },
    // }
  );
  console.log('무한 스크롤 data>>>', infiniteData);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  if (status === 'loading') {
    <p>Loading...</p>;
  } else if (status === 'error') {
    <span>에러입니다.</span>;
  }

  return (
    <div>
      {infiniteData?.pages.map((page) => {
        return page.map((post: any, pageIndex: number) => {
          return <Posts post={post} key={post.identifier} />;
        });
      })}

      {/* {infiniteData?.pages.map((page, pageIndex) => {
        return page.map((post: any, postIndex: number) => {
          const isLastPost =
            infiniteData.pages.length === pageIndex + 1 &&
            page.length === postIndex + 1;
          return (
            <div ref={isLastPost ? ref : undefined} key={post.identifier}>
              <Posts post={post} />
            </div>
          );
        });
      })} */}
    </div>
  );
}

export default AllPosts;

{
  /* {allPosts?.map((post: any) => {
        return <Posts post={post} key={post.identifier} />;
      })} */
}
