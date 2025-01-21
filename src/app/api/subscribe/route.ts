import { NextResponse } from 'next/server'

const API_KEY = process.env.EMAIL_OCTOPUS_API_KEY
const LIST_ID = process.env.EMAIL_OCTOPUS_LIST_ID

export async function POST(request: Request) {
	if (!API_KEY || !LIST_ID) {
		return NextResponse.json(
			{ success: false, message: 'API configuration missing' },
			{ status: 500 }
		)
	}

	try {
		const { email } = await request.json()

		const response = await fetch(
			`https://emailoctopus.com/api/1.6/lists/${LIST_ID}/contacts`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					api_key: API_KEY,
					email_address: email,
				}),
			}
		)

		const data = await response.json()

		if (!response.ok) {
			throw new Error(data.error?.message || 'Failed to subscribe')
		}

		return NextResponse.json({ success: true })
	} catch (error) {
		console.error('Subscription error:', error)
		return NextResponse.json(
			{ success: false, message: error instanceof Error ? error.message : 'Failed to subscribe' },
			{ status: 500 }
		)
	}
}