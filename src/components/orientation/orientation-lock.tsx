"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

export function OrientationLock() {
    const [isLandscape, setIsLandscape] = React.useState(false);
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        // Check if device is mobile based on dimensions
        const checkMobile = () => {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            const mobile = screenHeight <= 430;
            setIsMobile(mobile);
        };

        const checkOrientation = () => {
            if (window.innerWidth > window.innerHeight && isMobile) {
                setIsLandscape(true);
            } else {
                setIsLandscape(false);
            }
        };

        // Initial checks
        checkMobile();
        checkOrientation();

        // Add event listeners
        window.addEventListener('resize', checkMobile);
        window.addEventListener('resize', checkOrientation);
        window.addEventListener('orientationchange', checkOrientation);

        // Cleanup
        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('resize', checkOrientation);
            window.removeEventListener('orientationchange', checkOrientation);
        };
    }, [isMobile]);

    return (
        <AnimatePresence>
            {isLandscape && isMobile && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
                >
                    <motion.div
                        initial={{ scale: 0.95, y: 10 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.95, y: 10 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="bg-white rounded-xl p-6 max-w-sm w-full text-center shadow-xl border border-gray-200"
                    >
                        <div className="flex justify-center mb-4">
                            <div className="p-3 rounded-full bg-[#191c2b]/10">
                                <RotateCcw className="w-8 h-8 text-[#191c2b]" />
                            </div>
                        </div>
                        <h2 className="text-xl font-semibold mb-2 text-[#191c2b]">
                            Please Rotate Your Device
                        </h2>
                        <p className="text-gray-600">
                            This app is best viewed in portrait mode
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}