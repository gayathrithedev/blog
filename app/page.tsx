import { subtitle, title } from "@/components/primitives";
import clsx from "clsx";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 
					className={title({size: "sm", color: 'pink'})}>Hello&nbsp;</h1>
				<h1 className={title({ size: "sm", color: "violet" })}> 👋&nbsp;</h1>
				<br />
				<h2 className={subtitle({ class: "mt-4" })}>
					Welcome to my virtual world!
				</h2>
				<p>
					I am Gayathri Perumal, A passionate Mobile Application developer from India
					<span>🇮🇳</span>
				</p>
			</div>

		</section>
	);
}
