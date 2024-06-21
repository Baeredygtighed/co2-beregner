"use client"
import { createContext, useState } from "react"

export const MenuContext = createContext(false)

export default function MenuProvider({children}) {
	const [menuOpen, setMenuOpen] = useState(false)

	return (
		<MenuContext.Provider value={{menuOpen, setMenuOpen}}>
			{children}
		</MenuContext.Provider>
	)
}
