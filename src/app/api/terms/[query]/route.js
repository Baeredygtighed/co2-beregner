import Term from "@/models/term"

export async function GET(request) {
	const query = request.params.query

	try {
		const result = await Term.find({ $text: { $search: query } }).select("-_id")

		return Response.json({
			url: request.url,
			result: result,
		})
	} catch (error) {
		console.error(error)
		return Response.json({ error: error.message }, { status: 500 })
	}
}
