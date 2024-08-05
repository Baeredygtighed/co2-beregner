"use client"

import BackButton from "@/components/back-button"
import useAxios from "@/hooks/use-axios"
import { deleteMaterial } from "@/lib/actions"
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Skeleton, useDisclosure } from "@nextui-org/react"
import Link from "next/link"
import { useEffect } from "react"
import { useFormState } from "react-dom"
import { FaPen, FaTrash } from "react-icons/fa"
import { toast } from "react-toastify"
import { FaPlus } from "react-icons/fa";

export default function Page() {
	const { data, loading, error, update } = useAxios("/api/materials")

	return (
		<>
		<BackButton className="pt-1" />
		<Button as={Link} href="/dashboard/new-material" color="primary" className="absolute right-0 mt-2 mx-4 rounded-full font-bold min-w-0 p-2 aspect-square text-2xl"><FaPlus /></Button>
		<section className="px-4">
		<h1 className="text-center text-3xl font-semibold mb-4">Materialer</h1>
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
									<Confirm id={material._id} name={material.name} update={update} />
								</div>
							</li>
						))}
					</ul>
				</>
			)}
		</section>
		</>
	)
}

function Confirm({ id, name, update }) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const [errorMessage, dispatch] = useFormState(deleteMaterial, null)

	useEffect(function() {
		if (errorMessage?.success === true) {
			update("/api/materials")
			toast.success("Materialet er slettet")
		} else if (errorMessage) {
			toast.error(errorMessage)
		}
	}, [errorMessage, update])

	return (
		<>
			<button className="p-4" onClick={onOpen}><FaTrash/></button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" backdrop="blur">
				<ModalContent>
					{onClose => (
						<>
						<ModalHeader>Slet</ModalHeader>
						<ModalBody>
							<p>Er du sikker på, at du vil slette &quot;{name}&quot;?</p>
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

	function Confirm({ id, name }) {
		const { isOpen, onOpen, onOpenChange } = useDisclosure()
		const [errorMessage, dispatch] = useFormState(deleteMaterial, null)
	
		useEffect(function () {
			if (errorMessage?.success === true) {
				toast.success("Materialet er slettet")
				axios.update("/api/materials")
			} else if (errorMessage) {
				toast.error(errorMessage)
			}
		}, [errorMessage])
	
		return (
			<>
				<button className="p-4" onTouchEnd={onOpen}><FaTrash /></button>
				<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" backdrop="blur">
					<ModalContent>
						{onClose => (
							<>
								<ModalHeader>Slet</ModalHeader>
								<ModalBody>
									<p>Er du sikker på, at du vil slette &quot;{name}&quot;?</p>
								</ModalBody>
								<ModalFooter>
									<form action={dispatch}>
										<Input type="hidden" name="id" defaultValue={id} />
										<Button color="primary" type="submit" onTouchEnd={onClose}>Ja</Button>
										<Button onTouchEnd={onClose} type="button">Afbryd</Button>
									</form>
								</ModalFooter>
							</>
						)}
					</ModalContent>
				</Modal>
			</>
		)
	}

}


