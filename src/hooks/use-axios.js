"use client"
import { useState, useEffect } from "react"
import axios from "axios"

export default function useAxios(endpoint) {
	const [loading, setLoading] = useState(true)
	const [data, setData] = useState(null)
	const [error, setError] = useState(null)

	const update = newEndpoint => {
		newEndpoint ?? endpoint;

		axios.get(newEndpoint)
			.then(response => setData(response.data))
			.catch(error => { setError(error) })
			.finally(() => setLoading(false))
	}

	useEffect(() => { update(endpoint) }, [])

	return { loading, data, error, update }
}
