"use client";

import * as React from "react";
import { useState, useEffect, useCallback, useMemo } from "react";
import {
	IconFingerprint,
	IconShoppingCart,
	IconBolt,
	IconChartBar,
	IconTrendingUp,
	IconBulb,
	IconFaceId,
	IconAdjustments,
	IconArrowsExchange,
	IconGitBranch,
	IconPuzzle,
	IconUsers,
} from "@tabler/icons-react";

import { motion, AnimatePresence } from "framer-motion";

const useTypewriter = (text: string) => {
	const [displayText, setDisplayText] = useState(text);

	useEffect(() => {
		if (text === displayText) return;
		let rafId: number;
		let startTime: number;
		let currentText = displayText;
		let isDeleting = true;
		let lastUpdateTime = 0;

		const animate = (timestamp: number) => {
			if (!startTime) startTime = timestamp;
			const elapsed = timestamp - lastUpdateTime;

			if (elapsed > (isDeleting ? 30 : 40)) {
				if (isDeleting) {
					if (currentText.length === 0) {
						isDeleting = false;
					} else {
						currentText = currentText.slice(0, -1);
						setDisplayText(currentText);
					}
				} else {
					if (currentText.length === text.length) {
						cancelAnimationFrame(rafId);
						return;
					}
					currentText = text.slice(0, currentText.length + 1);
					setDisplayText(currentText);
				}
				lastUpdateTime = timestamp;
			}
			rafId = requestAnimationFrame(animate);
		};

		rafId = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(rafId);
	}, [text]);

	return { displayText };
};


const customerFeatures = [
	{
		title: "Centralized Digital Identity",
		description: "Create a secure profile for simplified financial interactions.",
		icon: IconFingerprint,
	},
	{
		title: "Personalized Product Marketplace",
		description: "Discover tailored financial products that match your needs.",
		icon: IconShoppingCart,
	},
	{
		title: "Instant Applications",
		description: "Apply for financial products with pre-verified profiles.",
		icon: IconBolt,
	},
	{
		title: "Credit Monitoring",
		description: "Track your credit score and financial health in real-time.",
		icon: IconChartBar,
	},
	{
		title: "Credit Building",
		description: "Get tools and guidance to improve your creditworthiness.",
		icon: IconTrendingUp,
	},
	{
		title: "Financial Wellness Insights",
		description: "Receive personalized tips to achieve your financial goals.",
		icon: IconBulb,
	},
];

const providerFeatures = [
	{
		title: "Enhanced KYC Verification",
		description: "Seamless compliance with real-time identity and document verification.",
		icon: IconFaceId,
	},
	{
		title: "Configurable Products",
		description: "Publish financial products with customizable criteria and benefits.",
		icon: IconAdjustments,
	},
	{
		title: "Decision Strategies",
		description: "Use real-time tools to qualify leads and boost conversion rates.",
		icon: IconArrowsExchange,
	},
	{
		title: "Application Workflow",
		description: "Track and manage applications efficiently from start to finish.",
		icon: IconGitBranch,
	},
	{
		title: "Onboarding Integration",
		description: "Simplify onboarding with API workflows that integrate seamlessly.",
		icon: IconPuzzle,
	},
	{
		title: "Customer 360° View",
		description: "Get a full view of customer profiles, applications, and history.",
		icon: IconUsers,
	},
];

const FeatureCard = React.memo(({ feature, index }: { 
	feature: typeof customerFeatures[0]; 
	index: number;
}) => {
	const Icon = feature.icon;
	
	return (
		<motion.div 
			className="bg-[#2a2f42] rounded-lg p-4 md:p-6 shadow-sm hover:shadow-xl border-2 border-transparent hover:border-[#66f770] active:border-[#66f770] cursor-pointer transform-gpu"
			whileHover={{ y: -4 }}
			whileTap={{ scale: 0.98 }}
			initial={{ opacity: 0, y: 20 }}
			animate={{ 
				opacity: 1, 
				y: 0,
				transition: {
					delay: index * 0.05,
					duration: 0.3,
					ease: [0.23, 1, 0.32, 1]
				}
			}}
			exit={{ opacity: 0, y: 20 }}
			transition={{ 
				type: "spring",
				stiffness: 400,
				damping: 17,
				mass: 0.5
			}}
		>
			<div className="bg-[#66f770] w-12 h-12 rounded-lg flex items-center justify-center mb-4">
				<Icon className="w-6 h-6 text-[#191c2b] stroke-[1.5]" />
			</div>
			<h3 className="text-lg md:text-xl font-semibold mb-2 text-[#66f770]">{feature.title}</h3>
			<p className="text-sm md:text-base text-white">{feature.description}</p>
		</motion.div>
	);
});

FeatureCard.displayName = 'FeatureCard';

export default function Features() {
	const [activeIndex, setActiveIndex] = React.useState(0);
	const features = activeIndex === 0 ? customerFeatures : providerFeatures;
	const { displayText } = useTypewriter(
		activeIndex === 0 
			? "Simplifying customers financial future" 
			: "Changing how providers connect and grow"
	);
	const timeoutRef = React.useRef<NodeJS.Timeout>();




	const scheduleNextTransition = React.useCallback(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		timeoutRef.current = setTimeout(() => {
			setActiveIndex(prev => (prev + 1) % 2);
			scheduleNextTransition();
		}, 20000);
	}, []);

	const handleNavigation = useCallback((newIndex: number) => {
		setActiveIndex(newIndex);
		scheduleNextTransition();
	}, [scheduleNextTransition]);

	React.useEffect(() => {
		scheduleNextTransition();
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [scheduleNextTransition]);

	return (
		<section id="features" className="w-full min-h-[100dvh] bg-[#191c2b] relative z-10 flex items-center py-12 pb-0 md:py-16 md:pb-0">
			<div className="container mx-auto px-6">
				<div className="flex flex-col items-center justify-center gap-6 md:gap-12 pb-0">
					<div className="text-center min-h-[4rem] flex items-center justify-center overflow-hidden px-4">
						<h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white break-words sm:whitespace-nowrap max-w-[90vw] sm:max-w-none">
							{displayText || ""}
							<span className="inline-block w-6 sm:w-8 h-1.5 bg-[#66f770] ml-1 animate-[blink_0.8s_ease-in-out_infinite]"></span>
						</h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto relative will-change-transform">
						<AnimatePresence mode="wait">
							<motion.div
								key={activeIndex}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="contents"
							>
								{features.map((feature, index) => (
									<FeatureCard 
										key={feature.title} 
										feature={feature} 
										index={index} 
									/>
								))}
							</motion.div>
						</AnimatePresence>
					</div>


					<div className="relative bottom-0 inset-x-0 z-20 mt-8">
						<div className="container mx-auto px-4">
							<div className="relative flex items-center justify-center gap-8">
								<button 
									onClick={() => handleNavigation(Math.max(0, activeIndex - 1))}
									className="bg-[#2a2f42] text-white w-8 h-8 rounded-full hover:bg-[#2a2f42]/80 transition-colors flex items-center justify-center text-sm transform-gpu"
								>
									←
								</button>
								<div className="flex gap-3 sm:gap-4">
									{[0, 1].map((index) => (
										<button
											key={index}
											onClick={() => handleNavigation(index)}
											className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors transform-gpu ${
												index === activeIndex ? 'bg-[#66f770]' : 'bg-[#2a2f42]'
											}`}
										/>
									))}
								</div>
								<button 
									onClick={() => handleNavigation(Math.min(1, activeIndex + 1))}
									className="bg-[#2a2f42] text-white w-8 h-8 rounded-full hover:bg-[#2a2f42]/80 transition-colors flex items-center justify-center text-sm transform-gpu"
								>
									→
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}