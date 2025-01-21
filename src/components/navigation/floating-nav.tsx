"use client"

import * as React from "react"
import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function FloatingNav() {
	const [isOnDarkSection, setIsOnDarkSection] = React.useState(true);
	const [isVisible, setIsVisible] = React.useState(true);
	const lastScrollY = React.useRef(0);
	const { scrollY } = useScroll();
	const hideTimeoutRef = React.useRef<NodeJS.Timeout>();
	
	const handleMouseEnter = () => {
		if (hideTimeoutRef.current) {
			clearTimeout(hideTimeoutRef.current);
		}
		setIsVisible(true);
	};

	const handleMouseLeave = () => {
		if (lastScrollY.current > 100) {
			hideTimeoutRef.current = setTimeout(() => {
				setIsVisible(false);
			}, 500);
		}
	};

	React.useEffect(() => {
		return () => {
			if (hideTimeoutRef.current) {
				clearTimeout(hideTimeoutRef.current);
			}
		};
	}, []);
	
	useMotionValueEvent(scrollY, "change", (latest) => {
		if (latest < lastScrollY.current || latest < 100) {
			setIsVisible(true);
		} else if (latest > lastScrollY.current && latest > 100) {
			setIsVisible(false);
		}
		
		lastScrollY.current = latest;
		
		const sections = ['#hero', '#features'].map(id => 
			document.querySelector(id)
		).filter(Boolean);
		
		const isOnDark = sections.some(section => {
			if (!section) return false;
			const rect = section.getBoundingClientRect();
			return rect.top <= 80 && rect.bottom > 80;
		});
		
		setIsOnDarkSection(isOnDark);
	});

	const navigationLinks = [
		{ href: "#hero", label: "Home" },
		{ href: "#about", label: "About" },
		{ href: "#benefits", label: "Benefits" },
		{ href: "#features", label: "Features" },
		{ href: "#contact", label: "Contact" },
	];

	const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
		e.preventDefault();
		const element = document.querySelector(href);
		element?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<div 
			className="fixed top-0 left-0 w-full h-24 z-50"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div className="flex justify-center px-4 pt-2">
				<motion.nav 
					className={cn(
						"rounded-full px-3 sm:px-6 py-3 border w-full sm:w-max backdrop-blur-md transition-all duration-500 ease-out",
						isOnDarkSection 
							? "bg-[#191c2b]/85 border-[#66F770] border-[0.5px] shadow-lg shadow-[#66F770]/15" 
							: "bg-white/85 border-gray-300/50 shadow-lg shadow-black/10"
					)}
					initial={false}
					animate={{ 
						y: isVisible ? 0 : -100,
						opacity: isVisible ? 1 : 0
					}}
					transition={{ 
						type: "spring", 
						stiffness: 400,
						damping: 20,
						duration: 0.15
					}}
				>
					<div className="flex items-center justify-between sm:justify-start sm:gap-6">
						<motion.div 
							className="flex-shrink-0"
							whileHover={{ y: -2 }}
							transition={{ type: "spring", stiffness: 500 }}
						>
							<Link href="#hero" onClick={(e) => scrollToSection(e, "#hero")}>
								<Image 
									src="/assets/logo/nav.png"
									alt="MoMoola Logo"
									width={28}
									height={28}
									priority
									className="object-contain w-[28px] h-[28px]"
								/>
							</Link>
						</motion.div>
						
						<ul className="flex gap-3 sm:gap-6 text-sm sm:text-base overflow-x-auto no-scrollbar">
							{navigationLinks.map((link) => (
								<li key={link.href}>
									<motion.div 
										className="inline-block"
										whileHover={{ y: -2 }}
										transition={{ type: "spring", stiffness: 500 }}
									>
										<Link
											href={link.href}
											onClick={(e) => scrollToSection(e, link.href)}
											className={cn(
												"transition-colors duration-150 font-medium whitespace-nowrap",
												isOnDarkSection 
													? "text-white hover:text-[#66F770]" 
													: "text-black hover:text-dynamic-green"
											)}
										>
											{link.label}
										</Link>
									</motion.div>
								</li>
							))}
						</ul>
					</div>
				</motion.nav>
			</div>
		</div>
	);
}




