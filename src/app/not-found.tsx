import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
	return (
		<>
			<main className="grid h-dvh place-items-center bg-[#1b1b1b] px-6 py-24 sm:py-32 lg:px-8 font-nunito">
				<div className="text-center">
					<h1 className="mt-4 text-3xl font-bold font-source tracking-tight text-white sm:text-5xl">
						Something happened!
					</h1>
					<p className="mt-6 text-base leading-7 text-gray-300">
						Sorry, this page doesn't exist!
					</p>
					<div className="mt-6 flex items-center justify-center gap-x-6">
						<Link
							href={'/'}
							className="rounded-md bg-orange-400 px-2 py-1 hover:bg-orange-500"
						>
							<Image
								src="/arrow-down.svg"
								alt="Down"
								height={32}
								width={32}
								className="rotate-90 p-1"
							/>
						</Link>
					</div>
				</div>
			</main>
		</>
	)
}
