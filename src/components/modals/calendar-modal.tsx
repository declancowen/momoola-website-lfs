"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { PhoneCall } from "lucide-react"
import {
	Dialog,
	DialogContent,
	DialogTrigger,
} from "@/components/footer/dialog"
import { cn } from "@/lib/utils"

interface CalendarModalProps {


	className?: string
	buttonClassName?: string
}

export const CalendarModal = React.memo(function CalendarModal({ 
	className, 
	buttonClassName 
}: CalendarModalProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<motion.div
					whileHover={{ y: -2, scale: 1.01 }}
					whileTap={{ scale: 0.98 }}
					transition={{ type: "spring", stiffness: 600, damping: 25 }}
				>
					<button
						className={cn(
							"gap-4 border h-11 rounded-md px-8 inline-flex items-center justify-center transform-gpu",
							buttonClassName || "bg-[#191c2b] text-[#66f770] border-[#66f770] hover:bg-[#191c2b]/90"
						)}
					>
						Jump on a call <PhoneCall className="w-4 h-4" />
					</button>
				</motion.div>
			</DialogTrigger>
			<DialogContent 
				className={cn(
					"sm:max-h-[90vh] w-[98vw] max-w-[1400px] p-0 bg-white border-gray-200", 
					className
				)}
			>
				<iframe 
					src="https://book.morgen.so/declancowen/intro" 
					width="100%" 
					height="700px" 
					style={{ border: 'none' }}
					loading="lazy"
				/>
			</DialogContent>
		</Dialog>
	)
});
