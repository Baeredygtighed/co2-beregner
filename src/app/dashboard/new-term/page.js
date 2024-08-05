"use client"

import { createTerm } from "@/lib/actions"
import { Button, Input, Textarea } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { FaSpinner } from "react-icons/fa"
import { toast } from "react-toastify"

export default function NewTerm() {
	const [errorMessage, dispatch] = useFormState(createTerm, null)
	const router = useRouter()

	useEffect(function() {
		if (errorMessage?.success === true) {
			toast.success("Ordbogsopslaget er orettet")
			router.push("edit-term/" + errorMessage.id)
		} else if (errorMessage) {
			toast.error(errorMessage)
		}
	}, [errorMessage])

	return (
		<section className="px-4">
			<h1>Nyt ordbogsopslag</h1>
			<form action={dispatch}>
				<Input label="Opslagsord" placeholder="fx biobaseret, biobaserede" description="Indtast gerne flere stavemåder adskilt af komma" name="terms" variant="underlined" isRequired />
				<Textarea label="Definition" name="definition" variant="underlined" isRequired />
				<SubmitButton/>
			</form>
		</section>
	)
}

function SubmitButton() {
	const {pending} = useFormStatus()

	function handleClick(event) {
		if (pending) {
			event.preventDefault()
		}
	}

	return (<Button
		color="primary"
		type="submit"
		className="w-full mt-4"
		aria-disabled={pending}
		onClick={handleClick}>
		Opret ordbogsopslag {pending && <FaSpinner className="animate-spin" size={16}/>}
	</Button>)
}