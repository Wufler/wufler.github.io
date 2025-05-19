import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const quicksand = Quicksand({
	weight: ['400', '700'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-quicksand',
})

export const metadata: Metadata = {
	title: "Wolfey's Portfolio",
	description: "Wolfey's Portfolio made with Next.js",
	openGraph: {
		title: "Wolfey's Portfolio",
		description: 'Check out my stuff!',
		url: 'https://woifey.vercel.app',
		images: [
			{
				url: 'https://wolfey.s-ul.eu/zx1Ow0k4',
				width: 1280,
				height: 720,
				alt: 'Thumbnail',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<meta name="google-adsense-account" content="ca-pub-3750030968413484" />
			<body className={quicksand.variable}>
				{children}
				<Toaster position="bottom-left" />
			</body>
		</html>
	)
}
