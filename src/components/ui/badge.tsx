import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
	'inline-flex items-center justify-center rounded-full border-[3px] px-4 py-1.5 text-xs font-bold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1.5 [&>svg]:pointer-events-none transition-all duration-300 relative group before:absolute before:inset-[-6px] before:rounded-full before:border-[2px] before:border-white/40 before:transition-all before:duration-300 before:scale-95 before:opacity-0 hover:before:scale-100 hover:before:opacity-100',
	{
		variants: {
			variant: {
				default:
					'border-blue-300 bg-gradient-to-b from-blue-400 to-blue-600 text-white shadow-[inset_0_-2px_6px_rgba(0,0,0,0.2),0_4px_12px_rgba(59,130,246,0.3)] hover:shadow-[inset_0_-2px_6px_rgba(0,0,0,0.2),0_6px_16px_rgba(59,130,246,0.4)] hover:scale-110 hover:-translate-y-0.5',
				secondary:
					'border-lime-300 bg-gradient-to-b from-lime-400 to-lime-600 text-white shadow-[inset_0_-2px_6px_rgba(0,0,0,0.2),0_4px_12px_rgba(132,204,22,0.3)] hover:shadow-[inset_0_-2px_6px_rgba(0,0,0,0.2),0_6px_16px_rgba(132,204,22,0.4)] hover:scale-110 hover:-translate-y-0.5',
				destructive:
					'border-red-300 bg-gradient-to-b from-red-400 to-red-600 text-white shadow-[inset_0_-2px_6px_rgba(0,0,0,0.2),0_4px_12px_rgba(239,68,68,0.3)] hover:shadow-[inset_0_-2px_6px_rgba(0,0,0,0.2),0_6px_16px_rgba(239,68,68,0.4)] hover:scale-110 hover:-translate-y-0.5',
				outline:
					'border-orange-300 bg-gradient-to-b from-orange-400 to-orange-600 text-white shadow-[inset_0_-2px_6px_rgba(0,0,0,0.2),0_4px_12px_rgba(249,115,22,0.3)] hover:shadow-[inset_0_-2px_6px_rgba(0,0,0,0.2),0_6px_16px_rgba(249,115,22,0.4)] hover:scale-110 hover:-translate-y-0.5',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	}
)

function Badge({
	className,
	variant,
	asChild = false,
	...props
}: React.ComponentProps<'span'> &
	VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : 'span'

	return (
		<Comp
			data-slot="badge"
			className={cn(badgeVariants({ variant }), className)}
			{...props}
		/>
	)
}

export { Badge, badgeVariants }
