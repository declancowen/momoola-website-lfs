"use client"

import { useEffect } from "react"

interface EmailOctopusFormProps {
	onSuccess?: () => void
	onError?: (message: string) => void
	email?: string
}

export function EmailOctopusForm({ onSuccess, onError, email }: EmailOctopusFormProps) {
	useEffect(() => {
		if (!email) return

		const submitForm = async () => {
			try {
				const response = await fetch('/api/subscribe', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email })
				})

				const data = await response.json()

				if (data.success) {
					onSuccess?.()
				} else {
					onError?.(data.message || 'Failed to subscribe')
					console.error('Form submission failed:', data.message)
				}
			} catch (error) {
				onError?.('Network error occurred')
				console.error('Error submitting form:', error)
			}
		}

		submitForm()
	}, [email, onSuccess, onError])

	return null
}



