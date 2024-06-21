"use client"
import { Button } from "@nextui-org/react"
import { useEffect } from "react"

export default function Error({	error, reset }) {
	useEffect(function() {
		console.error(error)
	}, [error])

	return (
		<>
			<h1>Ups! Noget gik galt</h1>
			<Button onClick={() => reset()}>Prøv igen</Button>
		</>
	)
}
