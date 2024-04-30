export default function AboutLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col items-center justify-start">
			<div>
				{children}
			</div>
		</section>
	);
}
