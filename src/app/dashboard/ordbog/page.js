"use client"

import useAxios from "@/hooks/use-axios"

export default function Page() {
	const {error, data, loading} = useAxios("/api/terms")

	return (
		<section>
			<h1>Ordbog</h1>
			{loading && <p>Loading...</p>}
			{error && <p>{error}</p>}
			{data && (
				<ul>
					{data.results.map((term) => (
						<li key={term.terms.join(", ")}>
							<h2>{term.terms.join(", ")}</h2>
							<p>{term.definition}</p>
						</li>
					))}
				</ul>
			)}
		</section>
	)
}
