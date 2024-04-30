"use client";

import { getPosts } from '@/lib/requests';
import { Button } from '@nextui-org/button';
import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, getKeyValue} from "@nextui-org/react";

const Posts = () => {
    const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
		queryKey: ["posts"],
		queryFn: getPosts,
		getNextPageParam: (lastPage) =>
		  lastPage.length < 9 ? undefined : lastPage[lastPage.length - 1].cursor,
		initialPageParam: "",
	  });
	  console.log(data?.pages, 'data')
	  const posts = data?.pages[0];
	  console.log(posts, 'posts')
    return (
        <>
			{
				posts?.map((post) => (
					<div key={post?.cursor}>
						<h3>{post?.node.title}</h3>
					</div>
				))
			}
			<Table>
				<TableBody
					isLoading={isFetching}
					items={data?.pages[0]}
					loadingContent={<Spinner color="white" />}
				>
					{(item: any) => (
					<TableRow key={item.name}>
						{(columnKey: any) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
					</TableRow>
					)}
				</TableBody>
			</Table>
            <div className="col-span-1 lg:col-span-3 w-full flex justify-center my-5">
				<Button
					className="w-full"
					variant="bordered"
					disabled={!hasNextPage || isFetching}
					onClick={() => fetchNextPage()}
				>
				{isFetching
					? "Loading..."
					: hasNextPage
					? "Load more"
					: "That's all for today!"}
				</Button>
      		</div>
        </>
    )
}

export default Posts;