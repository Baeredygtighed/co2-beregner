"use client"
import { useState, useEffect } from "react"
import axios from "axios"

export default function useAxios(endpoint) {
	const [loading, setLoading] = useState(true)
	const [data, setData] = useState(null)
	const [error, setError] = useState(null)

	useEffect(function () {
		axios.get(endpoint)
			.then(response => setData(response.data))
			.catch(error => {setError(error)})
			.finally(() => setLoading(false))
	}, [])

	return { loading, data, error }
}
