import Header from '@/components/Header'
import Projects from '@/components/Projects'
import { getData } from '@/utils/handleDatabase'

export default async function Home() {
	let data = await getData()
	data.sort((a: any, b: any) => a.id - b.id)
	return (
		<div className="h-dvh flex flex-wrap font-nunito text-white bg-[#1b1b1b]">
			<Header />
			<Projects data={data} />
		</div>
	)
}
