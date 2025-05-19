import Header from './components/Header'
import Projects from './components/Projects'
import Image from 'next/image'
import { connection } from 'next/server'
import { fetchProjects } from './components/actions/projectsData'

export default async function Home() {
	await connection()
	const projects = await fetchProjects()
	return (
		<div className="h-dvh flex flex-wrap nunito text-white bg-[#1b1b1b]">
			<Header />
			<div
				id="projects"
				className="h-dvh w-full md:w-[55%] lg:w-[65%] flex flex-col bg-[#1b1b1b]"
			>
				<div className="bg-[#2c2c2c] p-5 w-full md:w-[55%] lg:w-[65%] shadow-2xl absolute z-10">
					<div className="flex justify-center items-center gap-6 text-[3rem] md:text-[3.5rem] text-center source uppercase tracking-wide">
						<Image
							src={'/favicon.ico'}
							width={64}
							height={64}
							alt="🦊"
							className="size-16"
						/>
						<h1>projects</h1>
					</div>
				</div>
				<Projects projects={projects} />
			</div>
		</div>
	)
}
