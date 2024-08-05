"use client"

import useAxios from "@/hooks/use-axios"
import { editTerm } from "@/lib/actions"
import { Button, Input, Spinner, Textarea } from "@nextui-org/react"
import { useEffect } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { FaSpinner } from "react-icons/fa"
import { toast } from "react-toastify"

export default function EditTerm({ params }) {
	const [errorMessage, dispatch] = useFormState(editTerm, null)
	const { loading, error, data } = useAxios("/api/terms/" + params.id)

	useEffect(function() {
		if (errorMessage?.success === true) {
			toast.success("Opslaget er gemt")
		} else if (errorMessage) {
			toast.error(errorMessage)
		}
	}, [errorMessage])

	return (
		<section className="px-4">
			<h1>Rediger ordbogsopslag</h1>
			{loading && <Spinner label="Indlæser" color="primary" />}
			{error && toast.error("Ups, noget gik galt")}
			{data && <form action={dispatch}>
				<Input type="hidden" name="id" defaultValue={params.id} />
				<Input defaultValue={data.result.terms.join(", ")} label="Opslagsord" placeholder="fx biobaseret, biobaserede" description="Indtast gerne flere stavemåder adskilt af komma" name="terms" variant="underlined" isRequired />
				<Textarea label="Definition" name="definition" variant="underlined" defaultValue={data.result.definition} isRequired />
				<SubmitButton/>
			</form>}
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
		Gem opslag {pending && <FaSpinner className="animate-spin" size={16}/>}
	</Button>)
}