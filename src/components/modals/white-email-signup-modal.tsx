"use client"

import * as React from "react"
import { EmailSignupModal, useEmailSignupModal } from "./email-signup-modal"

export function WhiteEmailSignupModal({ buttonClassName }: { buttonClassName?: string }) {
	try {
		// Verify context is available
		useEmailSignupModal();
		
		return (
			<div className="w-full sm:w-auto">
				<EmailSignupModal
					buttonClassName={buttonClassName}
					variant="light"
				/>
			</div>
		);
	} catch (error) {
		console.error('EmailSignupModal error:', error);
		return null;
	}
}


