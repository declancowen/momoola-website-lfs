"use client"

import * as React from "react"
import { useState, useEffect, createContext, useContext, useCallback, useMemo } from "react"

import { motion, AnimatePresence } from "framer-motion"
import { X, Loader2, Check, MoveRight } from "lucide-react"
import { Button } from "../landing-page/landing-hero/landing-hero-button"
import { EmailOctopusForm } from "../forms/email-octopus-form"
import { cn } from "@/lib/utils"

const emailPattern = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}";

const isValidEmail = (email: string) => {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};



const modalVariants = {
	hidden: { opacity: 0, scale: 0.95, y: 10 },
	visible: { 
		opacity: 1, 
		scale: 1, 
		y: 0,
		transition: {
			type: "spring",
			stiffness: 400,
			damping: 30
		}
	},
	exit: { 
		opacity: 0, 
		scale: 0.95, 
		y: 10,
		transition: {
			duration: 0.2
		}
	}
};

interface EmailSignupModalContextType {
    openModal: (variant: 'dark' | 'light') => void;
}

interface EmailSignupModalProviderProps {
    children: React.ReactNode;
    autoOpen?: boolean;
}

export const EmailSignupModalContext = createContext<EmailSignupModalContextType | null>(null);

export function useEmailSignupModal() {
    const context = useContext(EmailSignupModalContext);
    if (!context) {
        throw new Error('useEmailSignupModal must be used within EmailSignupModalProvider');
    }
    return context;
}

const SuccessMessage = React.memo(({ modalVariant }: { modalVariant: 'dark' | 'light' }) => (
	<div className="text-center py-8">
		<div className="flex justify-center mb-4">
			<div className={cn(
				"p-3 rounded-full transform-gpu",
				modalVariant === 'dark' ? "bg-[#66f770]/10" : "bg-[#191c2b]/10"
			)}>
				<Check className={cn(
					"w-8 h-8",
					modalVariant === 'dark' ? "text-[#66f770]" : "text-[#191c2b]"
				)} />
			</div>
		</div>
		<p className={cn(
			"text-2xl font-semibold mb-3",
			modalVariant === 'dark' ? "text-[#66f770]" : "text-[#66f770]"
		)}>Thanks for signing up!</p>
		<p className={modalVariant === 'dark' ? "text-white text-lg" : "text-gray-700 text-lg"}>
			We'll keep you updated on our progress.
		</p>
	</div>
));

SuccessMessage.displayName = 'SuccessMessage';

export function EmailSignupModalProvider({ children, autoOpen = false }: EmailSignupModalProviderProps) {
    // State declarations first
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [modalVariant, setModalVariant] = useState<'dark' | 'light'>('dark');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [shouldSubmit, setShouldSubmit] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isValidating, setIsValidating] = useState(false);

    // Callbacks
    const handleClose = useCallback(() => {
        if (!isSubmitting) {
            setIsOpen(false);
            setEmail('');
            setShouldSubmit(false);
            setShowSuccess(false);
        }
    }, [isSubmitting]);

    const handleSuccess = useCallback(() => {
        setShowSuccess(true);
        setShouldSubmit(false);
        setIsSubmitting(false);
        const timer = setTimeout(() => {
            handleClose();
        }, 2000);
        return () => clearTimeout(timer);
    }, [handleClose]);

    const openModal = useCallback((variant: 'dark' | 'light') => {
        setModalVariant(variant);
        setIsOpen(true);
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
    }, []);

    const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        
        if (value && isValidating) {
            if (!isValidEmail(value)) {
                setError('Please enter a valid email address');
            } else {
                setError(null);
            }
        }
    }, [isValidating]);

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        
        if (!isValidEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }
        
        setError(null);
        setIsSubmitting(true);
        setShouldSubmit(true);
    }, [email]);

    const handleBackdropClick = useCallback((e: React.MouseEvent) => {
        if (e.target === e.currentTarget && !isSubmitting && !showSuccess) {
            handleClose();
        }
    }, [isSubmitting, showSuccess, handleClose]);

    // Memoized values
    const contextValue = useMemo<EmailSignupModalContextType>(() => ({
        openModal
    }), [openModal]);

    // Effects
    useEffect(() => {
        setMounted(true);
        return () => {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        };
    }, []);

    useEffect(() => {
        if (autoOpen) {
            const timer = setTimeout(() => {
                setModalVariant('dark');
                setIsOpen(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [autoOpen]);

    useEffect(() => {
        if (isOpen) {
            document.documentElement.style.overflow = 'hidden'
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.documentElement.style.overflow = ''
            document.body.style.overflow = ''
        }
    }, [isOpen]);

    if (!mounted) return null;

	return (
		<EmailSignupModalContext.Provider value={contextValue}>
			{children}
			<AnimatePresence>
				{isOpen && (
					<div className="fixed inset-0 z-[9999] overflow-hidden">
						<motion.div 
							className="fixed inset-0 bg-black/15 backdrop-blur-sm"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={handleBackdropClick}
						/>

					<div className="fixed inset-0 overflow-hidden flex items-center justify-center p-4 sm:p-6 md:p-8">
						<div 
							className={cn(
								"p-8 rounded-lg w-full max-w-md animate-in fade-in duration-300 shadow-xl relative will-change-transform",
								modalVariant === 'dark' 
									? "bg-[#191c2b] border border-[#66f770]/90" 
									: "bg-white border border-[#191c2b]/40"
							)}
							onClick={(e) => e.stopPropagation()}
						>
							  <button
								onClick={handleClose}
								className={cn(
								  "absolute top-4 right-4 transition-colors",
								  modalVariant === 'dark' 
									? "text-white/70 hover:text-white" 
									: "text-gray-500 hover:text-gray-700"
								)}
								disabled={isSubmitting}
							  >
								<X className="w-6 h-6" />
							  </button>
							  {showSuccess ? (
								<div className="text-center py-8">
								  <div className="flex justify-center mb-4">
									<div className={cn(
									  "p-3 rounded-full",
									  modalVariant === 'dark' ? "bg-[#66f770]/10" : "bg-[#191c2b]/10"
									)}>
									  <Check className={cn(
										"w-8 h-8",
										modalVariant === 'dark' ? "text-[#66f770]" : "text-[#191c2b]"
									  )} />
									</div>
								  </div>
								  <p className={cn(
									"text-2xl font-semibold mb-3",
									modalVariant === 'dark' ? "text-[#66f770]" : "text-[#66f770]"
								  )}>Thanks for signing up!</p>
								  <p className={modalVariant === 'dark' ? "text-white text-lg" : "text-gray-700 text-lg"}>
									We'll keep you updated on our progress.
								  </p>
								</div>
							  ) : (
								<>
								  <h2 className={cn(
									"text-2xl font-semibold mb-4",
									modalVariant === 'dark' ? "text-white" : "text-gray-900"
								  )}>Join MoMoola</h2>
								  <p className={modalVariant === 'dark' ? "text-white mb-6" : "text-gray-700 mb-6"}>
									Sign up for early access and stay up to date with our progress!
								  </p>
  <form onSubmit={handleSubmit} className="space-y-4">
    {error && (
        <p className={cn(
            "text-sm",
            modalVariant === 'dark' ? "text-red-400" : "text-red-600"
        )}>
            {error}
        </p>
    )}
    <input
      type="email"
      pattern={emailPattern}
      value={email}
      onChange={handleEmailChange}
      onBlur={() => setIsValidating(true)}
      placeholder="Enter your email"
      className={cn(
        "w-full p-3 rounded focus:outline-none transition-colors",
        modalVariant === 'dark' 
          ? "bg-[#2a2f42] text-white border border-white/10 focus:border-[#66f770]"
          : "bg-[#191c2b]/5 text-[#191c2b] border border-[#191c2b]/20 focus:border-[#191c2b] focus:border-2",
        error && "border-red-500"
      )}
      required
      disabled={isSubmitting}
    />
    <motion.div>
      <Button
        type="submit"
        className={cn(
          "w-full",
          modalVariant === 'dark'
            ? "bg-[#66f770] text-[#191c2b] hover:bg-[#66f770]/90"
            : "bg-[#191c2b] text-white hover:bg-[#191c2b]/90"
        )}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing up...
          </>
        ) : (
          'Sign up'
        )}
      </Button>
    </motion.div>

    <EmailOctopusForm 
      email={shouldSubmit ? email : undefined} 
      onSuccess={handleSuccess}
      onError={(message) => {
        setError(message);
        setIsSubmitting(false);
        setShouldSubmit(false);
      }}
    />
  </form>

								</>
							  )}
						</div>
					</div>
				</div>
				)}
			</AnimatePresence>
		</EmailSignupModalContext.Provider>
	)
}

export const EmailSignupModal = React.memo(function EmailSignupModal({ 
    buttonClassName,
    variant = 'dark' 
}: { 
    buttonClassName?: string,
    variant?: 'dark' | 'light'
}) {
    const { openModal } = useEmailSignupModal();

    const handleClick = useCallback(() => {
        openModal(variant);
    }, [openModal, variant]);

    return (
        <motion.div className="inline-block">
            <Button
                size="lg"
                className={cn(buttonClassName)}
                onClick={handleClick}
            >
                Sign up here <MoveRight className="w-4 h-4" />
            </Button>
        </motion.div>
    );
});



