'use client'

import Menu from '@/components/Menu'
import { motion, AnimatePresence } from 'motion/react'

export default function Home({
	projects,
	builds,
}: {
	projects: Project[]
	builds: Build[]
}) {
	return (
		<div className="h-dvh w-full text-white bg-black overflow-hidden">
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,69,0,0.3),rgba(255,140,0,0.1))]" />
			<div className="relative z-10 container mx-auto px-4 h-full flex flex-col">
				<AnimatePresence>
					<motion.div
						key="menus"
						className="h-full w-full"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
					>
						<div className="flex items-center justify-center h-full w-full">
							<Menu projects={projects} builds={builds} />
						</div>
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	)
}
