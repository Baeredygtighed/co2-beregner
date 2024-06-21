"use client"
import { useState, useEffect } from "react"
import axios from "axios"

export default function Home() {
	const [data, setData] = useState(null)

	useEffect(function() {
		axios.get("/api/test")
			.then(response => setData(response.data))
	}, [])

	return data && <p>{data.message}</p>
}
