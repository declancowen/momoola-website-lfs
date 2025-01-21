"use client"

import * as React from "react"
import { EmailSignupModal } from "./email-signup-modal"

export function WhiteEmailSignupModal({ buttonClassName }: { buttonClassName?: string }) {
	return (
		<EmailSignupModal
			buttonClassName={buttonClassName}
			variant="light"
		/>
	)
}

