'use client'

import type { Variants } from 'motion/react'
import { motion } from 'motion/react'
import type { HTMLAttributes } from 'react'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface SparklesIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number
	isAnimating?: boolean
}

const sparkleVariants: Variants = {
	initial: {
		y: 0,
		fill: 'none',
	},
	animate: {
		y: [0, -1, 0, 0],
		fill: 'black',
		transition: {
			duration: 1,
			bounce: 0.3,
		},
	},
}

const starVariants: Variants = {
	initial: {
		opacity: 0,
		x: 0,
		y: 0,
	},
	animate: {
		opacity: 1,
		transition: {
			duration: 2,
			repeat: Infinity,
			repeatType: 'reverse',
			type: 'spring',
			stiffness: 70,
			damping: 10,
			mass: 0.4,
		},
	},
}

const SparklesIcon = forwardRef<HTMLDivElement, SparklesIconProps>(
	({ className, size = 48, isAnimating = false, ...props }, ref) => {
		return (
			<div ref={ref} className={cn(className)} {...props}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="black"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
						variants={sparkleVariants}
						animate={isAnimating ? 'animate' : 'initial'}
					/>
					<motion.path
						d="M20 3v4"
						variants={starVariants}
						animate={isAnimating ? 'animate' : 'initial'}
					/>
					<motion.path
						d="M22 5h-4"
						variants={starVariants}
						animate={isAnimating ? 'animate' : 'initial'}
					/>
					<motion.path
						d="M4 17v2"
						variants={starVariants}
						animate={isAnimating ? 'animate' : 'initial'}
					/>
					<motion.path
						d="M5 18H3"
						variants={starVariants}
						animate={isAnimating ? 'animate' : 'initial'}
					/>
				</svg>
			</div>
		)
	}
)

SparklesIcon.displayName = 'SparklesIcon'

export default SparklesIcon
