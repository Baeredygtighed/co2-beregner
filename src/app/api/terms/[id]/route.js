import Term from "@/models/term"

export async function GET(request) {
	const id = request.params.id

	try {
		const result = await Term.findById(id)

		return Response.json({
			url: request.url,
			result: result,
		})
	} catch (error) {
		console.error(error)
		return Response.json({ error: error.message }, { status: 500 })
	}
}
