import Term from "@/models/term"

export async function GET(request) {
	const limit = request.nextUrl.searchParams.get("limit") || 10
	const offset = request.nextUrl.searchParams.get("offset") || 0
	
	try {
		const result = await Term.find().select("-_id").limit(limit).skip(offset)
	
		return Response.json({
			results: result,
			url: request.url,
			next: result.length ? `${request.url}?limit=${limit}&offset=${parseInt(offset) + parseInt(limit)}` : null,
			prev: offset > 0 ? `${request.url}?limit=${limit}&offset=${parseInt(offset) - parseInt(limit)}` : null,
		})
	} catch (error) {
		console.error(error)
		return Response.json({ error: error.message }, { status: 500 })
	}
}
