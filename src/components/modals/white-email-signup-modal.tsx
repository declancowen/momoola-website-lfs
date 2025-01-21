"use client"

import * as React from "react"
import { EmailSignupModal, useEmailSignupModal } from "./email-signup-modal"

export function WhiteEmailSignupModal({ buttonClassName }: { buttonClassName?: string }) {
	try {
		// Verify context is available
		useEmailSignupModal();
		
		return (
			<EmailSignupModal
				buttonClassName={buttonClassName}
				variant="light"
			/>
		);
	} catch (error) {
		console.error('EmailSignupModal error:', error);
		return null;
	}
}


