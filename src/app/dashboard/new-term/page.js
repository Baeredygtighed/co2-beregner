"use client"

import BackButton from "@/components/back-button"
import { createTerm } from "@/lib/actions"
import { Button, Input, Textarea } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { FaSpinner } from "react-icons/fa"
import { toast } from "react-toastify"

export default function Page() {
	const [errorMessage, dispatch] = useFormState(createTerm, null)
	const router = useRouter()

	useEffect(function () {
		if (errorMessage?.success === true) {
			toast.success("Ordet er gemt")
			router.push("/dashboard/terms/")
		} else if (errorMessage) {
			toast.error(errorMessage)
		}
	}, [errorMessage])

	return (
		<>
			<BackButton className="pt-1" />
			<section className="px-4">
				<h1 className="text-center text-3xl font-semibold mb-4">Nyt ord</h1>
				<form action={dispatch}>
					<Input label="Ord" name="terms" variant="underlined" isRequired />
					<Textarea label="Definition" name="definition" variant="underlined" isRequired />

					<SubmitButton />
				</form>
			</section>
		</>
	)
}

function SubmitButton() {
	const { pending } = useFormStatus()

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
		Opret ord {pending && <FaSpinner className="animate-spin" size={16} />}
	</Button>)
}
