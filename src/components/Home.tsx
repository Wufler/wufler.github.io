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
		<div className="h-dvh w-full overflow-hidden">
			<div className="relative h-full w-full bg-[#09090B]">
				<div className="absolute bottom-0 top-0 right-0 left-0 bg-[#09090B] bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:1.5rem_2rem]"></div>
				<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-auto w-full aspect-square min-w-[800px] rounded-full bg-[radial-gradient(circle,#1f1f1f,transparent)]" />
			</div>

			<div className="relative z-10 container mx-auto px-4 h-full flex flex-col">
				<AnimatePresence>
					<motion.div
						key="menus"
						className="h-full w-full"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
					>
						<div className="flex items-start justify-start h-full w-full">
							<Menu projects={projects} builds={builds} />
						</div>
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	)
}
