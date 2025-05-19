'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowLeft, ArrowRight, X, Maximize, Minimize } from 'lucide-react'
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
	isFullscreen,
	onFullscreenChange,
}: {
	onClose?: () => void
	builds: Build[]
	isFullscreen?: boolean
	onFullscreenChange?: (state: boolean) => void
}) {
	const [selectedPage, setSelectedPage] = useState(0)
	const [slideDirection, setSlideDirection] = useState(0)
	const [nextSound, setNextSound] = useState<HTMLAudioElement | null>(null)
	const [localFullscreen, setLocalFullscreen] = useState(false)

	useEffect(() => {
		if (isFullscreen !== undefined) {
			setLocalFullscreen(isFullscreen)
		}
	}, [isFullscreen])

	useEffect(() => {
		const handleResize = () => {
			const isLargeScreen = window.innerWidth >= 1024
			if (!isLargeScreen && !localFullscreen) {
				setLocalFullscreen(true)
				onFullscreenChange?.(true)
			}
		}

		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [localFullscreen, onFullscreenChange])

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
						Hi! I&apos;m Philip Huynh, a full-stack developer. I make some fun things.
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
				<div className="text-white space-y-4">
					{builds.map((build, index) => (
						<div key={index} className="mb-4">
							<div className="group relative">
								<div className="bg-[#dfc931]/90 p-4 rounded-lg backdrop-blur-sm">
									<div className="flex items-start gap-4">
										<div className="mt-1">
											<div className="w-5 h-5 border-2 border-black rounded-sm flex items-center justify-center">
												<div className="w-3 h-3 bg-black rounded-sm"></div>
											</div>
										</div>
										<div className="flex-1">
											<div className="flex items-center justify-between">
												<h3 className="font-bold text-black text-lg">{build.title}</h3>
												<div className="flex gap-2">
													{build.status.map((status, idx) => (
														<span
															key={idx}
															className="px-2 py-0.5 bg-black/20 text-white rounded-full text-xs"
														>
															{status}
														</span>
													))}
												</div>
											</div>
											<p className="text-black/80 mt-1 mb-2">{build.description}</p>
											<div className="flex flex-wrap gap-2">
												{build.tags.map((tag, idx) => (
													<span
														key={idx}
														className="px-2 py-0.5 bg-black/10 text-black rounded text-xs"
													>
														{tag}
													</span>
												))}
											</div>
										</div>
									</div>
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

	const toggleFullscreen = () => {
		const newFullscreenState = !localFullscreen
		setLocalFullscreen(newFullscreenState)
		nextSound?.play()

		if (onFullscreenChange) {
			onFullscreenChange(newFullscreenState)
		}
	}

	return (
		<>
			<AnimatePresence mode="wait">
				{localFullscreen || window?.innerWidth < 1024 ? (
					<motion.div
						key="fullscreen"
						className="fixed lg:inset-12 inset-0 z-[100] bg-gradient-to-b from-[#c85825]/80 to-[#a04b26]/80 backdrop-blur-sm lg:rounded-3xl overflow-hidden shadow-xl"
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						transition={{ duration: 0.15, ease: 'easeOut' }}
					>
						<div className="p-6 h-full overflow-y-auto">
							<div className="flex items-center justify-between mb-2">
								<div className="h-12 w-full relative flex items-center justify-between gap-4">
									<AnimatePresence initial={false} mode="wait" custom={slideDirection}>
										<motion.h1
											key={`title-${currentPage.title}`}
											className="text-4xl font-bold text-white whitespace-nowrap"
											custom={slideDirection}
											initial={{ x: slideDirection * 50, opacity: 0 }}
											animate={{ x: 0, opacity: 1 }}
											exit={{ x: -slideDirection * 50, opacity: 0 }}
											transition={{ duration: 0.2 }}
										>
											{currentPage.title}
										</motion.h1>
									</AnimatePresence>
									<div className="flex gap-3">
										<button
											onClick={toggleFullscreen}
											className="hidden lg:block text-white hover:text-yellow-200 transition-colors"
										>
											<Minimize size={24} />
										</button>
										<button
											onClick={onClose}
											className="text-white hover:text-yellow-200 transition-colors md:hidden"
										>
											<X size={24} />
										</button>
									</div>
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
										className="text-white hover:text-yellow-200 transition-colors"
									>
										<ArrowLeft />
									</button>
									<button
										onClick={handleNextPage}
										className="text-white hover:text-yellow-200 transition-colors"
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
											initial={{ x: slideDirection * 20, opacity: 0 }}
											animate={{ x: 0, opacity: 1 }}
											exit={{ x: -slideDirection * 20, opacity: 0 }}
											transition={{ duration: 0.2, ease: 'easeInOut' }}
										>
											{currentPage.content}
										</motion.div>
									</AnimatePresence>
								</div>
							</div>
						</div>
					</motion.div>
				) : (
					<motion.div
						key="normal"
						className="w-full h-[80vh] bg-gradient-to-b from-[#c85825]/80 to-[#a04b26]/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl relative"
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						transition={{ duration: 0.15, ease: 'easeOut' }}
					>
						<div className="p-6 h-full overflow-y-auto">
							<div className="flex items-center justify-between mb-2">
								<div className="h-12 w-full relative flex items-center justify-between gap-4">
									<AnimatePresence initial={false} mode="wait" custom={slideDirection}>
										<motion.h1
											key={`title-${currentPage.title}`}
											className="text-4xl font-bold text-white whitespace-nowrap"
											custom={slideDirection}
											initial={{ x: slideDirection * 50, opacity: 0 }}
											animate={{ x: 0, opacity: 1 }}
											exit={{ x: -slideDirection * 50, opacity: 0 }}
											transition={{ duration: 0.2 }}
										>
											{currentPage.title}
										</motion.h1>
									</AnimatePresence>
									<div className="flex gap-3">
										<button
											onClick={toggleFullscreen}
											className="hidden lg:block text-white hover:text-yellow-200 transition-colors"
										>
											<Maximize size={24} />
										</button>
									</div>
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
										className="text-white hover:text-yellow-200 transition-colors"
									>
										<ArrowLeft />
									</button>
									<button
										onClick={handleNextPage}
										className="text-white hover:text-yellow-200 transition-colors"
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
											initial={{ x: slideDirection * 20, opacity: 0 }}
											animate={{ x: 0, opacity: 1 }}
											exit={{ x: -slideDirection * 20, opacity: 0 }}
											transition={{ duration: 0.2, ease: 'easeInOut' }}
										>
											{currentPage.content}
										</motion.div>
									</AnimatePresence>
								</div>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}
