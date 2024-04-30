"use client";
import PostList from "@/components/post-list";
import { title } from "@/components/primitives";
import { getPosts } from "@/lib/requests";
import { Button } from "@nextui-org/button";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function CodingPage() {
	const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
		queryKey: ["posts"],
		queryFn: getPosts,
		getNextPageParam: (lastPage) =>
		  lastPage.length < 9 ? undefined : lastPage[lastPage.length - 1].cursor,
		initialPageParam: "",
	  });

	return (
		<div>
			<h1 className={title({color: 'cyan'})}>Read my latest articles...</h1>
			<PostList data={data} />
			
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
	);
}
