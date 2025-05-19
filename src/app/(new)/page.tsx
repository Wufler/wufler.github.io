export const dynamic = 'force-dynamic'
import Home from '@/components/Home'
import { fetchBuilds, fetchProjects } from './data'

export default async function Page() {
	const projects = await fetchProjects()
	const builds = await fetchBuilds()

	return <Home projects={projects} builds={builds} />
}
