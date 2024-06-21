"use client"
import { useEffect } from "react"

export default function Error({	error, reset }) {
	useEffect(function() {
		console.error(error)
	}, [error])

	return (
		<>
			<h1>Ups! Noget gik galt</h1>
			<button onClick={() => reset()}>Prøv igen</button>
		</>
	)
}
