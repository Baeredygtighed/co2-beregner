import Term from "@/models/term"

export async function GET(request, { params }) {
	const query = params.query

	try {
		const result = await Term.find({ terms: { $regex: new RegExp(query, "i") } }).select("-_id")

		return Response.json({
			url: request.url,
			results: result,
		})
	} catch (error) {
		console.error(error)
		return Response.json({ error: error.message }, { status: 500 })
	}
}
