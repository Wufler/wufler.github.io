'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import TypeScript from './ui/icons/typescript'
import ReactIcon from './ui/icons/react'
import Nextjs from './ui/icons/nextjs'
import TailwindCSS from './ui/icons/tailwind'
import PostgreSQL from './ui/icons/postgresql'
import Prisma from './ui/icons/prisma'

export default function About({
	onClose,
	builds,
}: {
	onClose: () => void
	builds: Build[]
}) {
	const [selectedPage, setSelectedPage] = useState(0)
	const [slideDirection, setSlideDirection] = useState(0)
	const [nextSound, setNextSound] = useState<HTMLAudioElement | null>(null)

	useEffect(() => {
		const nextAudio = new Audio('/next.wav')
		nextAudio.volume = 0.4
		setNextSound(nextAudio)
	}, [])

	const pages = [
		{
			title: 'ABOUT ME',
			subtitle: 'WEB DEVELOPER',
			content: (
				<div className="text-white space-y-6 pb-12">
					<p className="leading-relaxed text-lg">
						Hi! I'm Philip Huynh, a full-stack developer. I make some fun things.
					</p>

					<h3 className="text-[#dfc931] font-bold text-xl mt-4 mb-4">
						Skills & Technologies
					</h3>

					<div className="grid grid-cols-2 gap-4">
						{[
							{ Icon: TypeScript, name: 'TypeScript' },
							{ Icon: ReactIcon, name: 'React' },
							{ Icon: Nextjs, name: 'Next.js' },
							{ Icon: TailwindCSS, name: 'TailwindCSS' },
							{ Icon: PostgreSQL, name: 'PostgreSQL' },
							{ Icon: Prisma, name: 'Prisma' },
						].map(({ Icon, name }) => (
							<div key={name} className="group relative">
								<div className="bg-[#dfc931] p-4 rounded-lg">
									<div className="flex items-center gap-3">
										<div className="bg-gradient-to-br from-orange-500 to-red-700 rounded-lg p-1.5">
											<Icon className="size-6 text-white" />
										</div>
										<h3 className="font-bold text-black">{name}</h3>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			),
		},
		{
			title: 'PROJECTS',
			subtitle: 'CURRENTLY BUILDING',
			content: (
				<div className="text-black space-y-4">
					{builds.map((build, index) => (
						<div key={index} className="mb-4">
							<div className="group relative">
								<div className="bg-[#dfc931]/90 p-4 rounded-lg backdrop-blur-sm transform transition-transform group-hover:scale-105">
									<h3 className="font-bold mb-2">{build.title}</h3>
									<p>{build.description}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			),
		},
	]

	const handleNextPage = () => {
		setSlideDirection(1)
		setSelectedPage(prev => (prev + 1) % pages.length)
		nextSound?.play()
	}

	const handlePrevPage = () => {
		setSlideDirection(-1)
		setSelectedPage(prev => (prev - 1 + pages.length) % pages.length)
		nextSound?.play()
	}

	const currentPage = pages[selectedPage]

	return (
		<div className="bg-gradient-to-b from-[#c85825]/80 to-[#a04b26]/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl w-[450px] h-full relative">
			<div className="p-6 h-full overflow-y-auto">
				<div className="flex items-center justify-between mb-2">
					<div className="h-12 w-full relative flex items-center justify-between gap-4">
						<AnimatePresence initial={false} mode="wait" custom={slideDirection}>
							<motion.h1
								key={`title-${currentPage.title}`}
								className="text-4xl font-bold whitespace-nowrap"
								custom={slideDirection}
								initial={{ x: slideDirection * 50, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								exit={{ x: -slideDirection * 50, opacity: 0 }}
								transition={{ duration: 0.2 }}
							>
								{currentPage.title}
							</motion.h1>
						</AnimatePresence>
						<button
							onClick={onClose}
							className="hover:text-yellow-200 transition-colors"
							aria-label="Close"
						>
							<X size={24} />
						</button>
					</div>
				</div>

				<div className="mt-2 flex justify-between">
					<AnimatePresence initial={false} mode="wait" custom={slideDirection}>
						<motion.div
							key={`subtitle-${currentPage.subtitle}`}
							custom={slideDirection}
							initial={{ x: slideDirection * 50, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							exit={{ x: -slideDirection * 50, opacity: 0 }}
							transition={{ duration: 0.2 }}
							className="text-[#dfc931] font-bold text-xl"
						>
							{currentPage.subtitle}
						</motion.div>
					</AnimatePresence>
					<div className="flex gap-2">
						<button
							onClick={handlePrevPage}
							className="hover:text-yellow-200 transition-colors"
						>
							<ArrowLeft />
						</button>
						<button
							onClick={handleNextPage}
							className="hover:text-yellow-200 transition-colors"
						>
							<ArrowRight />
						</button>
					</div>
				</div>

				<div className="border-b-2 border-dashed border-[#dfc931] mt-2 mb-6"></div>

				<div className="relative h-[calc(100%-180px)] overflow-visible">
					<div className="overflow-y-auto h-full px-3 -mx-3">
						<AnimatePresence initial={false} mode="wait" custom={slideDirection}>
							<motion.div
								key={`content-${currentPage.title}`}
								className="absolute inset-0"
								custom={slideDirection}
								initial={{
									x: slideDirection * 20,
									opacity: 0,
								}}
								animate={{
									x: 0,
									opacity: 1,
								}}
								exit={{
									x: -slideDirection * 20,
									opacity: 0,
								}}
								transition={{
									duration: 0.2,
									ease: 'easeInOut',
								}}
							>
								{currentPage.content}
							</motion.div>
						</AnimatePresence>
					</div>
				</div>
			</div>

			<div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
				{pages.map((_, i) => (
					<motion.button
						key={i}
						className={cn(
							'h-2 w-2 rounded-full transition-colors',
							i === selectedPage ? 'bg-yellow-400' : 'bg-white'
						)}
						onClick={() => {
							setSlideDirection(i > selectedPage ? 1 : -1)
							setSelectedPage(i)
							nextSound?.play()
						}}
						whileHover={{ scale: 1.2 }}
						whileTap={{ scale: 0.8 }}
					/>
				))}
			</div>
		</div>
	)
}
