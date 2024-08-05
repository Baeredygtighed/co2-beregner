"use client"

import useAxios from "@/hooks/use-axios"
import { Skeleton } from "@nextui-org/react"
import Link from "next/link"
import { FaPen } from "react-icons/fa"

export default function Page() {
	const { error, data, loading } = useAxios("/api/terms")

	return (
		<section className="px-4">
			<h1>Ordbog</h1>
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
			{error && <p>{error}</p>}
			{data && (
				<ul>
					{data.results.map((term) => (
						<li key={term.terms.join(", ")} className="flex justify-between leading-[3em] odd:bg-gray-200 px-2">
							<p>{term.terms.join(", ")}</p>
							<div className="flex">
								<Link href={"edit-term/" + term._id} className="p-4"><FaPen /></Link>
							</div>
						</li>
					))}
				</ul>
			)}
		</section>
	)
}
