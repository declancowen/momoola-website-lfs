import Hero from "@/components/landing-page/landing-hero/landing-hero"
import About from "@/components/landing-page/landing-about/landing-about"
import Benefits from "@/components/landing-page/landing-benefits/landing-benefits"
import Features from "@/components/landing-page/landing-features/landing-features"
import { Contact } from "@/components/landing-page/landing-contact"

export default function Home() {
	return (
		<main className="relative flex flex-col isolate">
			<div className="relative z-[10]">
				<Hero />
			</div>
			<div className="relative z-[50]">
				<About />
			</div>
			<div className="relative z-[40]">
				<Benefits />
			</div>
			<div className="relative z-[30]">
				<Features />
			</div>
			<div className="relative z-[20]">
				<Contact />
			</div>
		</main>
	)
}

