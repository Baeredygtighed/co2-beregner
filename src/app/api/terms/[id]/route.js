import Term from "@/models/term"

export async function GET(request, { params }) {
	const id = params.id

	try {
		const result = await Term.findById(id).exec()

		return Response.json({
			url: request.url,
			result: result,
		})
	} catch (error) {
		console.error(error)
		return Response.json({ error: error.message }, { status: 500 })
	}
}
