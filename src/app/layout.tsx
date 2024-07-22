import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

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
			<body className={inter.className}>{children}</body>
			<Toaster />
		</html>
	)
}
