"use client"

import * as React from "react"
import { useEffect, useMemo, useState, useRef, useCallback } from "react"
import { Mail } from "lucide-react"
import { CalendarModal } from "../../modals/calendar-modal"
import { motion } from "framer-motion"
import { Badge } from "./badge"
import { Button } from "./button"

const THROTTLE_MS = 32;
const DOT_SPACING = 35;
const MAX_DOTS = 1500;
const ANIMATION_DISTANCE = 150;


export default function Contact() {
	const containerRef = useRef<HTMLDivElement>(null)
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

	const handleEmailClick = () => {
		if (typeof window !== 'undefined') {
			window.location.href = 'mailto:partnerships@momoola.io';
		}
	};

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const updateDimensions = () => {
			if (containerRef.current) {
				const rect = containerRef.current.getBoundingClientRect()
				setDimensions({
					width: rect.width + DOT_SPACING, // Add extra spacing to ensure edge coverage
					height: rect.height + DOT_SPACING
				})
			}
		}

		updateDimensions()
		window.addEventListener('resize', updateDimensions)
		return () => window.removeEventListener('resize', updateDimensions)
	}, [])

	const dots = useMemo(() => {
		if (dimensions.width === 0) return [];
		const dotArray = [];
		const columns = Math.ceil(dimensions.width / DOT_SPACING);
		const rows = Math.ceil(dimensions.height / DOT_SPACING);
		
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

	}, [dimensions])

	const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
		if (containerRef.current) {
			const rect = containerRef.current.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			setMousePosition({ x, y });
		}
	}, []);

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
		<section id="contact" className="w-full bg-white">
			<div className="container mx-auto px-6 py-16">
				<div 
					ref={containerRef}
					onMouseMove={handleMouseMove}
					onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
					className="flex flex-col text-center bg-[#191c2b] rounded-3xl p-4 md:p-14 gap-4 md:gap-8 items-center justify-center relative overflow-hidden min-h-[300px]"
				>

					<div className="absolute inset-0 overflow-hidden pointer-events-none">
						{dots.map((dot, index) => (
							<div
								key={index}
								className="absolute w-[2px] h-[2px] bg-[#66F770] rounded-full transition-all duration-300 ease-out transform-gpu"
								style={getDotStyle(dot)}
							/>

						))}
					</div>

					<div className="relative z-10">
						<Badge className="bg-[#66f770] text-[#191c2b] hover:bg-[#66f770]/90 text-xs md:text-sm">Get started</Badge>
					</div>
					<div className="flex flex-col gap-2 relative z-10">
						<h3 className="text-lg md:text-3xl lg:text-5xl tracking-tighter max-w-xl font-regular text-[#66f770]">
							Try MoMoola Today!
						</h3>
						<p className="text-xs md:text-lg leading-relaxed tracking-tight text-white max-w-xl px-4 md:px-0">
							Navigating financial services shouldn't be complicated. Simplify your journey with our innovative platform, designed to make accessing and managing financial opportunities seamless and efficient. Take the first step toward smarter, faster solutions now!
						</p>
					</div>
					<div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full sm:w-auto">
						<div className="w-full sm:w-auto">
							<CalendarModal buttonClassName="w-full gap-4 bg-[#191c2b] text-[#66f770] border-[#66f770] hover:bg-[#191c2b]/90 hover:text-[#66f770]" />
						</div>
						<div className="w-full sm:w-auto">
							<motion.div
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								transition={{ type: "spring", stiffness: 400, damping: 17 }}
								className="w-full"
							>
								<Button 
									className="w-full gap-4 bg-[#66f770] text-[#191c2b] hover:bg-[#66f770]/90" 
									size="lg"
									onClick={handleEmailClick}
								>
									Send an email<Mail className="w-4 h-4"/>
								</Button>
							</motion.div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}


