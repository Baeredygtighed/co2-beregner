"use server"

import { connect } from "./db"
import User from "@/models/user"
import { cookies } from "next/headers"
import { encrypt } from "@/lib/crypt"

export async function authenticate(_currentState, formData) {
	const username = formData.get("username")
	const password = formData.get("password")
	try {
		await connect()
		const result = await User.findOne({username})
		if (!result) {
			throw new Error("Forkert brugernavn eller adgangskode")
		}
		if (!await result.validatePassword(password)){
			throw new Error("Forkert brugernavn eller adgangskode")
		}
		cookies().set("session", encrypt(result.username), {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
		})
		return true
	} catch (error) {
		console.log(error)
		return error.message
	}
}
