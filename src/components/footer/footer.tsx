"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Facebook, Instagram, Newspaper } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { TermsModal } from "@/components/footer/terms-modal"
import { PrivacyModal } from "@/components/footer/privacy-modal"


export default function Footer() {

	const navigationLinks = [
		{ href: "#hero", label: "Home" },
		{ href: "#about", label: "About" },
		{ href: "#benefits", label: "Benefits" },
		{ href: "#features", label: "Features" },
		{ href: "#contact", label: "Contact" },
	]



	const socialLinks = [
		{ href: "https://www.facebook.com/profile.php?id=100087898493963", label: "Facebook", icon: Facebook },
		{ href: "https://www.instagram.com/momoola.io/#", label: "Instagram", icon: Instagram },
		{ href: "https://momoola.substack.com/", label: "Substack", icon: Newspaper },
	]

	const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
		e.preventDefault()
		const element = document.querySelector(href)
		element?.scrollIntoView({ behavior: "smooth" })
	}

	return (
		<footer className="w-full bg-white py-12">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
					<div className="flex justify-center md:justify-start">
						<Image
							src="/assets/logo/footer.png"
							alt="MoMoola"
							width={100}
							height={33}
							className="object-contain w-[100px] h-[33px]"
							priority
							loading="eager"
						/>

					</div>

					<nav className="flex justify-center items-center">
						<ul className="flex flex-col items-center md:flex-row md:items-start gap-4 md:gap-6">

								{navigationLinks.map((link) => (
								<li key={link.href}>
									<motion.div className="inline-block" whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 500 }}>
										<Link
											href={link.href}
											onClick={(e) => scrollToSection(e, link.href)}
											className="text-black hover:text-dynamic-green transition-colors"
										>
											{link.label}
										</Link>
									</motion.div>

								</li>
							))}
						</ul>
					</nav>

					<div className="flex justify-center md:justify-end gap-6">
						{socialLinks.map((social) => (
							<motion.div className="inline-block" key={social.label} whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 500 }}>
								<a
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									className="text-black hover:text-dynamic-green transition-colors"
								>
									<social.icon className="w-6 h-6 stroke-[1.25]" />
								</a>
							</motion.div>

						))}
					</div>
				</div>

				<div className="mt-8 pt-8 pb-8 border-t text-center">
					<p className="text-black text-sm mb-4">© 2025 MoMoola UK Ltd. All rights reserved.</p>
					<div className="text-sm text-black">
						<motion.div className="inline-block" whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 500 }}>
							<TermsModal />
						</motion.div>
						<span className="mx-2">|</span>
						<motion.div className="inline-block" whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 500 }}>
							<PrivacyModal />
						</motion.div>
					</div>

				</div>
			</div>
		</footer>
	)
}





