"use client"

import MenuProvider from "@/contexts/menu-provider"
import { NextUIProvider } from "@nextui-org/react"

export function Providers({children}) {
	return (
		<NextUIProvider>
			<MenuProvider>
				{children}
			</MenuProvider>
		</NextUIProvider>
	)
}