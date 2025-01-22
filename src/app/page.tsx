import Hero from "@/components/landing-page/landing-hero/landing-hero"
import About from "@/components/landing-page/landing-about/landing-about"
import Benefits from "@/components/landing-page/landing-benefits/landing-benefits"
import Features from "@/components/landing-page/landing-features/landing-features"
import { Contact } from "@/components/landing-page/landing-contact"

export default function Home() {
	return (
		<main className="relative flex flex-col">
			<section className="relative">
				<Hero />
			</section>
			<section className="relative">
				<About />
			</section>
			<section className="relative">
				<Benefits />
			</section>
			<section className="relative">
				<Features />
			</section>
			<section className="relative">
				<Contact />
			</section>
		</main>
	)
}

