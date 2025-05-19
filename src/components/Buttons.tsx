import { useState } from 'react'

export default function Buttons({ icon: Icon, onClick, name }: ButtonsProps) {
	const [isHovered, setIsHovered] = useState(false)

	return (
		<div className="flex flex-col items-center gap-2">
			<button
				onClick={onClick}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				className="group relative aspect-square w-24 md:w-32 overflow-hidden rounded-2xl transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
			>
				<div className="absolute inset-0 bg-gradient-to-b from-[#dbc330]/80 to-[#d6bf2e]/80 backdrop-blur-sm" />
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="text-white">
						<Icon isAnimating={isHovered} />
					</div>
				</div>
			</button>
			<span className="text-sm text-white/90 font-medium">{name}</span>
		</div>
	)
}
