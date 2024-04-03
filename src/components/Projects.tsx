import Image from 'next/image'
import Link from 'next/link'

interface item {
	id: number
	title: string
	description: string
	href: string
	img: string
}

export default function Projects({ data }: any) {
	return (
		<div
			id="projects"
			className="h-dvh w-full md:w-[55%] lg:w-[65%] flex flex-col bg-[#1b1b1b]"
		>
			<div className="bg-[#2c2c2c] p-5 w-full">
				<h1 className="text-[3.5rem] md:text-[3.5rem] xl:text-[4rem] text-center font-source">
					PROJECTS
				</h1>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 pb-10 font-source overflow-y-auto overflow-x-hidden mx-4">
				{data.map((projects: item) => (
					<div
						key={projects.id}
						className="group h-[250px] md:h-[200px] mx-8 my-8 transition-all duration-300 ease-in-out transform hover:scale-105 hover:px-6 hover:py-8"
					>
						<p className="text-xl md:text-2xl mb-1.5 text-center uppercase absolute top-4 left-4 bg-slate-600 transition-all ease-in-out delay-75 group-hover:text-xl group-hover:bg-slate-700 shadow-xl rounded-lg px-1">
							{projects.title}
						</p>
						<p className="text-gray-300 text-[13px] md:text-[13px] uppercase absolute -bottom-6 group-hover:bottom-2 group-hover:right-6 group-hover:md:right-0 md:bottom-2 right-0 group-hover:opacity-100 opacity-100 md:opacity-0 transition-all ease-in-out delay-75">
							{projects.description}
						</p>
						<Link href={projects.href} target="_blank">
							<Image
								src={projects.img}
								height={1080}
								width={720}
								alt={projects.title}
								className="rounded-xl bg-cover bg-no-repeat w-full h-full object-cover group-hover:border-slate-700 group-hover:border-4 transition-all ease-in-out delay-75 border-2 border-slate-400"
							/>
						</Link>
					</div>
				))}
			</div>
		</div>
	)
}
