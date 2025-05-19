'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion } from 'motion/react'
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
	const [isAboutFullscreen, setIsAboutFullscreen] = useState(false)
	const [isMobile, setIsMobile] = useState(false)
	const [wasAboutOpen, setWasAboutOpen] = useState(false)
	const [wasProjectsOpen, setWasProjectsOpen] = useState(false)

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 1024)
			if (window.innerWidth >= 1024) {
				setIsMenuOpen(true)
				setShowMenu(true)
			}
		}

		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

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
			if (e.key === 'Escape') {
				if (isFullscreen) {
					setIsFullscreen(false)
					if (wasAboutOpen) {
						setShowMenu(true)
					}
				}
				if (isAboutFullscreen) {
					setIsAboutFullscreen(false)
					if (wasProjectsOpen) {
						setIsMenuOpen(true)
					}
				}
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [isFullscreen, isAboutFullscreen, wasAboutOpen, wasProjectsOpen])

	const playMoveSound = useCallback(() => {
		moveSound?.play()
	}, [moveSound])

	const toggleProjects = () => {
		if (isFullscreen) {
			setIsFullscreen(false)
		} else if (isAboutFullscreen) {
			setIsAboutFullscreen(false)
			setShowMenu(false)
		}

		if (!isMenuOpen) {
			openSound?.play()
		} else {
			closeSound?.play()
		}
		setIsMenuOpen(!isMenuOpen)
	}

	const toggleAbout = () => {
		if (isAboutFullscreen) {
			setIsAboutFullscreen(false)
		} else if (isFullscreen) {
			setIsFullscreen(false)
			setIsMenuOpen(false)
		}

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
		if (newFullscreenState) {
			setWasAboutOpen(showMenu)
			setShowMenu(false)
			closeSound?.play()
		} else if (wasAboutOpen) {
			setShowMenu(true)
		}
		setIsFullscreen(newFullscreenState)
	}

	const handleAboutFullscreenChange = (newFullscreenState: boolean) => {
		if (newFullscreenState) {
			setWasProjectsOpen(isMenuOpen)
			setIsMenuOpen(false)
			closeSound?.play()
		} else if (wasProjectsOpen) {
			setIsMenuOpen(true)
		}
		setIsAboutFullscreen(newFullscreenState)
	}

	return (
		<>
			{isMobile && (
				<motion.div
					className={cn(
						'fixed left-1/2 top-8 -translate-x-1/2 z-30',
						(isFullscreen || isAboutFullscreen) && 'opacity-0 pointer-events-none'
					)}
					initial={{ opacity: 1, y: -20 }}
					animate={{ opacity: isFullscreen || isAboutFullscreen ? 0 : 1, y: 0 }}
					transition={{ type: 'spring', stiffness: 260, damping: 20 }}
				>
					<div className="flex flex-row space-x-4">
						<Buttons onClick={toggleProjects} name="Projects" icon={SparklesIcon} />
						<Buttons onClick={toggleAbout} name="About me" icon={FilePenLineIcon} />
					</div>
				</motion.div>
			)}
			<div className="fixed inset-0 flex items-center justify-center z-20 pointer-events-none">
				<div className="flex items-center gap-4">
					<Link
						href="https://github.com/WoIfey"
						target="_blank"
						className="pointer-events-auto"
					>
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#E67E22] via-[#F39C12] to-[#FFA07A] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
							WOLFEY
						</h1>
					</Link>
					<Link href="/old" className="pointer-events-auto">
						<Image
							src={'/favicon.ico'}
							width={80}
							height={80}
							alt="🦊"
							className="size-16 md:size-20 relative z-10"
						/>
					</Link>
				</div>
			</div>
			<Container
				showMenu={isMenuOpen}
				otherMenuOpen={showMenu}
				isFullscreen={isFullscreen}
			>
				<div className="transition-all duration-300 h-[80vh]">
					<Projects
						onClose={isMobile ? toggleProjects : undefined}
						projects={projects}
						handleProjectClick={handleProjectClick}
						playMoveSound={playMoveSound}
						isFullscreen={isFullscreen}
						onFullscreenChange={handleFullscreenChange}
					/>
				</div>
			</Container>
			<Container
				showMenu={showMenu}
				isSecondary={true}
				otherMenuOpen={isMenuOpen}
				isFullscreen={isAboutFullscreen}
			>
				<div className="transition-all duration-300 h-[80vh]">
					<About
						onClose={isMobile ? toggleAbout : undefined}
						builds={builds}
						isFullscreen={isAboutFullscreen}
						onFullscreenChange={handleAboutFullscreenChange}
					/>
				</div>
			</Container>
		</>
	)
}
