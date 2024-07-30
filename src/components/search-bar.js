"use client";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

export default function SearchBar({baseUrl, value = "", className = ""}) {

    const router = useRouter();

    const search = event => {
        const query = event.target.value.toLowerCase();

        router.replace(!query ? `/${baseUrl}` : `/${baseUrl}/${query}`);
    }

    return (
        <input onInput={search} type="text" value={value} placeholder="Søg..." className={twMerge("w-full p-2 outline-none bg-gray-200 rounded-xl", className)} />
    )
}