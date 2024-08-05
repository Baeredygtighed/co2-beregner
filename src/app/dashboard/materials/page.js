"use client"

import useAxios from "@/hooks/use-axios"
import { deleteMaterial } from "@/lib/actions"
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Skeleton, useDisclosure } from "@nextui-org/react"
import Link from "next/link"
import { useEffect } from "react"
import { useFormState } from "react-dom"
import { FaPen, FaTrash } from "react-icons/fa"
import { toast } from "react-toastify"

export default function Page() {
	const { data, loading, error } = useAxios("/api/materials")

	return (
		<section className="px-4">
			<h1>Materialer</h1>
			{loading && (
				      <div className="space-y-3">
							<Skeleton className="w-full rounded-lg">
								<div className="h-12 w-full rounded-lg bg-default-200"></div>
							</Skeleton>
							<Skeleton className="w-full rounded-lg">
								<div className="h-12 w-full rounded-lg bg-default-200"></div>
							</Skeleton>
							<Skeleton className="w-full rounded-lg">  
								<div className="h-12 w-full rounded-lg bg-default-300"></div>
							</Skeleton>
							<Skeleton className="w-full rounded-lg">
								<div className="h-12 w-full rounded-lg bg-default-200"></div>
							</Skeleton>
							<Skeleton className="w-full rounded-lg">
								<div className="h-12 w-full rounded-lg bg-default-200"></div>
							</Skeleton>
							<Skeleton className="w-full rounded-lg">  
								<div className="h-12 w-full rounded-lg bg-default-300"></div>
							</Skeleton>
						</div>
			)}
			{error && <p>Error: {error.message}</p>}
			{data && (
				<>
					<ul className="">
						{data.results.map(material => (
							<li key={material._id} className="flex justify-between leading-[3em] px-2 odd:bg-gray-200">
								{material.name}
								<div className="flex">
									<Link href={"edit-material/" + material._id} className="p-4"><FaPen/></Link>
									<Confirm id={material._id} name={material.name} />
								</div>
							</li>
						))}
					</ul>
				</>
			)}
		</section>
	)
}

function Confirm({ id, name }) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const [errorMessage, dispatch] = useFormState(deleteMaterial, null)

	useEffect(function() {
		if (errorMessage) {
			toast.error(errorMessage)
		}
	}, [errorMessage])

	return (
		<>
			<button className="p-4" onClick={onOpen}><FaTrash/></button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" backdrop="blur">
				<ModalContent>
					{onClose => (
						<>
						<ModalHeader>Slet</ModalHeader>
						<ModalBody>
							<p>Er du sikker på, at du vil slette "{name}"?</p>
						</ModalBody>
						<ModalFooter>
							<form action={dispatch}>
								<Input type="hidden" name="id" defaultValue={id} />
								<Button color="primary" type="submit" onClick={onClose}>Ja</Button>
								<Button onClick={onClose} type="button">Afbryd</Button>
							</form>
						</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}
