'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '../components/ui/badge'
import { format, formatDistanceToNowStrict } from 'date-fns'
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from '../components/ui/context-menu'
import { ClipboardCheckIcon, LinkIcon } from 'lucide-react'
import { toast } from 'sonner'
import React from 'react'
import { Project } from '../types'

export default function Projects({ projects }: { projects: Project[] }) {
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
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 pb-4 pt-32 sm:pt-36 md:pb-0 source overflow-y-auto overflow-x-hidden xl:px-4">
			{projects.map((project: Project, index: number) => (
				<React.Fragment key={project.id}>
					{!index || project.category !== projects[index - 1].category ? (
						<div className="col-span-1 lg:col-span-2 2xl:col-span-3 sm:px-6 2xl:px-2 px-6">
							<div className="flex w-full items-center space-x-4">
								<p className="text-xl">{project.category}</p>
								<div className="flex-1 border-b-2 rounded-xl border-gray-400"></div>
							</div>
						</div>
					) : null}
					{project.visible && (
						<div className="group h-[170px] sm:h-[250px] md:h-[170px] mx-8 my-8 transition-all duration-200 ease-in-out transform hover:scale-105 hover:px-4 hover:py-6 mb-12 md:mb-8">
							<div className="flex items-center gap-2 break-all truncate max-w-72 text-xl md:text-2xl mb-1.5 text-center uppercase absolute group-hover:top-4 group-hover:left-0 group-hover:text-black -top-4 left-4 transition-all ease-in-out duration-200">
								<div className="bg-slate-600 transition-all ease-in-out duration-200 group-hover:text-xl group-hover:bg-slate-300 shadow-xl rounded-lg px-1">
									<p>{project.title}</p>
								</div>
								{project.status.map(status => (
									<Badge
										key={status}
										className={`h-6 font-medium text-sm pointer-events-none ${
											status === 'new'
												? 'bg-sky-500'
												: status === 'updated'
												? 'bg-green-500'
												: status === 'outdated'
												? 'bg-red-500'
												: ''
										} text-black`}
									>
										{status}
									</Badge>
								))}
							</div>
							<div className="flex md:flex-row flex-col-reverse items-end gap-0 md:items-start md:gap-2 -z-10 break-all truncate max-w-72 text-gray-300 text-sm uppercase absolute -bottom-10 group-hover:-bottom-4 group-hover:md:bottom-0 group-hover:right-4 group-hover:md:right-0 md:bottom-2 right-0 group-hover:opacity-100 opacity-100 md:opacity-0 transition-all ease-in-out duration-200 md:delay-100">
								<time
									title={format(new Date(project.createdAt), 'PPP')}
									dateTime={format(
										new Date(project.createdAt),
										"yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
									)}
									className="text-xs text-gray-500"
								>
									{formatDistanceToNowStrict(new Date(project.createdAt), {
										addSuffix: true,
									})}
								</time>
								<p>{project.subtitle}</p>
							</div>
							<Link href={project.href || ''} target="_blank">
								<ContextMenu>
									<ContextMenuTrigger>
										<Image
											src={project.images[0]}
											height={854}
											width={480}
											alt={project.title}
											className="rounded-xl bg-cover bg-no-repeat w-full h-full object-cover group-hover:border-slate-300 group-hover:border-4 transition-all ease-in-out duration-200 border-2 border-slate-600"
										/>
									</ContextMenuTrigger>
									<ContextMenuContent>
										<ContextMenuItem
											onClick={() => copy(project.href || '')}
											className="gap-x-1"
										>
											<LinkIcon className="size-4" />
											Copy Link
										</ContextMenuItem>
									</ContextMenuContent>
								</ContextMenu>
							</Link>
						</div>
					)}
				</React.Fragment>
			))}
		</div>
	)
}
