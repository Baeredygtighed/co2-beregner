"use client"

import useAxios from "@/hooks/use-axios"
import { Button } from "@nextui-org/react"
import { FaPen, FaTrash } from "react-icons/fa"

export default function Page() {
	const { data, loading, error } = useAxios("/api/materials")

	return (
		<section className="px-4">
			<h1>Materialer</h1>
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error.message}</p>}
			{data && (
				<ul>
					{data.results.map(material => (
						<li key={material._id} className="flex justify-between odd:bg-gray-200">
							{material.name}
							<div>
								<Button size="small" variant="light"><FaPen/></Button>
								<Button size="small" variant="light"><FaTrash/></Button>
							</div>
						</li>
					))}
				</ul>
			)}
		</section>
	)
}
