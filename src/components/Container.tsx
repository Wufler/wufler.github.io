'use client'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'

export default function Container({
	children,
	showMenu,
	isSecondary = false,
	otherMenuOpen = false,
	isFullscreen = false,
}: Container) {
	if (isFullscreen) {
		return <>{children}</>
	}

	return (
		<AnimatePresence>
			{showMenu && (
				<motion.div
					className={cn(
						'fixed top-1/2 -translate-y-1/2 z-[99]',
						isSecondary ? 'right-8' : 'left-8',
						isFullscreen && 'inset-0 !translate-y-0'
					)}
					initial={{ x: isSecondary ? 100 : -100, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					exit={{ x: isSecondary ? 100 : -100, opacity: 0 }}
					transition={{
						type: 'spring',
						stiffness: 360,
						damping: 25,
					}}
				>
					<div className={cn('w-[450px]', isFullscreen && 'w-full h-full')}>
						{children}
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
