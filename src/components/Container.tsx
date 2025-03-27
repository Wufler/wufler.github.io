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
						'fixed right-8 z-[99] flex items-center',
						otherMenuOpen
							? isSecondary
								? 'bottom-8'
								: 'top-8'
							: 'top-1/2 -translate-y-1/2'
					)}
					initial={{ x: 100, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					exit={{ x: 100, opacity: 0 }}
					transition={{
						type: 'spring',
						stiffness: 360,
						damping: 25,
					}}
				>
					<div
						className={cn(
							'relative',
							otherMenuOpen ? 'max-h-[calc(48vh-16px)]' : 'max-h-[90vh]',
							'overflow-hidden transition-all duration-300'
						)}
					>
						{children}
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
