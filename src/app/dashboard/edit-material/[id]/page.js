"use client"

import useAxios from "@/hooks/use-axios"
import { Button, Input } from "@nextui-org/react"
import { useFormStatus, useFormState } from "react-dom"
import { FaSpinner } from "react-icons/fa"
import { editMaterial } from "@/lib/actions"
import { useEffect } from "react"
import { toast } from "react-toastify"
import BackButton from "@/components/back-button"
import Spinner from "@/components/spinner"

export default function EditMaterial({ params }) {
	const [errorMessage, dispatch] = useFormState(editMaterial, null)
	const { loading, data, error } = useAxios("/api/materials/" + params.id)

	useEffect(function () {
		if (errorMessage?.success === true) {
			toast.success("Materialet er gemt")
		} else if (errorMessage) {
			toast.error(errorMessage)
		}
	}, [errorMessage])

	return (
		<>
			<BackButton className="pt-1" />
			<section className="px-4">
				<h1 className="text-center text-3xl font-semibold mb-4">Rediger materiale</h1>
				{loading && <Spinner />}
				{error && toast.error("Ups, noget gik galt")}
				{data && <form action={dispatch}>
					<Input type="hidden" name="id" defaultValue={params.id} />
					<Input label="Materialenavn" name="name" variant="underlined" defaultValue={data.result.name} isRequired />
					<Input label="Materialekategori" name="category" variant="underlined" defaultValue={data.result.category} isRequired />
					<Input type="number" label="Produktionsomkostninger" name="production_cost" defaultValue={data.result.production_cost} variant="underlined" isRequired />
					<Input type="number" label="Brugsomkostninger" name="usage_cost" variant="underlined" defaultValue={data.result.usage_cost} isRequired />
					<Input type="number" label="Bortskaffelsesomkostninger" name="destruction_cost" variant="underlined" defaultValue={data.result.destruction_cost} isRequired />
					<SubmitButton />
				</form>}
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
		Gem materiale {pending && <FaSpinner className="animate-spin" size={16} />}
	</Button>)
}