"use client"

import { Link, Button } from "@nextui-org/react"

export default function DashboardPage() {
	return (
		<div className="flex flex-col p-4 gap-4">
			<h1 className="text-center text-3xl font-semibold">Dashboard</h1>
			<Button as={Link} href="/dashboard/materials" color="primary" size="lg">Tilføj/ret materialer</Button>
			<Button as={Link} href="/dashboard/terms" color="primary" size="lg">Tilføj/ret ord</Button>
		</div>

	)
}
