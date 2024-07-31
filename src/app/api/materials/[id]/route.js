import { connect } from "@/lib/db"
import Material from "@/models/material"

export async function GET(request, { params }) {
	const { id } = params
	try {
		await connect()
		const material = await Material.findById(id)
		return Response.json({
			url: request.url,
			result: material,
		})
	} catch (error) {
		console.error(error)
		return Response.json({ error: error.message }, { status: 500 })
	}
}