import { connect } from "@/lib/db"
import Material from "@/models/material"

export async function GET(request) {
	const limit = request.nextUrl.searchParams.get("limit") || 10
	const offset = request.nextUrl.searchParams.get("offset") || 0

	try {
		await connect()
		const materials = await Material.find().limit(limit).skip(offset)
		return Response.json({
			url: request.url,
			next: materials.length ? `${request.url}?limit=${limit}&offset=${parseInt(offset) + parseInt(limit)}` : null,
			prev: offset > 0 ? `${request.url}?limit=${limit}&offset=${parseInt(offset) - parseInt(limit)}` : null,
			results: materials,
		})
	} catch (error) {
		console.error(error)
		return Response.json({ error: error.message }, { status: 500 })
	}
}
