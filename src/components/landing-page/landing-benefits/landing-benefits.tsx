"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarModal } from "../../modals/calendar-modal";
import { WhiteEmailSignupModal } from "../../modals/white-email-signup-modal";
import { cn } from "@/lib/utils";
import {
	IconAdjustmentsBolt,
	IconLock,
	IconApps,
	IconCreditCard,
	IconRocket,
	IconChartBar,
	IconUserCheck,
	IconCoin,
	IconShoppingCart,
	IconBolt,
	IconSettings,
	IconPuzzle
} from "@tabler/icons-react";

const useBenefitsTypewriter = (text: string) => {
	const [displayText, setDisplayText] = useState('');
	
	useEffect(() => {
		let rafId: number;
		let startTime: number | null = null;
		
		const animate = (timestamp: number) => {
			if (!startTime) startTime = timestamp;
			const elapsed = timestamp - startTime;
			const charIndex = Math.floor(elapsed / 40);
			
			if (charIndex <= text.length) {
				setDisplayText(text.slice(0, charIndex));
				rafId = requestAnimationFrame(animate);
			}
		};
		
		rafId = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(rafId);
	}, [text]);
	
	return displayText;
};

const containerVariants = {
	enter: { opacity: 1, x: 0 },
	exit: (direction: number) => ({
		opacity: 0,
		x: direction * 20,
		transition: { duration: 0.3 }
	})
};

const textVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { 
		opacity: 1, 
		y: 0,
		transition: { duration: 0.3 }
	}
};

const customerFeatures = [
	{
		title: "Personalized Products",
		description: "Discover tailored offers for loans, savings, and other financial solutions that fit your unique profile.",
		icon: <IconAdjustmentsBolt className="w-6 h-6" />
	},
	{
		title: "Streamlined Applications",
		description: "Enjoy faster onboarding with automated processes and pre-verified profiles.",
		icon: <IconRocket className="w-6 h-6" />
	},
	{
		title: "Enhanced Control",
		description: "Monitor your credit, track applications, and gain insights to make better financial decisions.",
		icon: <IconChartBar className="w-6 h-6" />
	},
	{
		title: "Transparent Access",
		description: "Understand eligibility criteria upfront, reducing confusion and improving trust.",
		icon: <IconCreditCard className="w-6 h-6" />
	},
	{
		title: "Secure Digital Identity",
		description: "Protect your data with MoMoola's advanced encryption and centralized KYC platform.",
		icon: <IconLock className="w-6 h-6" />
	},
	{
		title: "All-in-One Platform",
		description: "Access diverse financial products and partners in a single, easy-to-use marketplace.",
		icon: <IconApps className="w-6 h-6" />
	}
];

const businessFeatures = [
	{
		title: "Qualified & Verified Leads",
		description: "Access a pool of pre-qualified customers with verified financial profiles.",
		icon: <IconUserCheck className="w-6 h-6" />

	},
	{
		title: "Lower Aquisiton Costs",
		description: "Reduce marketing and onboarding costs with data-driven targeting and automation.",
		icon: <IconCoin className="w-6 h-6" />
	},
	{
		title: "Product Marketplace",
		description: "Publish financial products with detailed criteria and benefits for maximum visibility.",
		icon: <IconShoppingCart className="w-6 h-6" />
	},
	{
		title: "Real-Time Decisions",
		description: "Use MoMoola's decision engine to qualify and engage leads instantly.",
		icon: <IconBolt className="w-6 h-6" />
	},
	{
		title: "Enhanced Efficiency",
		description: "Streamline workflows, reduce manual work, and focus on high-value engagements.",
		icon: <IconSettings className="w-6 h-6" />
	},
	{
		title: "Seamless Integration",
		description: "Connect your systems effortlessly using MoMoola's robust API and scalable architecture.",
		icon: <IconPuzzle className="w-6 h-6" />
	}
];

const Feature = React.memo(function Feature({
	title,
	description,
	icon,
	index
}: {
	title: string;
	description: string;
	icon: React.ReactNode;
	index: number;
}) {
	return (
		<div
			className={cn(
				"flex flex-col py-2 sm:py-4 md:py-6 relative group/feature transform-gpu",
				"border-b sm:border-r border-neutral-200",
				index % 2 === 0 && "sm:border-l md:border-l-0",
				index % 3 === 0 && "md:border-l",
				index >= 4 && "sm:border-b-0 md:border-b",
				index >= 3 && "md:border-b-0"
			)}
		>
			<div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-[#66f770]/20 to-transparent pointer-events-none" />
			<div className="mb-1.5 sm:mb-3 md:mb-4 relative z-10 px-4 sm:px-6 text-black">
				{icon}
			</div>
			<div className="text-base sm:text-lg font-bold mb-0.5 sm:mb-2 relative z-10 px-4 sm:px-6">
				<div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1.5 rounded-tr-full rounded-br-full bg-[#66f770]/30 group-hover/feature:bg-[#66f770] transition-all duration-200 origin-center" />
				<span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-black">
					{title}
				</span>
			</div>
			<p className="text-xs sm:text-sm text-neutral-700 max-w-xs relative z-10 px-4 sm:px-6 line-clamp-3 sm:line-clamp-none">
				{description}
			</p>

		</div>
	);
});

export default function Benefits() {
	const [activeIndex, setActiveIndex] = useState(0);
	const features = activeIndex === 0 ? customerFeatures : businessFeatures;
	const displayText = useBenefitsTypewriter(
		activeIndex === 0 ? "For everyday customers" : "For financial providers"
	);
	
	const [direction, setDirection] = useState(0);
	
	const scheduleNextTransition = useCallback(() => {
		return setTimeout(() => {
			setDirection(1);
			setActiveIndex(prev => (prev + 1) % 2);
		}, 20000);
	}, []);

	useEffect(() => {
		const timeoutId = scheduleNextTransition();
		return () => clearTimeout(timeoutId);
	}, [activeIndex, scheduleNextTransition]);

	const handleNavigation = useCallback((newIndex: number) => {
		if (newIndex === activeIndex) return;
		setDirection(newIndex > activeIndex ? 1 : -1);
		setActiveIndex(newIndex);
	}, [activeIndex]);

	return (
		<section id="benefits" className="w-full bg-gray-50 min-h-[fit-content] sm:min-h-[105dvh] md:min-h-[85dvh] flex items-start sm:items-center relative z-10 pt-6 pb-8 sm:pb-16 sm:py-12 md:py-20">
			<div className="container mx-auto px-6 flex flex-col items-start sm:items-center">
				<div className="flex flex-col lg:flex-row items-start sm:items-center gap-0 sm:gap-8 lg:gap-12 w-full">
					<div className="w-full lg:w-1/2 flex flex-col justify-center px-4 md:px-0 text-center lg:text-left pt-2 sm:pt-0 order-1 lg:order-2">
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black min-h-[4rem] mb-6">
							{displayText || "Loading..."}
							<span className="inline-block w-6 sm:w-8 h-1.5 bg-[#66f770] ml-1 animate-[blink_0.8s_ease-in-out_infinite]"></span>
						</h2>
						<motion.p
							key={`description-${activeIndex}`}
							variants={textVariants}
							initial="hidden"
							animate="visible"
							className="text-lg md:text-xl text-black leading-relaxed md:leading-loose lg:pr-7 mb-8 sm:mb-12 md:mb-16 transform-gpu"
						>
							{activeIndex === 0 ? (
								"MoMoola is your gateway to a smarter financial future. Discover personalized financial products that match your needs, apply with ease through simplified processes, and monitor your financial health—all from one secure platform. Whether it's building your credit, managing your spending, or connecting with trusted financial partners, MoMoola puts you in control of your financial journey."
							) : (
								"MoMoola empowers financial institutions to grow their reach and efficiency. Access verified, ready-to-engage leads, publish tailored products, and streamline onboarding with real-time decisioning tools. With MoMoola, providers reduce acquisition costs, enhance operational efficiency, and connect with customers through a seamless and scalable platform designed for innovation and trust."
							)}
						</motion.p>
						<div className="flex flex-col sm:flex-row gap-4 sm:gap-3 w-full sm:w-auto max-w-[300px] mx-auto sm:max-w-none mb-6 sm:mb-0">
							<div className="w-full sm:w-auto">
								<CalendarModal buttonClassName="w-full gap-4 bg-white text-[#191c2b] border-black hover:bg-white/90 hover:text-[#191c2b]" />
							</div>
							<div className="w-full sm:w-auto">
								<WhiteEmailSignupModal
									buttonClassName="w-full gap-4 bg-[#191c2b] text-white hover:bg-[#191c2b]/90"
								/>
							</div>
						</div>
					</div>
					<div className="w-full lg:w-1/2 h-auto relative flex items-center overflow-hidden order-2 lg:order-1 mt-4 sm:mt-6">
						<div className="w-full flex items-start sm:items-center justify-center bg-transparent">
							<div className="w-[98%] sm:w-[95%] lg:w-[95%] mx-auto flex items-start sm:items-center">
								<AnimatePresence mode="wait" custom={direction}>
									<motion.div
										key={activeIndex}
										custom={direction}
										variants={containerVariants}
										initial="exit"
										animate="enter"
										exit="exit"
										className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 md:gap-0 w-full border border-neutral-200 rounded-lg overflow-hidden transform-gpu will-change-transform bg-white shadow-sm mb-4 sm:mb-0"
									>
										{features.map((feature, index) => (
											<Feature key={feature.title} {...feature} index={index} />
										))}
									</motion.div>
								</AnimatePresence>
							</div>
						</div>
					</div>
				</div>
				<div className="w-full mt-3 sm:hidden">
					<div className="relative flex items-center justify-center gap-4">
						<button 
							onClick={() => handleNavigation(Math.max(0, activeIndex - 1))}
							className="bg-gray-200 text-black w-8 h-8 rounded-full hover:bg-gray-300 transition-colors flex items-center justify-center text-sm"
						>
							←
						</button>
						<div className="flex gap-3 sm:gap-4">
							{[0, 1].map((index) => (
								<button
									key={index}
									onClick={() => handleNavigation(index)}
									className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors ${
										index === activeIndex ? 'bg-black' : 'bg-gray-300'
									}`}
								/>
							))}
						</div>
						<button 
							onClick={() => handleNavigation(Math.min(1, activeIndex + 1))}
							className="bg-gray-200 text-black w-8 h-8 rounded-full hover:bg-gray-300 transition-colors flex items-center justify-center text-sm"
						>
							→
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}


