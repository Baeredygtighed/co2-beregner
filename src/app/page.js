"use client"
import useAxios from "@/hooks/use-axios"

export default function Home() {
	const { loading, data } = useAxios("/api/test")

	return (
		<>
			{loading && <p>Loading...</p>}
			{data && <h1>{data.message}</h1>}
		</>
	)
}
