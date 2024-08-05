"use client"

import useAxios from "@/hooks/use-axios"
import { Spinner } from "@nextui-org/react"
import { toast } from "react-toastify"

export default function EditTerm({ params }) {
	const { loading, error, data } = useAxios("/api/terms/" + params.id)

	console.log(data)

	return (
		<section className="px-4">
			<h1>Rediger ordbogsopslag</h1>
			{loading && <Spinner label="Indlæser" color="primary" />}
			{error && toast.error("Ups, noget gik galt")}
			{data && <form>
				<Input defaultValue={data.result.terms.join(", ")} label="Opslagsord" placeholder="fx biobaseret, biobaserede" description="Indtast gerne flere stavemåder adskilt af komma" name="terms" variant="underlined" isRequired />
				<Textarea label="Definition" name="definition" variant="underlined" isRequired />
				<SubmitButton/>
			</form>}
		</section>
	)
}