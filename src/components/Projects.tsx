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
}: Projects & { onClose?: () => void }) {
	const [selectedPage, setSelectedPage] = useState(-1)
	const [slideDirection, setSlideDirection] = useState(0)
	const [nextSound, setNextSound] = useState<HTMLAudioElement | null>(null)
	const [openSound, setOpenSound] = useState<HTMLAudioElement | null>(null)
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
		const openAudio = new Audio('/open.wav')
		openAudio.volume = 0.2
		setOpenSound(openAudio)
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
							localFullscreen
								? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
								: 'grid-cols-1'
						} gap-6 pb-6`}
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
								<Link
									href={project.href || ''}
									target="_blank"
									onClick={handleProjectClick}
									onMouseEnter={() => playMoveSound()}
								>
									<div className="relative rounded-xl overflow-hidden group shadow-lg hover:scale-102 transition-transform duration-200 h-56">
										<Image
											src={project.images[0]}
											alt={project.title}
											fill
											className="object-cover w-full h-full group-hover:brightness-110 transition"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
										{project.status && (
											<div className="absolute top-3 left-3 z-20 flex gap-2">
												{project.status.map((status, i) => (
													<span
														key={i}
														className={cn(
															'text-xs font-bold px-3 py-1 rounded-full shadow',
															status.toLowerCase() === 'new'
																? 'bg-[#4CAF50] text-white'
																: status.toLowerCase() === 'updated'
																? 'bg-[#009dff] text-white'
																: status.toLowerCase() === 'outdated'
																? 'bg-[#f1381f] text-white'
																: 'bg-[#f1651f] text-white'
														)}
													>
														{status}
													</span>
												))}
											</div>
										)}
										<div className="absolute bottom-0 left-0 right-0 p-4 z-20">
											<div className="flex flex-wrap gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
												{project.tags.map((tag, i) => (
													<span
														key={i}
														className="bg-[#dfc931] text-black text-xs font-semibold px-2 py-1 rounded-full"
													>
														{tag}
													</span>
												))}
											</div>
											<h3 className="text-2xl font-bold text-white drop-shadow">
												{project.title}
											</h3>
											<p className="text-white/90 text-sm mt-1 drop-shadow">
												{project.subtitle}
											</p>
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
		if (selectedPage === pages.length - 1) {
			setSelectedPage(-1)
		} else if (selectedPage === -1) {
			setSelectedPage(0)
		} else {
			setSelectedPage(prev => prev + 1)
		}
		nextSound?.play()
	}

	const handlePrevPage = () => {
		setSlideDirection(-1)
		if (selectedPage === 0) {
			setSelectedPage(-1)
		} else if (selectedPage === -1) {
			setSelectedPage(pages.length - 1)
		} else {
			setSelectedPage(prev => prev - 1)
		}
		nextSound?.play()
	}

	const pageTitle = selectedPage === -1 ? 'ALL' : pages[selectedPage]?.title
	const pageSubtitle =
		selectedPage === -1 ? 'PROJECTS' : pages[selectedPage]?.subtitle

	const toggleFullscreen = () => {
		const newFullscreenState = !localFullscreen
		setLocalFullscreen(newFullscreenState)

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
						<div className="flex flex-col h-full">
							<div className="p-6 flex-1 overflow-y-auto">
								<div className="flex items-center justify-between mb-2">
									<div className="h-12 w-full relative flex items-center justify-between gap-4">
										<AnimatePresence initial={false} mode="wait" custom={slideDirection}>
											<motion.h1
												key={`title-${pageTitle}`}
												className="text-4xl font-bold text-white whitespace-nowrap"
												custom={slideDirection}
												initial={{ x: slideDirection * 50, opacity: 0 }}
												animate={{ x: 0, opacity: 1 }}
												exit={{ x: -slideDirection * 50, opacity: 0 }}
												transition={{ duration: 0.2 }}
											>
												{pageTitle}
											</motion.h1>
										</AnimatePresence>
										<div className="flex gap-3">
											<button
												onClick={() => {
													toggleFullscreen()
													openSound?.play()
												}}
												className="hidden lg:block text-white hover:text-yellow-200 transition-colors"
											>
												<Minimize size={24} />
											</button>
											<button
												onClick={onClose}
												className="text-white hover:text-yellow-200 transition-colors lg:hidden"
											>
												<X size={24} />
											</button>
										</div>
									</div>
								</div>

								<div className="mt-2 flex justify-between">
									<h2 className="text-[#dfc931] font-bold text-xl">{pageSubtitle}</h2>
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
											{selectedPage === -1 ? (
												<motion.div
													key="all-categories"
													className="absolute inset-0"
													custom={slideDirection}
													initial={{ x: slideDirection * 20, opacity: 0 }}
													animate={{ x: 0, opacity: 1 }}
													exit={{ x: -slideDirection * 20, opacity: 0 }}
													transition={{ duration: 0.2, ease: 'easeInOut' }}
												>
													<div>
														{categories.map((category, categoryIndex) => {
															const categoryProjects = projects.filter(
																project => project.category === category && project.visible
															)
															return (
																<div key={category} className="relative">
																	<motion.div
																		initial={{ opacity: 0, y: 20 }}
																		animate={{ opacity: 1, y: 0 }}
																		transition={{ delay: categoryIndex * 0.1 }}
																	>
																		<h2 className="text-2xl font-bold text-white mb-3">
																			{category.toUpperCase()}
																		</h2>
																		<div
																			className={`grid ${
																				localFullscreen
																					? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
																					: 'grid-cols-1'
																			} gap-6 pb-6`}
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
																					<Link
																						href={project.href || ''}
																						target="_blank"
																						onClick={handleProjectClick}
																						onMouseEnter={() => playMoveSound()}
																					>
																						<div className="relative rounded-xl overflow-hidden group shadow-lg hover:scale-102 transition-transform duration-200 h-64">
																							<Image
																								src={project.images[0]}
																								alt={project.title}
																								fill
																								className="object-cover w-full h-full group-hover:brightness-110 transition"
																							/>
																							<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
																							{project.status && (
																								<div className="absolute top-3 left-3 z-20 flex gap-2">
																									{project.status.map((status, i) => (
																										<span
																											key={i}
																											className={cn(
																												'text-xs font-bold px-3 py-1 rounded-full shadow',
																												status.toLowerCase() === 'new'
																													? 'bg-[#4CAF50] text-white'
																													: status.toLowerCase() === 'updated'
																													? 'bg-[#009dff] text-white'
																													: status.toLowerCase() === 'outdated'
																													? 'bg-[#f1381f] text-white'
																													: 'bg-[#f1651f] text-white'
																											)}
																										>
																											{status}
																										</span>
																									))}
																								</div>
																							)}
																							<div className="absolute bottom-0 left-0 right-0 p-4 z-20">
																								<div className="flex flex-wrap gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
																									{project.tags.map((tag, i) => (
																										<span
																											key={i}
																											className="bg-[#dfc931] text-black text-xs font-semibold px-2 py-1 rounded-full"
																										>
																											{tag}
																										</span>
																									))}
																								</div>
																								<h3 className="text-2xl font-bold text-white drop-shadow">
																									{project.title}
																								</h3>
																								<p className="text-white/90 text-sm mt-1 drop-shadow">
																									{project.subtitle}
																								</p>
																							</div>
																						</div>
																					</Link>
																				</motion.div>
																			))}
																		</div>
																	</motion.div>
																</div>
															)
														})}
													</div>
												</motion.div>
											) : (
												<motion.div
													key={`content-${pageTitle}`}
													className="absolute inset-0"
													custom={slideDirection}
													initial={{ x: slideDirection * 20, opacity: 0 }}
													animate={{ x: 0, opacity: 1 }}
													exit={{ x: -slideDirection * 20, opacity: 0 }}
													transition={{ duration: 0.2, ease: 'easeInOut' }}
												>
													{pages[selectedPage]?.content}
												</motion.div>
											)}
										</AnimatePresence>
									</div>
								</div>
							</div>
							<div className="flex justify-center gap-2 flex-wrap my-4">
								<motion.button
									key="all-categories"
									className={cn(
										'px-3 py-1 rounded-full text-sm font-medium transition-colors',
										selectedPage === -1
											? 'bg-yellow-400 text-gray-900'
											: 'bg-white/20 text-white hover:bg-white/30'
									)}
									onClick={() => {
										setSlideDirection(-1)
										setSelectedPage(-1)
										nextSound?.play()
									}}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									All
								</motion.button>
								{categories.map((category, i) => (
									<motion.button
										key={category}
										className={cn(
											'px-3 py-1 rounded-full text-sm font-medium transition-colors',
											selectedPage === i
												? 'bg-yellow-400 text-gray-900'
												: 'bg-white/20 text-white hover:bg-white/30'
										)}
										onClick={() => {
											setSlideDirection(i > selectedPage ? 1 : -1)
											setSelectedPage(i)
											nextSound?.play()
										}}
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										{category}
									</motion.button>
								))}
							</div>
						</div>
					</motion.div>
				) : (
					<motion.div
						key="normal"
						className="w-full h-[90vh] bg-gradient-to-b from-[#c85825]/80 to-[#a04b26]/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl relative"
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						transition={{ duration: 0.15, ease: 'easeOut' }}
					>
						<div className="flex flex-col h-full">
							<div className="p-6 flex-1 overflow-y-auto">
								<div className="flex items-center justify-between mb-2">
									<div className="h-12 w-full relative flex items-center justify-between gap-4">
										<AnimatePresence initial={false} mode="wait" custom={slideDirection}>
											<motion.h1
												key={`title-${pageTitle}`}
												className="text-4xl font-bold text-white whitespace-nowrap"
												custom={slideDirection}
												initial={{ x: slideDirection * 50, opacity: 0 }}
												animate={{ x: 0, opacity: 1 }}
												exit={{ x: -slideDirection * 50, opacity: 0 }}
												transition={{ duration: 0.2 }}
											>
												{pageTitle}
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
									<h2 className="text-[#dfc931] font-bold text-xl">{pageSubtitle}</h2>
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

								<div className="border-b-2 border-dashed border-[#dfc931] mt-2 mb-3"></div>

								<div className="relative h-[calc(100%-180px)] overflow-visible">
									<div className="overflow-y-auto h-full px-3 -mx-3">
										<AnimatePresence initial={false} mode="wait" custom={slideDirection}>
											{selectedPage === -1 ? (
												<motion.div
													key="all-categories"
													className="absolute inset-0"
													custom={slideDirection}
													initial={{ x: slideDirection * 20, opacity: 0 }}
													animate={{ x: 0, opacity: 1 }}
													exit={{ x: -slideDirection * 20, opacity: 0 }}
													transition={{ duration: 0.2, ease: 'easeInOut' }}
												>
													<div>
														{categories.map((category, categoryIndex) => {
															const categoryProjects = projects.filter(
																project => project.category === category && project.visible
															)
															return (
																<div key={category} className="relative">
																	<motion.div
																		initial={{ opacity: 0, y: 20 }}
																		animate={{ opacity: 1, y: 0 }}
																		transition={{ delay: categoryIndex * 0.1 }}
																	>
																		<h2 className="text-2xl font-bold text-white mb-3">
																			{category.toUpperCase()}
																		</h2>
																		<div
																			className={`grid ${
																				localFullscreen
																					? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
																					: 'grid-cols-1'
																			} gap-6 pb-6`}
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
																					<Link
																						href={project.href || ''}
																						target="_blank"
																						onClick={handleProjectClick}
																						onMouseEnter={() => playMoveSound()}
																					>
																						<div className="relative rounded-xl overflow-hidden group shadow-lg hover:scale-102 transition-transform duration-200 h-48">
																							<Image
																								src={project.images[0]}
																								alt={project.title}
																								fill
																								className="object-cover w-full h-full group-hover:brightness-110 transition"
																							/>
																							<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
																							{project.status && (
																								<div className="absolute top-3 left-3 z-20 flex gap-2">
																									{project.status.map((status, i) => (
																										<span
																											key={i}
																											className={cn(
																												'text-xs font-bold px-3 py-1 rounded-full shadow',
																												status.toLowerCase() === 'new'
																													? 'bg-[#4CAF50] text-white'
																													: status.toLowerCase() === 'updated'
																													? 'bg-[#009dff] text-white'
																													: status.toLowerCase() === 'outdated'
																													? 'bg-[#f1381f] text-white'
																													: 'bg-[#f1651f] text-white'
																											)}
																										>
																											{status}
																										</span>
																									))}
																								</div>
																							)}
																							<div className="absolute bottom-0 left-0 right-0 p-4 z-20">
																								<div className="flex flex-wrap gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
																									{project.tags.map((tag, i) => (
																										<span
																											key={i}
																											className="bg-[#dfc931] text-black text-xs font-semibold px-2 py-1 rounded-full"
																										>
																											{tag}
																										</span>
																									))}
																								</div>
																								<h3 className="text-2xl font-bold text-white drop-shadow">
																									{project.title}
																								</h3>
																								<p className="text-white/90 text-sm mt-1 drop-shadow">
																									{project.subtitle}
																								</p>
																							</div>
																						</div>
																					</Link>
																				</motion.div>
																			))}
																		</div>
																	</motion.div>
																</div>
															)
														})}
													</div>
												</motion.div>
											) : (
												<motion.div
													key={`content-${pageTitle}`}
													className="absolute inset-0"
													custom={slideDirection}
													initial={{ x: slideDirection * 20, opacity: 0 }}
													animate={{ x: 0, opacity: 1 }}
													exit={{ x: -slideDirection * 20, opacity: 0 }}
													transition={{ duration: 0.2, ease: 'easeInOut' }}
												>
													{pages[selectedPage]?.content}
												</motion.div>
											)}
										</AnimatePresence>
									</div>
								</div>
							</div>
							<div className="flex justify-center gap-2 flex-wrap my-4">
								<motion.button
									key="all-categories"
									className={cn(
										'px-3 py-1 rounded-full text-sm font-medium transition-colors',
										selectedPage === -1
											? 'bg-yellow-400 text-gray-900'
											: 'bg-white/20 text-white hover:bg-white/30'
									)}
									onClick={() => {
										setSlideDirection(-1)
										setSelectedPage(-1)
										nextSound?.play()
									}}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									All
								</motion.button>
								{categories.map((category, i) => (
									<motion.button
										key={category}
										className={cn(
											'px-3 py-1 rounded-full text-sm font-medium transition-colors',
											selectedPage === i
												? 'bg-yellow-400 text-gray-900'
												: 'bg-white/20 text-white hover:bg-white/30'
										)}
										onClick={() => {
											setSlideDirection(i > selectedPage ? 1 : -1)
											setSelectedPage(i)
											nextSound?.play()
										}}
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										{category}
									</motion.button>
								))}
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}
