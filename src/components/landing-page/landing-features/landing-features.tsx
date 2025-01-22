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
	const [displayText, setDisplayText] = useState('');
	
	useEffect(() => {
		let rafId: number;
		let startTime: number | null = null;
		
		const animate = (timestamp: number) => {
			if (!startTime) startTime = timestamp;
			const elapsed = timestamp - startTime;
			const charIndex = Math.floor(elapsed / 30); // Speed up typing slightly
			
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



// Split features into customer and provider sections
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
					delay: index * 0.1,
					duration: 0.4,
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
	const [activeIndex, setActiveIndex] = useState(0);
	const [direction, setDirection] = useState(0);
	
	const currentFeatures = activeIndex === 0 ? customerFeatures : providerFeatures;
	const displayText = useTypewriter(
		activeIndex === 0 
			? "Simplifying customers financial future" 
			: "Changing how providers connect and grow"
	);


	const textVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { 
			opacity: 1, 
			y: 0,
			transition: {
				duration: 0.5,
				ease: "easeOut"
			}
		}
	};

	useEffect(() => {
		const rotationInterval = setInterval(() => {
			setDirection(1);
			setActiveIndex(prev => (prev + 1) % 2);
		}, 8000);

		return () => clearInterval(rotationInterval);
	}, []);

	return (
		<section id="features" className="w-full bg-[#191c2b] pb-0">
			<div className="container mx-auto px-6 py-12">
				<div className="flex flex-col items-center text-center mb-12">
					<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
						{displayText}
						<span className="inline-block w-6 sm:w-8 h-1.5 bg-[#66f770] ml-1 animate-[blink_0.8s_ease-in-out_infinite]"></span>
					</h2>

				</div>

				
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
					<AnimatePresence mode="wait" custom={direction}>
						<motion.div 
							key={activeIndex}
							custom={direction}
							initial={{ opacity: 0, x: direction * 100 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: direction * -100 }}
							transition={{ 
								duration: 0.6,
								ease: [0.43, 0.13, 0.23, 0.96]
							}}
							className="contents"
						>
							{currentFeatures.map((feature, index) => (
								<FeatureCard key={`${activeIndex}-${feature.title}`} feature={feature} index={index} />
							))}
						</motion.div>
					</AnimatePresence>
				</div>

				<div className="w-full">
					<div className="relative flex items-center justify-center gap-4">
						<button 
							onClick={() => {
								setDirection(-1);
								setActiveIndex(Math.max(0, activeIndex - 1));
							}}
							className="bg-gray-800 text-white w-8 h-8 rounded-full hover:bg-gray-700 transition-colors flex items-center justify-center text-sm"
						>
							←
						</button>
						<div className="flex gap-3 sm:gap-4">
							{[0, 1].map((index) => (
								<button
									key={index}
									onClick={() => {
										setDirection(index > activeIndex ? 1 : -1);
										setActiveIndex(index);
									}}
									className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors ${
										index === activeIndex ? 'bg-[#66f770]' : 'bg-gray-600'
									}`}
								/>
							))}
						</div>
						<button 
							onClick={() => {
								setDirection(1);
								setActiveIndex(Math.min(1, activeIndex + 1));
							}}
							className="bg-gray-800 text-white w-8 h-8 rounded-full hover:bg-gray-700 transition-colors flex items-center justify-center text-sm"
						>
							→
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}