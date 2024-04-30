import { title } from "@/components/primitives";
import { getPosts } from "@/lib/requests";
import { PostMetadata } from "@/lib/types";
import { QueryClient, HydrationBoundary, dehydrate, QueryClientProvider } from "@tanstack/react-query";
import Posts from "@/components/posts";


export default async function CodingPage() {
	const queryClient = new QueryClient();

	await queryClient.prefetchInfiniteQuery({
	  queryKey: ["posts"],
	  queryFn: getPosts,
	  getNextPageParam: (
		lastPage: {
		  node: PostMetadata;
		  cursor: string;
		}[]
	  ) =>
		lastPage.length < 9 ? undefined : lastPage[lastPage.length - 1].cursor,
	  initialPageParam: "",
	});
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<div>
				<h1 className={title({color: 'cyan'})}>Read my latest articles...</h1>
				<Posts />
			</div>
		</HydrationBoundary>
		
	);
}
