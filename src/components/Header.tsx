'use client'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
	function smooth() {
		const element = document.querySelector('#projects')
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' })
		}
	}

	return (
		<div className="text-center bg-gradient-to-r from-orange-500 via-orange-500 to-yellow-500 h-full w-full md:w-[45%] lg:w-[35%] flex flex-col justify-center md:justify-evenly items-center">
			<Link href="https://github.com/WoIfey" target="_blank">
				<h1 className="text-[4rem] xl:text-[5rem] drop-shadow-xl text-orange-100 transition-all duration-300 ease-in-out transform hover:scale-110">
					WOLFEY
				</h1>
			</Link>
			<Link href="https://github.com/WoIfey/woifey.github.io" target="_blank">
				<h1 className="text-[4rem] xl:text-[5rem] drop-shadow-xl transition-all duration-300 ease-in-out transform hover:scale-110">
					GITHUB
				</h1>
			</Link>
			<div className="md:hidden block">
				<button className="m-2" onClick={smooth}>
					<Image
						src="/arrow-down.svg"
						alt="Down"
						height={32}
						width={32}
						className="bg-orange-200 rounded-full p-2 w-12 h-12"
					/>
				</button>
			</div>
		</div>
	)
}
