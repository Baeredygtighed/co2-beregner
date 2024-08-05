"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarButton({url, text, icon, alias = null}) {

    const isCurrentPage = url.length !== 1 ? usePathname().startsWith(url) || usePathname().startsWith(alias) : usePathname() === url;
    
    return (
        <li className="flex-1">
            <Link data-current={isCurrentPage} href={url} className="
                flex flex-col items-center [&>svg]:size-10 text-slate-600 uppercase py-2
                data-[current=true]:text-blue-600 transition-all data-[current=true]:scale-110 data-[current=true]:bg-white
            ">{icon}<span className="text-xs font-bold">{text}</span></Link>
        </li>
    );
}