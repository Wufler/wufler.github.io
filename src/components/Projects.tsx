'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Loading from './Loading'
import { Badge } from '@/components/ui/badge'
import { formatDistanceToNowStrict } from 'date-fns'
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { ClipboardCheckIcon, LinkIcon } from 'lucide-react'
import { toast } from 'sonner'

interface item {
	id: number
	title: string
	description: string
	href: string
	img: string
	new: boolean
	updated: boolean
	outdated: boolean
	created: string
	category: string
}

export default function Projects({ data }: any) {
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		setLoading(false)
	}, [data])

	const copy = async (href: string) => {
		try {
			await navigator.clipboard.writeText(href)
			toast(
				<div className="flex gap-2">
					<ClipboardCheckIcon className="size-5" />
					<span>Project copied to clipboard.</span>
				</div>,
				{
					position: 'bottom-left',
				}
			)
		} catch (error) {
			console.error('Failed to copy project:', error)
		}
	}

	if (loading) {
		return <Loading fullscreen={true} background={false} size={72} />
	}
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 pb-4 pt-32 sm:pt-36 md:pb-0 font-source overflow-y-auto overflow-x-hidden xl:px-4">
			{data.map((projects: item, index: number) => (
				<>
					{!index || projects.category !== data[index - 1].category ? (
						<div
							key={projects.id}
							className="col-span-1 lg:col-span-2 2xl:col-span-3 sm:px-6 2xl:px-2 px-6"
						>
							<div className="flex w-full items-center space-x-4">
								<p className="text-xl">{projects.category}</p>
								<div className="flex-1 border-b-2 rounded-xl border-gray-400"></div>
							</div>
						</div>
					) : null}
					<div
						key={projects.id}
						className="group h-[170px] sm:h-[250px] md:h-[170px] mx-8 my-8 transition-all duration-200 ease-in-out transform hover:scale-105 hover:px-4 hover:py-6 mb-12 md:mb-8"
					>
						<div className="flex items-center gap-2 break-all truncate max-w-56 sm:max-w-64 text-xl md:text-2xl mb-1.5 text-center uppercase absolute group-hover:top-4 group-hover:left-0 group-hover:text-black -top-4 left-4 transition-all ease-in-out duration-200">
							<div className="bg-slate-600 transition-all ease-in-out duration-200 group-hover:text-xl group-hover:bg-slate-300 shadow-xl rounded-lg px-1">
								<p>{projects.title}</p>
							</div>
							{projects.new && (
								<Badge className="h-6 bg-sky-500 text-black font-light text-sm pointer-events-none">
									New
								</Badge>
							)}
							{projects.updated && (
								<Badge className="h-6 bg-green-500 text-black font-light text-sm pointer-events-none">
									Updated
								</Badge>
							)}
							{projects.outdated && (
								<Badge className="h-6 bg-red-500 text-black font-light text-sm pointer-events-none">
									Outdated
								</Badge>
							)}
						</div>
						<div className="flex md:flex-row flex-col-reverse items-end gap-0 md:items-start md:gap-2 -z-10 break-all truncate max-w-72 text-gray-300 text-sm uppercase absolute -bottom-10 group-hover:-bottom-4 group-hover:md:bottom-0 group-hover:right-4 group-hover:md:right-0 md:bottom-2 right-0 group-hover:opacity-100 opacity-100 md:opacity-0 transition-all ease-in-out duration-200 md:delay-100">
							<time
								title={new Date(projects.created).toLocaleString()}
								dateTime={new Date(projects.created).toLocaleString()}
								className="text-xs text-gray-500"
							>
								{formatDistanceToNowStrict(new Date(projects.created), {
									addSuffix: true,
								})}
							</time>
							<p>{projects.description}</p>
						</div>
						<Link href={projects.href} target="_blank">
							<ContextMenu>
								<ContextMenuTrigger>
									<Image
										src={projects.img}
										height={854}
										width={480}
										alt={projects.title}
										className="rounded-xl bg-cover bg-no-repeat w-full h-full object-cover group-hover:border-slate-300 group-hover:border-4 transition-all ease-in-out duration-200 border-2 border-slate-600"
									/>
								</ContextMenuTrigger>
								<ContextMenuContent>
									<ContextMenuItem
										onClick={() => copy(projects.href)}
										className="gap-x-1"
									>
										<LinkIcon className="size-4" />
										Copy Link
									</ContextMenuItem>
								</ContextMenuContent>
							</ContextMenu>
						</Link>
					</div>
				</>
			))}
		</div>
	)
}
