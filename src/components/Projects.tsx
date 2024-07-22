'use client'
import { refresh } from '@/server/actions'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Loading from './Loading'
import { Badge } from '@/components/ui/badge'
import { formatDistanceToNowStrict } from 'date-fns'

interface item {
	id: number
	title: string
	description: string
	href: string
	img: string
	new: boolean
	updated: boolean
	created: string
	category: string
}

export default function Projects({ data }: any) {
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		refresh().then(() => {
			if (data) {
				setIsLoading(false)
			}
		})
	}, [])

	if (isLoading) {
		return <Loading fullscreen={true} background={false} size={72} />
	}
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 pb-4 pt-32 sm:pt-36 md:pb-0 font-source overflow-y-auto overflow-x-hidden xl:px-4">
			{data.map((projects: item, index: number) => (
				<>
					{!index || projects.category !== data[index - 1].category ? (
						<div
							key={projects.id}
							className="col-span-1 lg:col-span-2 xl:col-span-3 sm:px-6 xl:px-2 px-6"
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
						<div className="flex items-center gap-2 break-all truncate max-w-52 sm:max-w-64 text-xl md:text-2xl mb-1.5 text-center uppercase absolute group-hover:top-4 group-hover:left-0 group-hover:text-black -top-4 left-4 transition-all ease-in-out duration-200">
							<div className="bg-slate-600 transition-all ease-in-out duration-200 group-hover:text-xl group-hover:bg-slate-300 shadow-xl rounded-lg px-1">
								<p>{projects.title}</p>
							</div>
							{projects.new && (
								<Badge className="h-6 bg-sky-400 text-black font-light text-sm pointer-events-none">
									New
								</Badge>
							)}
							{projects.updated && (
								<Badge className="h-6 bg-green-400 text-black font-light text-sm pointer-events-none">
									Updated
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
							<Image
								src={projects.img}
								height={854}
								width={480}
								alt={projects.title}
								className="rounded-xl bg-cover bg-no-repeat w-full h-full object-cover group-hover:border-slate-300 group-hover:border-4 transition-all ease-in-out duration-200 border-2 border-slate-600"
							/>
						</Link>
					</div>
				</>
			))}
		</div>
	)
}
