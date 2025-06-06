import { followKeys } from '@/app/actions/keys';
import { FollowListParams } from '@/types/api/follow';
import { useInfiniteQuery } from '@tanstack/react-query';

async function fetchFollowers({ userId, currentPage, pageSize }: FollowListParams) {
  const res = await fetch(
    `/api/followers?userId=${userId}&currentPage=${currentPage}&pageSize=${pageSize}`
  );
  const data = await res.json();
  return data;
}

export default function useFollowers({ userId, currentPage = 1, pageSize = 10 }: FollowListParams) {
  return useInfiniteQuery({
    queryKey: followKeys.followerList({ userId, currentPage, pageSize }),
    queryFn: async ({ pageParam }) =>
      await fetchFollowers({ ...pageParam, userId, currentPage, pageSize }),
    initialPageParam: { currentPage: 1 },
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.meta.pagination;
      const nextPage = currentPage + 1;
      return nextPage <= totalPages ? { currentPage: nextPage } : null;
    },
  });
}
