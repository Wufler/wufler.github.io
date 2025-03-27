import { fetchBuilds } from '../data'

export default async function Page() {
	const builds = await fetchBuilds()

	return (
		<div>
			<h1>Project Builds</h1>

			{builds.length === 0 ? (
				<p>No builds available at the moment.</p>
			) : (
				<div>
					{builds.map(build => (
						<div key={build.id}>
							<h2>{build.title}</h2>
							<p>{build.description}</p>

							{build.img && (
								<div>
									<img src={build.img} alt={build.title} />
								</div>
							)}

							<div>
								<div>
									<strong>Status:</strong> {build.status.join(', ')}
								</div>
								<div>
									<strong>Tags:</strong> {build.tags.join(', ')}
								</div>
							</div>

							<hr />
						</div>
					))}
				</div>
			)}
		</div>
	)
}
