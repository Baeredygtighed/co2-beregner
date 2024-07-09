"use client"

import useAxios from "@/hooks/use-axios"

export default function Page() {
	const { data, loading, error } = useAxios("/api/materials")

	return (
		<>
			<h1>Materialer</h1>
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error.message}</p>}
			{data && (
				<ul>
					{data.results.map(material => (
						<li key={material._id}>{material.name}</li>
					))}
				</ul>
			)}
		</>
	)
}
