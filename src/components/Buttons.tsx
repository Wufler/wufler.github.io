export default function Buttons({ icon: Icon, onClick, name }: ButtonsProps) {
	return (
		<div className="flex flex-col items-center gap-2">
			<button
				onClick={onClick}
				className="group relative aspect-square w-24 overflow-hidden rounded-2xl"
			>
				<div className="absolute inset-0 bg-gradient-to-b from-[#c85825]/80 to-[#662a10]/80 backdrop-blur-sm" />
				<div className="absolute inset-0 flex items-center justify-center">
					<Icon className="size-12 text-white" />
				</div>
			</button>
			<span className="text-sm text-white/90 font-medium">{name}</span>
		</div>
	)
}
