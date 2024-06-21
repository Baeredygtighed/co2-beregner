"use client"
import { MenuContext } from "@/contexts/menu-provider"
import { Button } from "@nextui-org/react"
import { useContext } from "react"

export default function MenuControl() {
	const { menuOpen, setMenuOpen } = useContext(MenuContext)

	return (
		<Button onClick={() => setMenuOpen(!menuOpen)}>
			{menuOpen ? "X" : "Menu"}
		</Button>
	)
}