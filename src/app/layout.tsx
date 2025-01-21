import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/components/footer/footer'
import { EmailSignupModalProvider } from '@/components/modals/email-signup-modal'
import { FloatingNav } from '@/components/navigation/floating-nav'

export const metadata: Metadata = {
	title: 'MoMoola',
	description: 'Identity Made Easy, Access Made Possible',
	icons: {
		icon: '/favicon.ico',
		apple: '/title-icon.png',
	},
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="min-h-screen bg-background font-sans antialiased overflow-x-hidden flex flex-col" suppressHydrationWarning>
				<EmailSignupModalProvider autoOpen={true}>
					<FloatingNav />
					<div className="flex-grow">
						{children}
					</div>
					<Footer />
				</EmailSignupModalProvider>
			</body>
		</html>
	)
}
