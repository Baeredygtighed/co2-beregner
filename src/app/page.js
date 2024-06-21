"use client"
import useAxios from "@/hooks/use-axios"
import { Spinner } from "@nextui-org/react"

export default function Home() {
	const { loading, data } = useAxios("/api/test")

	return (
		<>
			{loading && <Spinner label="Indlæser" color="primary" />}
			{data && <h1>{data.message}</h1>}
		</>
	)
}
