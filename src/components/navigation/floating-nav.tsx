"use client"

import * as React from "react"
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

export function FloatingNav() {
	const [isOnDarkSection, setIsOnDarkSection] = React.useState(true);
	const [isVisible, setIsVisible] = React.useState(true);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
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
		if (lastScrollY.current > 100 && !isMobileMenuOpen) {
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

	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (isMobileMenuOpen) {
				const nav = document.querySelector('nav');
				if (nav && !nav.contains(event.target as Node)) {
					setIsMobileMenuOpen(false);
				}
			}
		};

		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [isMobileMenuOpen]);
	
	useMotionValueEvent(scrollY, "change", (latest) => {
		if (isMobileMenuOpen || latest < lastScrollY.current || latest < 100) {
			setIsVisible(true);
		} else if (latest > lastScrollY.current && latest > 100) {
			setIsVisible(false);
		}
		
		lastScrollY.current = latest;
		
		const darkSections = ['#hero', '#features'].map(id => 
			document.querySelector(id)
		).filter(Boolean);
		
		const isOnDark = darkSections.some(section => {
			if (!section) return false;
			const rect = section.getBoundingClientRect();
			const navHeight = 64;
			
			if (section.id === 'hero') {
				return rect.bottom > navHeight;
			}
			return rect.top <= navHeight && rect.bottom >= 0;
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

	const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>, href: string) => {
		e.preventDefault();
		const element = document.querySelector(href);
		
		if (element) {
			// Close mobile menu first
			setIsMobileMenuOpen(false);
			
			// Force nav visibility
			setIsVisible(true);
			
			// Small delay to allow menu to close and get correct positions
			setTimeout(() => {
				const isMobile = window.innerWidth < 640;
				const headerOffset = isMobile ? 0 : 96; // Only apply offset on desktop
				const elementRect = element.getBoundingClientRect();
				const absoluteElementTop = elementRect.top + window.pageYOffset;
				const scrollTo = absoluteElementTop - headerOffset;

				window.scrollTo({
					top: Math.max(0, scrollTo),
					behavior: 'smooth'
				});
			}, 50);
		}
	};



	return (
		<div 
			className="fixed top-0 left-0 w-full h-16 sm:h-24 z-[100]"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div className="hidden sm:flex justify-center px-4 pt-2">
				<motion.nav 
					className={cn(
						"px-6 py-3 border rounded-full w-max backdrop-blur-md transition-all duration-500 ease-out",
						isOnDarkSection 
							? "bg-[#191c2b]/75 border-[#66F770] border-[0.5px] shadow-lg shadow-[#66F770]/10" 
							: "bg-white/75 border-gray-300/50 shadow-lg shadow-black/10"
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
					<div className="flex items-center justify-start gap-6">
						<motion.div 
							className="flex-shrink-0"
							whileHover={{ y: -2 }}
							transition={{ type: "spring", stiffness: 500 }}
						>
							<Link 
								href="#hero" 
								onClick={(e) => {
									e.preventDefault();
									setIsMobileMenuOpen(false);
									setIsVisible(true);
									
									setTimeout(() => {
										const isMobile = window.innerWidth < 640;
										const headerOffset = isMobile ? 0 : 96;
										window.scrollTo({
											top: 0,
											behavior: 'smooth'
										});
									}, 50);
								}}
							>
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
						<ul className="flex items-center gap-6">
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

			<div className="sm:hidden">
				<motion.div 
					className="fixed top-0 left-0 right-0 backdrop-blur-md z-[100]"
					initial={false}
					animate={{ 
						y: isVisible ? 0 : -100,
						opacity: isVisible ? 1 : 0,
						backgroundColor: isOnDarkSection ? "rgba(25, 28, 43, 0.75)" : "rgba(255, 255, 255, 0.75)",
						borderBottom: isOnDarkSection ? "1px solid rgba(102, 247, 112, 0.2)" : "1px solid rgba(0, 0, 0, 0.1)",
						boxShadow: isOnDarkSection 
							? "0 4px 16px rgba(102, 247, 112, 0.1)" 
							: "0 4px 12px rgba(0, 0, 0, 0.1)"
					}}
					transition={{ 
						y: { type: "spring", stiffness: 300, damping: 30 },
						opacity: { duration: 0.2 },
						backgroundColor: { duration: 0.3 },
						borderBottom: { duration: 0.3 },
						boxShadow: { duration: 0.3 }
					}}
				>
					<div className="flex items-center justify-between h-16 px-4">
						<Link 
							href="#hero" 
							onClick={(e) => {
								e.preventDefault();
								setIsMobileMenuOpen(false);
								setIsVisible(true);
								
								setTimeout(() => {
									const isMobile = window.innerWidth < 640;
									const headerOffset = isMobile ? 0 : 96;
									window.scrollTo({
										top: 0,
										behavior: 'smooth'
									});
								}, 50);
							}}
						>
							<Image 
								src="/assets/logo/nav.png"
								alt="MoMoola Logo"
								width={32}
								height={32}
								priority
								className="object-contain w-[32px] h-[32px]"
							/>
						</Link>

						<button
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className={cn(
								"p-2 transition-colors",
								isOnDarkSection 
									? "text-white hover:text-[#66F770]" 
									: "text-black hover:text-gray-600"
							)}
						>
							{isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
						</button>
					</div>
				</motion.div>

				<AnimatePresence>
					{isMobileMenuOpen && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.2 }}
							className="fixed top-[72px] left-4 right-4 backdrop-blur-md overflow-hidden rounded-xl border shadow-xl z-[100]"
							style={{
								backgroundColor: isOnDarkSection ? "rgba(25, 28, 43, 0.75)" : "rgba(255, 255, 255, 0.75)",
								borderColor: isOnDarkSection ? "rgba(102, 247, 112, 0.2)" : "rgba(0, 0, 0, 0.1)",
								boxShadow: isOnDarkSection 
									? "0 8px 32px rgba(102, 247, 112, 0.1)" 
									: "0 8px 32px rgba(0, 0, 0, 0.2)"
							}}
						>
							<ul className={cn(
								"flex flex-col w-full divide-y",
								isOnDarkSection 
									? "divide-[#66F770]/20" 
									: "divide-gray-500/20"
							)}>
								{navigationLinks.map((link) => (
									<li key={link.href}>
										<Link
											href={link.href}
											onClick={(e) => scrollToSection(e, link.href)}
											className={cn(
												"block w-full px-6 py-4 text-base font-medium transition-colors text-center",
												isOnDarkSection 
													? "text-white hover:text-[#66F770] hover:bg-[#66F770]/5" 
													: "text-black hover:text-gray-600 hover:bg-black/5"
											)}
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}


