"use server"

import { connect } from "./db"
import User from "@/models/user"
import { cookies } from "next/headers"
import { decrypt, encrypt } from "@/lib/crypt"
import Material from "@/models/material"

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

export async function createMaterial(_currentState, formData) {
	const user = cookies().get("session")?.value
	if (!user || decrypt(user) !== "admin") return "Du har ikke adgang til denne funktion"

	const material = {
		name: formData.get("name"),
		category: formData.get("category"),
		production_cost: formData.get("production_cost"),
		usage_cost: formData.get("usage_cost"),
		destruction_cost: formData.get("destruction_cost"),
		//image: formData.get("image"),
	}
	try {
		await connect()
		await new Material(material).save()
		return true
	} catch (error) {
		console.error(error)
		return error.message
	}
}
