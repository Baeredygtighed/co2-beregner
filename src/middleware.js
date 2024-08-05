import axios from "axios"

export async function middleware(request) {
	if (request.nextUrl.pathname.startsWith("/dashboard")) {
		const user = request.cookies.get("session")?.value
		
		if (!user) {
			return Response.redirect(new URL("/login", request.url))
		}
	
		const response = await axios.post(process.env.production ? "https://co2-beregner.onrender.com/api/decryptedsessioncookie" : request.nextUrl.origin + "/api/decryptedsessioncookie", {user})
	
		if (response.data.user !== "admin") {
			return Response.redirect(new URL("/login", request.url))
		}
	}
}

export const config = {
	matcher: ["/dashboard/:path*"]
}
