"use client"

import { authenticate } from "@/lib/actions"
import { useFormState, useFormStatus } from "react-dom"
import { Input, Button } from "@nextui-org/react"
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

export default function LoginPage() {
	const [errorMessage, dispatch] = useFormState(authenticate, null)
	const [showPassword, setShowPassword] = useState(false)
	const router = useRouter()

	useEffect(function() {
		if (errorMessage === true) {
			router.push("/dashboard")
		} else if (errorMessage) {
			toast.error(errorMessage)
		}
	}, [errorMessage])

	return (
		<section className="px-4">
			<h1 className="text-3xl font-semibold text-center">Login</h1>
			<form action={dispatch}>
				<Input
					type="text"
					name="username"
					label="Brugernavn"
					variant="underlined"
					isRequired />
				<Input
					type={showPassword ? "text" : "password"}
					name="password"
					label="Adgangskode"
					variant="underlined"
					isRequired
					
					endContent={
						<button type="button" onClick={() => setShowPassword(!showPassword)} className="focus:outline-none">
							{showPassword ? <FaEyeSlash/> : <FaEye/>}
						</button>
					}/>
				<LoginButton/>
			</form>
		</section>
	)
}

function LoginButton() {
	const {pending} = useFormStatus()

	function handleClick(event) {
		if (pending) {
			event.preventDefault()
		}
	}

	return (
		<Button
			color="primary"
			type="submit"
			className="w-full mt-4"
			aria-disabled={pending}
			onClick={handleClick}>
			Login {pending && <FaSpinner className="animate-spin" size={16}/>}
		</Button>
	)
}
