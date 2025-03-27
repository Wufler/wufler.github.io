import Home from '@/components/Home'
import { fetchBuilds, fetchProjects } from './data'
import { connection } from 'next/server'

export default async function Page() {
	await connection()
	const projects = await fetchProjects()
	const builds = await fetchBuilds()

	return <Home projects={projects} builds={builds} />
}
