'use client'
import { refresh } from '@/app/actions'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Loading from './Loading'

interface item {
	id: number
	title: string
	description: string
	href: string
	img: string
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
		return <Loading />
	}
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 pb-4 pt-4 md:pb-0 font-source overflow-y-auto overflow-x-hidden xl:px-4">
			{data.map((projects: item) => (
				<div
					key={projects.id}
					className="group h-[170px] sm:h-[250px] md:h-[170px] mx-8 my-8 transition-all duration-200 ease-in-out transform hover:scale-105 hover:px-4 hover:py-6"
				>
					<p className="break-all truncate max-w-52 sm:max-w-64 text-xl md:text-2xl mb-1.5 text-center uppercase absolute group-hover:top-4 group-hover:left-0 group-hover:text-black -top-4 left-4 bg-slate-600 transition-all ease-in-out duration-200 group-hover:text-xl group-hover:bg-slate-300 shadow-xl rounded-lg px-1">
						{projects.title}
					</p>
					<p className="-z-10 break-all truncate sm:max-w-72 max-w-60 text-gray-300 text-sm uppercase absolute -bottom-6 group-hover:bottom-0 group-hover:right-4 group-hover:md:right-0 md:bottom-2 right-0 group-hover:opacity-100 opacity-100 md:opacity-0 transition-all ease-in-out duration-200 md:delay-100">
						{projects.description}
					</p>
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
			))}
		</div>
	)
}
