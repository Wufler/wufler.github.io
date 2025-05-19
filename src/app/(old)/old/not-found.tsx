import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
	return (
		<>
			<main className="grid h-dvh place-items-center bg-[#1b1b1b] px-6 py-24 sm:py-32 lg:px-8 nunito">
				<div className="text-center">
					<h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
						Something happened!
					</h1>
					<p className="mt-6 text-base leading-7 text-gray-300">
						{"This page doesn't exist! 🤔"}
					</p>
					<div className="mt-6 flex items-center justify-center gap-x-6">
						<Link
							href={'/old'}
							className="rounded-md bg-orange-400 px-2 py-1 hover:bg-orange-500"
						>
							<ArrowLeft className="m-1" />
						</Link>
					</div>
				</div>
			</main>
		</>
	)
}
