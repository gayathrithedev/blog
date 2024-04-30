import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { getPosts } from "@/lib/requests";
import { PostMetadata } from "@/lib/types";
import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
  } from "@tanstack/react-query";

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: {
		icon: "/favicon.ico",
	},
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
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
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
			>
				<HydrationBoundary state={dehydrate(queryClient)}>
					<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
						<div className="relative flex flex-col h-screen">
							<Navbar />
							<main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
								{children}
							</main>
							<footer className="w-full flex items-center justify-center py-3">
								<Link
									isExternal
									className="flex items-center gap-1 text-current"
									href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
									title="nextui.org homepage"
								>
									<span className="text-default-600">Powered by</span>
									<p className="text-primary">NextUI</p>
								</Link>
							</footer>
						</div>
					</Providers>
				</HydrationBoundary>
			</body>
		</html>
	);
}
