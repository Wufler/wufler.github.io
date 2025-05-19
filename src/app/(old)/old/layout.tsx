import type { Metadata } from 'next'
import { Inter, Nunito, Source_Code_Pro } from 'next/font/google'
import { Toaster } from './components/ui/sonner'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const nunito = Nunito({
	subsets: ['latin'],
	variable: '--font-nunito',
	display: 'swap',
})
const source = Source_Code_Pro({
	subsets: ['latin'],
	variable: '--font-source',
	display: 'swap',
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
			<body className={`${inter.className} ${source.variable} ${nunito.variable}`}>
				{children}
				<Toaster position="bottom-left" />
			</body>
		</html>
	)
}
