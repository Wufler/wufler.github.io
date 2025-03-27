'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowLeft, ArrowRight, Maximize, Minimize, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export default function Projects({
	projects,
	handleProjectClick,
	playMoveSound,
	onClose,
	isFullscreen,
	onFullscreenChange,
}: Projects & { onClose: () => void }) {
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
		const nextAudio = new Audio('/next.wav')
		nextAudio.volume = 0.4
		setNextSound(nextAudio)
	}, [])

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

	const categories = [...new Set(projects.map(project => project.category))]
	const pages = categories.map(category => {
		const categoryProjects = projects.filter(
			project => project.category === category && project.visible
		)

		return {
			title: category.toUpperCase(),
			subtitle: 'PROJECTS',
			content: (
				<div className="text-white">
					<div
						className={`grid ${
							localFullscreen ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
						} gap-6 pb-12`}
					>
						{categoryProjects.map((project, index) => (
							<motion.div
								key={project.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{
									opacity: 1,
									y: 0,
									transition: {
										delay: index * 0.1,
										duration: 0.4,
										ease: 'easeOut',
									},
								}}
								className="transform-gpu overflow-visible"
							>
								<Link href={project.href} target="_blank" onClick={handleProjectClick}>
									<div
										className="bg-gradient-to-br from-[#dfc931]/90 to-[#e5b822]/90 p-6 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg relative group will-change-transform"
										onMouseEnter={() => playMoveSound()}
									>
										<div className="flex gap-2 items-center absolute left-4 -top-2 z-10">
											{project.status &&
												project.status.map((status, i) => (
													<motion.div
														key={i}
														className={cn(
															'text-white font-bold py-0.5 px-3 rounded-full shadow-sm',
															status.toLowerCase() === 'new'
																? 'bg-[#4CAF50]'
																: status.toLowerCase() === 'updated'
																? 'bg-[#009dff]'
																: status.toLowerCase() === 'outdated'
																? 'bg-[#f1381f]'
																: 'bg-[#f1651f]'
														)}
													>
														{status}
													</motion.div>
												))}
										</div>

										<div className="flex flex-col gap-4">
											<div className="flex flex-row justify-between gap-4">
												<div className="space-y-3 flex-1">
													<h3 className="font-bold text-xl mb-2 text-gray-900">
														{project.title}
													</h3>
													<p className="text-sm text-gray-800 leading-relaxed line-clamp-3">
														{project.description}
													</p>
												</div>

												<div className="flex-shrink-0">
													<div className="relative overflow-hidden rounded-lg shadow-md transform transition-transform duration-200 group-hover:rotate-5 group-hover:scale-105">
														<Image
															src={project.img}
															alt={project.title}
															width={120}
															height={120}
															className="object-cover transition duration-300 group-hover:brightness-110"
														/>
													</div>
												</div>
											</div>

											<div className="flex flex-wrap gap-2">
												{project.tags.map((tag, index) => (
													<span
														key={index}
														className="inline-block bg-[#dfc931] text-black text-xs font-semibold px-2 py-1 rounded-full"
													>
														{tag}
													</span>
												))}
											</div>
										</div>
									</div>
								</Link>
							</motion.div>
						))}
					</div>
				</div>
			),
		}
	})

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
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
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
											className="text-white hover:text-yellow-200 transition-colors"
										>
											<X size={24} />
										</button>
									</div>
								</div>
							</div>

							<div className="mt-2 flex justify-between">
								<h2 className="text-[#dfc931] font-bold text-xl">
									{currentPage.subtitle}
								</h2>
								<div className="flex gap-3">
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
					</motion.div>
				) : (
					<>
						<motion.div
							key="normal"
							className="w-[450px] h-full bg-gradient-to-b from-[#c85825]/80 to-[#a04b26]/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl relative"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
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
											<button
												onClick={onClose}
												className="text-white hover:text-yellow-200 transition-colors"
											>
												<X size={24} />
											</button>
										</div>
									</div>
								</div>

								<div className="mt-2 flex justify-between">
									<h2 className="text-[#dfc931] font-bold text-xl">
										{currentPage.subtitle}
									</h2>
									<div className="flex gap-3">
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
						</motion.div>
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
					</>
				)}
			</AnimatePresence>
		</>
	)
}
