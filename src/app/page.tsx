import Header from '@/components/Header'
import Loading from '@/components/Loading'
import Projects from '@/components/Projects'
import { getData } from '@/utils/handleDatabase'
import { Suspense } from 'react'

export default async function Home() {
	let data = await getData()
	data.sort((a: any, b: any) => a.id - b.id)
	return (
		<div className="h-dvh flex flex-wrap font-nunito text-white bg-[#1b1b1b]">
			<Header />
			<Suspense fallback={<Loading />}>
				<Projects data={data} />
			</Suspense>
		</div>
	)
}
