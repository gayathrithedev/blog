"use client";

import { getPosts } from '@/lib/requests';
import { Button } from '@nextui-org/button';
import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";


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
        <div className="pt-8">
			{
				posts?.map((post) => (
					<Card className="mb-4" key={post.cursor}>
						<CardHeader className="flex gap-3">
							<Image
							alt="Post"
							height={50}
							radius="sm"
							src={post?.node?.coverImage?.url}
							width={100}
							/>
							<div className="flex flex-col">
							<p className="text-md">{post?.node?.title}</p>
							<p className="text-small text-default-500">{post?.node?.subtitle}</p>
							</div>
						</CardHeader>
						{/* <Divider/> */}
						<CardFooter className='flex flex-row justify-between pt-0'>
							<div>
								<p className="text-small text-default-500">{post?.node?.views} views</p>
							</div>
							<div>
								<Link
									isExternal
									showAnchorIcon
									href={post?.node?.subtitle}
									className="pr-4 text-small"
								>
									GitHub
								</Link>
								<Link
									showAnchorIcon
									href={post?.node?.url}
									className="text-small"
								>
									View Post
								</Link>
							</div>
						</CardFooter>
					</Card>

				))
			}
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
        </div>
    )
}

export default Posts;