import Header from '@/components/Header'
import Projects from '@/components/Projects'
import { getData } from '@/utils/handleDatabase'

export default async function Home() {
	let data = await getData()
	data.sort((a: any, b: any) => a.id - b.id)
	return (
		<div className="h-dvh flex flex-wrap font-nunito text-white bg-[#1b1b1b]">
			<Header />
			<div
				id="projects"
				className="h-dvh w-full md:w-[55%] lg:w-[65%] flex flex-col bg-[#1b1b1b]"
			>
				<div className="bg-[#2c2c2c] p-5 w-full shadow-2xl">
					<h1 className="text-[3rem] md:text-[3.5rem] xl:text-[4rem] text-center font-source uppercase tracking-wide">
						projects
					</h1>
				</div>
				<Projects data={data} />
			</div>
		</div>
	)
}
