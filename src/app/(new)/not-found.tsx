'use client'
import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
	return (
		<>
			<main className="grid min-h-dvh bg-black place-items-center px-6 py-24 sm:py-32 lg:px-8">
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,0,0,0.3),rgba(255,255,255,0))]" />
				<div className="max-w-md text-center z-50">
					<div className="mb-8 text-9xl font-bold text-white opacity-20">404</div>
					<h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
						Page Not Found
					</h1>
					<div className="h-1 w-20 mx-auto bg-orange-400 mb-6 rounded-full"></div>
					<p className="mb-8 text-lg leading-7 text-gray-300">
						The page you&apos;re looking for seems to have dived somewhere else.
					</p>
					<div className="flex items-center justify-center gap-x-4">
						<Link
							href="/"
							className="flex items-center rounded-lg bg-orange-500 px-5 py-3 text-white font-medium hover:bg-orange-600 transition-colors duration-300"
						>
							<Home className="mr-2 h-5 w-5" />
							Go Home
						</Link>
						<Link
							href="#"
							onClick={() => window.history.back()}
							className="flex items-center rounded-lg border border-gray-500 px-5 py-3 text-gray-200 font-medium hover:bg-gray-800 transition-colors duration-300"
						>
							<ArrowLeft className="mr-2 h-5 w-5" />
							Go Back
						</Link>
					</div>
				</div>
			</main>
		</>
	)
}
