"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarModal } from "../../modals/calendar-modal"
import { EmailSignupModal } from "../../modals/email-signup-modal"

// Add error boundary for EmailSignupModal
function EmailSignupWrapper({ buttonClassName, variant }: { buttonClassName?: string, variant?: 'dark' | 'light' }) {
	try {
		return (
			<EmailSignupModal
				buttonClassName={buttonClassName}
				variant={variant}
			/>
		);
	} catch (error) {
		console.error('EmailSignupModal error:', error);
		return null;
	}
}


const ImagePreloader = React.memo(({ src }: { src: string }) => (
	<Image
		src={src}
		alt="Preload"
		width={3000}
		height={6000}
		className="hidden"
		priority
		loading="eager"
		quality={90}
	/>
));

ImagePreloader.displayName = 'ImagePreloader';

const useTypewriter = (text: string) => {

	const [displayText, setDisplayText] = useState('');
	
	useEffect(() => {
		let rafId: number;
		let startTime: number | null = null;
		let currentText = '';
		
		const animate = (timestamp: number) => {
			if (!startTime) startTime = timestamp;
			const elapsed = timestamp - startTime;
			const charIndex = Math.floor(elapsed / 40);
			
			if (charIndex <= text.length) {
				currentText = text.slice(0, charIndex);
				setDisplayText(currentText);
				rafId = requestAnimationFrame(animate);
			}
		};
		
		rafId = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(rafId);
	}, [text]);
	
	return { displayText };
};

const containerVariants = {
	enter: { opacity: 1 },
	exit: { opacity: 0 }
};

const slideVariants = {
	enter: (direction: number) => ({
		x: 0,
		scale: 1,
		rotateY: 0,
		transition: {
			type: "spring",
			stiffness: 350,
			damping: 30,
			mass: 0.5
		}
	}),
	exit: (direction: number) => ({
		x: direction * -30,
		scale: 0.95,
		rotateY: direction * -2,
		transition: {
			type: "spring",
			stiffness: 350,
			damping: 30,
			mass: 0.5
		}
	})
};










const images = [
	"/assets/mobile-ui/1-Register.png",
	"/assets/mobile-ui/2-Browse.png",
	"/assets/mobile-ui/3-Tailor.png",
	"/assets/mobile-ui/4-Apply.png",
];

const titles = [
	"Create your digital identity",
	"Receive personalised offers",
	"Connect with financial partners",
	"Apply in seconds",
];

export default function About() {
	const [imagesLoaded, setImagesLoaded] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [direction, setDirection] = useState(0); // -1 for left, 1 for right
	const { displayText } = useTypewriter(titles[currentIndex]);
	const preloadImage = (src: string): Promise<void> => {
		if (typeof window === 'undefined') return Promise.resolve();
		
		return new Promise<void>((resolve, reject) => {
			const img = new window.Image();
			img.onload = () => resolve();
			img.onerror = reject;
			img.src = src;
		});
	};

	useEffect(() => {
		const loadImages = async () => {
			try {
				await Promise.all(images.map(src => preloadImage(src)));
				setImagesLoaded(true);
			} catch (error) {
				console.error('Error preloading images:', error);
				setImagesLoaded(true);
			}
		};
		loadImages();
	}, []);

	const handleAutoTransition = useCallback(() => {
		setDirection(1);
		setCurrentIndex(prev => (prev + 1) % images.length);
	}, []);

	useEffect(() => {
		const id = setInterval(handleAutoTransition, 7000);
		return () => clearInterval(id);
	}, [handleAutoTransition]);

	const handleNavigation = useCallback((newIndex: number) => {
		if (newIndex === currentIndex) return;
		setDirection(newIndex > currentIndex ? 1 : -1);
		setCurrentIndex(newIndex);
	}, [currentIndex]);

	const getSlideIndex = useCallback((offset: number) => {
		return (currentIndex + offset + images.length) % images.length;
	}, [currentIndex, images.length]);



	return (
        <>
            <div className="hidden" aria-hidden="true">
                {images.map((src, index) => (
                    <ImagePreloader key={`preload-${index}`} src={src} />
                ))}
            </div>
            {imagesLoaded && (
<section id="about" className="w-full bg-white min-h-[fit-content] sm:min-h-[105dvh] md:min-h-[85dvh] flex items-start sm:items-center relative isolate z-20 pt-6 pb-8 sm:pb-16 sm:py-12 md:py-20">
			{/* Navigation Buttons */}
			<div className="absolute -translate-y-[40px] sm:translate-y-0 -bottom-2 sm:-bottom-6 lg:bottom-16 inset-x-0 z-10">
				<div className="container mx-auto px-4">
					<div className="relative flex items-center justify-center gap-8 mt-2 sm:mt-0">
						<button
							onClick={() => handleNavigation((currentIndex - 1 + images.length) % images.length)}
							className="bg-gray-200 text-black w-8 h-8 rounded-full hover:bg-gray-300 transition-colors flex items-center justify-center text-sm"
						>
							←
						</button>
						<div className="flex gap-3 sm:gap-4">
							{images.map((_, index) => (
								<button
									key={index}
									onClick={() => handleNavigation(index)}
									className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors ${
										currentIndex === index ? 'bg-black' : 'bg-gray-300'
									}`}
								/>
							))}
						</div>
						<button
							onClick={() => handleNavigation((currentIndex + 1) % images.length)}
							className="bg-gray-200 text-black w-8 h-8 rounded-full hover:bg-gray-300 transition-colors flex items-center justify-center text-sm"
						>
							→
						</button>
					</div>
				</div>
			</div>
			<div className="container mx-auto px-6 flex items-start sm:items-center">
				<div className="flex flex-col lg:flex-row items-start sm:items-center gap-0 sm:gap-6 lg:gap-10 w-full">
					<div className="w-full lg:w-1/2 px-4 md:px-0 text-center lg:text-left mb-1 sm:mb-0 pt-2 sm:pt-0">
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 min-h-[3.5rem] mb-3 md:mb-6">
							{displayText}
							<span className="inline-block w-6 sm:w-8 h-1.5 bg-[#66f770] ml-1 animate-[blink_0.8s_ease-in-out_infinite]"></span>
						</h2>
						<p className="text-lg sm:text-lg md:text-xl text-gray-600 leading-relaxed md:leading-loose lg:pr-7 mb-6 md:mb-10">
                        Simplify your financial journey with MoMoola's powerful platform. From creating your digital identity to monitoring your credit, we make every step seamless, secure, and personalized. Empower yourself with smarter financial choices and connect with trusted partners—all in one place.
                        </p>
						<div className="flex flex-col sm:flex-row gap-4 sm:gap-3 w-full sm:w-auto max-w-[300px] mx-auto sm:max-w-none mb-4 sm:mb-0">
							<div className="w-full sm:w-auto">
								<CalendarModal buttonClassName="w-full gap-4 bg-white text-[#191c2b] border-black hover:bg-white/90 hover:text-[#191c2b]" />
							</div>
							<div className="w-full sm:w-auto">
								<EmailSignupWrapper
									buttonClassName="w-full gap-4 bg-[#191c2b] text-white hover:bg-[#191c2b]/90"
									variant="light"
								/>
							</div>
						</div>
                    </div>

					<div className="w-full lg:w-1/2 h-[400px] sm:h-[500px] md:h-[600px] relative mt-4 sm:mt-0 z-10">

						<div className="absolute inset-0 flex flex-col z-10 isolate">
							<div className="w-[90%] sm:w-[95%] mx-auto h-full">
								<div className="grid grid-cols-[0.35fr_1.5fr_0.35fr] sm:grid-cols-[0.65fr_1.5fr_0.65fr] gap-2 sm:gap-3 h-full">
									{[-1, 0, 1].map((offset) => {
										const slideIndex = getSlideIndex(offset);
										const position = offset === -1 ? "opacity-30" : offset === 0 ? "" : "opacity-30";
										
										return (
											<motion.div 
												key={`slide-${slideIndex}`}
												className={`flex justify-center ${position} transform-gpu`}
												style={{ 
													zIndex: offset === 0 ? 2 : 1,
													transformOrigin: 'center top'
												}}
												variants={slideVariants}
												custom={direction}
												initial="exit"
												animate="enter"
												exit="exit"
											>
												<div className="relative w-full h-full">
													<Image
														src={images[slideIndex]}
														alt={offset === 0 ? "Current" : offset === -1 ? "Previous" : "Next"}
														width={1000}
														height={2000}
														className="object-contain h-full w-full"
														style={{ maxWidth: '100%', objectFit: 'contain', height: '100%', width: 'auto', margin: '0 auto' }}
														priority
														loading="eager"
														quality={90}
													/>
												</div>
											</motion.div>
										);
									})}
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</section>
	)}
</>
	);
}

