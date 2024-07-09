import { decrypt } from "@/lib/crypt"

export async function POST(request) {
	const body = await request.json()
	const user = body.user
	if (!user) {
		return Response.json({user: null})
	}
	return Response.json({user: decrypt(user)})
}
