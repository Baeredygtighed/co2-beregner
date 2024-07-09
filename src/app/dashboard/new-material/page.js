"use client"

import { createMaterial } from "@/lib/actions"
import { Button, Input } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { FaSpinner } from "react-icons/fa"
import { toast } from "react-toastify"

export default function Page() {
	const [errorMessage, dispatch] = useFormState(createMaterial, null)
	const router = useRouter()

	useEffect(function() {
		if (errorMessage === true) {
			router.push("/dashboard/materials")
		} else if (errorMessage) {
			toast.error(errorMessage)
		}
	}, [errorMessage])

	return (
		<section className="px-4">
			<h1>Nyt materiale</h1>
			<form action={dispatch}>
				<Input label="Materialenavn" name="name" />
				<Input label="Materialekategori" name="category" />
				<Input type="number" label="Produktionsomkostninger" name="production_cost" />
				<Input type="number" label="Brugsomkostninger" name="usage_cost" />
				<Input type="number" label="Bortskaffelsesomkostninger" name="destruction_cost" />
				<SubmitButton />
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
		Opret materiale {pending && <FaSpinner className="animate-spin" size={16}/>}
	</Button>)
}
