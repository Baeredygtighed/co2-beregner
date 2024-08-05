"use server"

import { connect } from "./db"
import User from "@/models/user"
import { cookies } from "next/headers"
import { decrypt, encrypt } from "@/lib/crypt"
import Material from "@/models/material"
import Term from "@/models/term"

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
		const doc = await new Material(material).save()
		return { success: true, doc }
	} catch (error) {
		console.error(error)
		return error.message
	}
}

export async function editMaterial(_currentState, formData) {
	const user = cookies().get("session")?.value
	if (!user || decrypt(user) !== "admin") return "Du har ikke adgang til denne funktion"

	const id = formData.get("id")

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
		const doc = await Material.findByIdAndUpdate(id, { $set: material }, { new: true }).exec()
		return { success: true }
	} catch (error) {
		console.error(error)
		return error.message
	}
}

export async function deleteMaterial(_currentState, formData) {
	const user = cookies().get("session")?.value
	if (!user || decrypt(user) !== "admin") return "Du har ikke adgang til denne funktion"

	const id = formData.get("id")

	try {
		await connect()
		await Material.findByIdAndDelete(id).exec()
		
		return { success: true }
	} catch (error) {
		console.error(error)
		return error.message
	}
}

/* ==== TERMS ==== */

export async function createTerm(_currentState, formData) {
	const user = cookies().get("session")?.value
	if (!user || decrypt(user) !== "admin") return "Du har ikke adgang til denne funktion"

	const term = {
		terms: formData.get("terms").split(",").map(e => e.trim()),
		definition: formData.get("definition")
	}

	try {
		await connect()
		const doc = await new Term(term).save()
		return { success: true, id: doc._id }
	} catch (error) {
		console.error(error)
		return error.message
	}
}

export async function editTerm(_currentState, formData) {
	const user = cookies().get("session")?.value
	if (!user || decrypt(user) !== "admin") return "Du har ikke adgang til denne funktion"

	const id = formData.get("id")

	const term = {
		terms: formData.get("terms").split(",").map(e => e.trim()),
		definition: formData.get("definition")
	}

	try {
		await connect()
		const doc = await Term.findByIdAndUpdate(id, { $set: term }, { new: true }).exec()
		return { success: true }
	} catch (error) {
		console.error(error)
		return error.message
	}
}

export async function deleteTerm(_currentState, formData) {
	const user = cookies().get("session")?.value
	if (!user || decrypt(user) !== "admin") return "Du har ikke adgang til denne funktion"

	const id = formData.get("id")

	try {
		await connect()
		await Term.findByIdAndDelete(id).exec()
		
		return { success: true }
	} catch (error) {
		console.error(error)
		return error.message
	}
}

export async function getSelectedMaterials() {
	return cookies().get("selectedMaterials")?.value ? JSON.parse(cookies().get("selectedMaterials").value) : [];
}

export async function addSelectedMaterial(material) {
	const selectedMaterials = await getSelectedMaterials();

	if (!selectedMaterials.find(selectedMaterial => selectedMaterial.name === material.name)) {
		selectedMaterials.push(material);
		cookies().set("selectedMaterials", JSON.stringify(selectedMaterials));
	}
}

export async function removeSelectedMaterial(material) {
	const selectedMaterials = await getSelectedMaterials();
	const newSelectedMaterials = selectedMaterials.filter(selectedMaterial => selectedMaterial.name !== material.name);
	cookies().set("selectedMaterials", JSON.stringify(newSelectedMaterials));
}

export async function clearSelectedMaterials() {
	cookies().set("selectedMaterials", JSON.stringify([]));
}

