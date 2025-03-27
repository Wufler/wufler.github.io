'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import Buttons from './Buttons'
import About from './About'
import Container from './Container'
import Projects from './Projects'
import SparklesIcon from './ui/icons/sparkles'
import Link from 'next/link'
import Image from 'next/image'
import FilePenLineIcon from './ui/icons/pen-file'

export default function Menu({
	projects,
	builds,
}: {
	projects: Project[]
	builds: Build[]
}) {
	const [openSound, setOpenSound] = useState<HTMLAudioElement | null>(null)
	const [closeSound, setCloseSound] = useState<HTMLAudioElement | null>(null)
	const [moveSound, setMoveSound] = useState<HTMLAudioElement | null>(null)
	const [projectSound, setProjectSound] = useState<HTMLAudioElement | null>(null)
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [showMenu, setShowMenu] = useState(false)
	const [isFullscreen, setIsFullscreen] = useState(false)

	useEffect(() => {
		const openAudio = new Audio('/open.wav')
		const closeAudio = new Audio('/close.wav')
		const moveAudio = new Audio('/move.wav')
		const projectAudio = new Audio('/project.wav')

		openAudio.volume = 0.2
		closeAudio.volume = 0.2
		moveAudio.volume = 0.4
		projectAudio.volume = 0.4

		setOpenSound(openAudio)
		setCloseSound(closeAudio)
		setMoveSound(moveAudio)
		setProjectSound(projectAudio)
	}, [])

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isFullscreen) {
				setIsFullscreen(false)
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [isFullscreen])

	const playMoveSound = useCallback(() => {
		moveSound?.play()
	}, [moveSound])

	const toggleProjects = () => {
		if (isFullscreen) {
			setIsFullscreen(false)
		}

		if (!isMenuOpen) {
			openSound?.play()
		} else {
			closeSound?.play()
		}
		setIsMenuOpen(!isMenuOpen)
	}

	const toggleAbout = () => {
		if (!showMenu) {
			openSound?.play()
		} else {
			closeSound?.play()
		}
		setShowMenu(!showMenu)
	}

	const handleProjectClick = () => {
		projectSound?.play()
	}

	const handleFullscreenChange = (newFullscreenState: boolean) => {
		setIsFullscreen(newFullscreenState)

		if (newFullscreenState && showMenu) {
			setShowMenu(false)
			closeSound?.play()
		}
	}

	const showOverlay = (isMenuOpen || showMenu) && !isFullscreen

	return (
		<>
			<motion.div
				className={cn(
					'fixed left-0 top-0 h-full bg-gradient-to-r from-[#de7a0f]/20 to-transparent backdrop-blur-sm p-12 flex flex-col z-50',
					isFullscreen && 'opacity-0 pointer-events-none'
				)}
				initial={{ opacity: 0, x: -50 }}
				animate={{ opacity: isFullscreen ? 0 : 1, x: 0 }}
				transition={{ type: 'spring', stiffness: 260, damping: 20 }}
			>
				<div className="flex items-center gap-4">
					<Link href="https://github.com/WoIfey" target="_blank">
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#E67E22] via-[#F39C12] to-[#FFA07A] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
							WOLFEY
						</h1>
					</Link>
					<Link href="/old">
						<Image
							src={'/favicon.ico'}
							width={80}
							height={80}
							alt="🦊"
							className="size-16 md:size-20 relative z-10"
						/>
					</Link>
				</div>

				<div className="flex-grow flex flex-col justify-center space-y-4">
					<Buttons onClick={toggleProjects} name="Projects" icon={SparklesIcon} />
					<Buttons onClick={toggleAbout} name="About me" icon={FilePenLineIcon} />
				</div>
			</motion.div>

			<Container
				showMenu={isMenuOpen}
				otherMenuOpen={showMenu}
				isFullscreen={isFullscreen}
			>
				<div
					className={cn(
						'transition-all duration-300',
						showMenu && !isFullscreen ? 'h-[calc(48vh-16px)]' : 'h-[90vh]'
					)}
				>
					<Projects
						onClose={toggleProjects}
						projects={projects}
						handleProjectClick={handleProjectClick}
						playMoveSound={playMoveSound}
						isFullscreen={isFullscreen}
						onFullscreenChange={handleFullscreenChange}
					/>
				</div>
			</Container>

			<Container showMenu={showMenu} isSecondary={true} otherMenuOpen={isMenuOpen}>
				<div
					className={cn(
						'transition-all duration-300',
						isMenuOpen && !isFullscreen ? 'h-[calc(48vh-16px)]' : 'h-[90vh]'
					)}
				>
					<About onClose={toggleAbout} builds={builds} />
				</div>
			</Container>

			<AnimatePresence>
				{showOverlay && (
					<motion.div
						className="fixed inset-0 z-40"
						onClick={() => {
							if (isMenuOpen) toggleProjects()
							if (showMenu) toggleAbout()
						}}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
					/>
				)}
			</AnimatePresence>
		</>
	)
}
