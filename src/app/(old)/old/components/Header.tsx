'use client'
import { ArrowDown } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
	function smooth() {
		const element = document.querySelector('#projects')
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' })
		}
	}

	return (
		<div className="text-center bg-gradient-to-r from-orange-500 via-orange-500 to-yellow-500 h-full w-full md:w-[45%] lg:w-[35%] flex flex-col justify-center gap-2 md:gap-0 md:justify-evenly items-center">
			<Link href={'/'} className="absolute top-4 left-4">
				new portfolio
			</Link>
			<Link href="https://github.com/WoIfey" target="_blank">
				<h1 className="text-[4rem] xl:text-[5rem] drop-shadow-xl text-orange-100 transition-all duration-300 hover:scale-110 uppercase">
					wolfey
				</h1>
			</Link>
			<Link href="https://github.com/WoIfey/woifey.github.io" target="_blank">
				<h1 className="text-[4rem] xl:text-[5rem] drop-shadow-xl transition-all duration-300 hover:scale-110 uppercase">
					github
				</h1>
			</Link>
			<button type="button" className="m-2 md:hidden block" onClick={smooth}>
				<ArrowDown className="bg-orange-300 rounded-full p-2 size-12 text-black hover:bg-orange-200 transition-all duration-150 hover:scale-110" />
			</button>
		</div>
	)
}
