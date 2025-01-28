"use client"

import * as React from "react"
import { useEffect, useMemo, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { MoveRight } from "lucide-react"
import { CalendarModal } from "../../modals/calendar-modal"
import { EmailSignupModal } from "../../modals/email-signup-modal"
import { Button } from "./landing-hero-button"

const MotionDot = motion.div;

const handleKnowledgebaseClick = () => {

	if (typeof window !== 'undefined') {
		window.open('https://momoola.substack.com/', '_blank');
	}
};

// Optimization: Constants for performance tuning
const THROTTLE_MS = 32;
const DOT_SPACING = 25;
const MAX_DOTS = 4000;
const ANIMATION_DISTANCE = 120;

const useWindowDimensions = () => {
	const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

	React.useEffect(() => {
		if (typeof window === 'undefined') return;
		
		const handleResize = () => {
			setDimensions({
				width: window.innerWidth,
				height: window.innerHeight
			});
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return dimensions;
};

export default function Hero() {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
	const dimensions = useWindowDimensions();
	const [titleNumber, setTitleNumber] = useState(0)
	const titles = useMemo(
		() => ["seamless", "personalized", "data-driven", "secure", "inclusive"],
		[]
	)

	// Optimization: RAF for mouse movement
	useEffect(() => {
		if (typeof window === 'undefined') return;

		let rafId: number;
		let lastUpdate = 0;
		let pendingMousePosition: { x: number, y: number } | null = null;

		const updateMousePosition = (time: number) => {
			if (pendingMousePosition && time - lastUpdate >= THROTTLE_MS) {
				setMousePosition(pendingMousePosition);
				pendingMousePosition = null;
				lastUpdate = time;
			}
			rafId = requestAnimationFrame(updateMousePosition);
		};

		const handleMouseMove = (e: MouseEvent) => {
			pendingMousePosition = {
				x: e.pageX,
				y: e.pageY - window.scrollY
			};
		};

		rafId = requestAnimationFrame(updateMousePosition);
		window.addEventListener('mousemove', handleMouseMove);
		
		return () => {
			cancelAnimationFrame(rafId);
			window.removeEventListener('mousemove', handleMouseMove);
		};
	}, []);


	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setTitleNumber(prev => prev === titles.length - 1 ? 0 : prev + 1)
		}, 2000)
		return () => clearTimeout(timeoutId)
	}, [titleNumber, titles])

	// Optimization: Memoized dot positions with limiting
	const dots = useMemo(() => {
		if (dimensions.width === 0) return [];
		const dotArray = [];
		const columns = Math.ceil(dimensions.width / DOT_SPACING);
		const rows = Math.ceil(dimensions.height / DOT_SPACING);
		
		// Calculate how many dots we can show while staying under MAX_DOTS
		const totalDots = columns * rows;
		const skipFactor = Math.ceil(totalDots / MAX_DOTS);
		
		let dotCount = 0;
		for (let i = 0; i < rows; i += skipFactor) {
			for (let j = 0; j < columns; j += skipFactor) {
				if (dotCount < MAX_DOTS) {
					dotArray.push({
						x: j * DOT_SPACING,
						y: i * DOT_SPACING,
					});
					dotCount++;
				}
			}
		}
		return dotArray;
	}, [dimensions]);




	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setTitleNumber(prev => (prev + 1) % titles.length);
		}, 2000);
		return () => clearTimeout(timeoutId);
	}, [titleNumber, titles.length]);

	// Optimization: Memoized dot style calculation
	const getDotStyle = useCallback((dot: { x: number, y: number }) => {
		const dx = mousePosition.x - dot.x;
		const dy = mousePosition.y - dot.y;
		const distance = Math.sqrt(dx * dx + dy * dy);
		const scale = Math.max(0, 1 - distance / ANIMATION_DISTANCE);
		const scaledValue = Math.pow(scale, 1.15);
	
		return {
			left: dot.x,
			top: dot.y,
			transform: `translateY(${-scaledValue * 45}px) scale(${1 + scaledValue * 2})`,
			opacity: 0.25 + scaledValue * 0.75,
			willChange: 'transform, opacity'
		};
	}, [mousePosition]);


	return (
		<section id="hero" className="w-full h-[100dvh] flex items-center justify-center overflow-hidden relative bg-[#191c2b] hero-section z-0">
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{dots.map((dot, index) => (
					<div
						key={index}
						className="absolute w-[2px] h-[2px] bg-[#66F770] rounded-full transition-all duration-300 ease-out transform-gpu"
						style={getDotStyle(dot)}
					/>
				))}

			</div>


			<div className="container mx-auto relative z-10 h-full flex items-center justify-center px-4 py-8 md:py-0">
				<div className="flex gap-6 md:gap-8 items-center justify-center flex-col w-full max-w-6xl mx-auto">
					<div>
						<motion.div
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							transition={{ type: "spring", stiffness: 400, damping: 17 }}
						>
							<Button
								variant="secondary"
								size="sm"
								className="gap-4 bg-[#2a2f42] text-white/90 hover:bg-[#2a2f42]/90"
								onClick={handleKnowledgebaseClick}
							>
								Browse our knowledgebase <MoveRight className="w-4 h-4" />
							</Button>
						</motion.div>
					</div>
					<div className="flex gap-8 flex-col">
						<h1 className="text-5xl md:text-6xl lg:text-8xl max-w-2xl tracking-tighter text-center font-regular text-white">
							<span>Experience</span>
							<span className="relative flex w-full justify-center overflow-hidden text-center md:pb-6 md:pt-2">
								&nbsp;
								{titles.map((title, index) => (
									<motion.span
										key={index}
										className="absolute font-semibold text-dynamic-green transform-gpu text-5xl md:text-6xl lg:text-8xl"
										initial={{ opacity: 0, y: "-120" }}
										transition={{ type: "spring", stiffness: 50 }}
										animate={
											titleNumber === index
												? {
														y: 0,
														opacity: 1,
													}
												: {
														y: titleNumber > index ? -180 : 180,
														opacity: 0,
													}
										}
									>
										{title}
									</motion.span>
								))}
							</span>
							financial services
						</h1>
						<p className="text-xl md:text-xl lg:text-2xl leading-relaxed md:leading-loose tracking-tight text-white max-w-2xl text-center px-4 md:px-0">
							MoMoola simplifies financial services by connecting customers with
							personalized solutions and empowering Financial Service Providers
							with verified, data-driven insights.
						</p>
					</div>
					<div className="flex flex-col sm:flex-row gap-3 px-4 md:px-0 w-full sm:w-auto max-w-[300px] mx-auto sm:max-w-none">
						<div className="w-full sm:w-auto">
							<CalendarModal buttonClassName="w-full gap-4 bg-[#191c2b] text-[#66f770] border-[#66f770] hover:bg-[#191c2b]/90 hover:text-[#66f770]" />
						</div>
						<div className="w-full sm:w-auto">
							<EmailSignupModal
								buttonClassName="w-full gap-4 bg-dynamic-green text-[#191c2b] hover:bg-dynamic-green/90"
								variant="dark"
							/>
						</div>
					</div>


				</div>
			</div>
		</section>
	)
}

export { Hero }
