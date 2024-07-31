import { Button } from "@nextui-org/react";
import MaterialList from "./material-list";
import { MdCompareArrows } from "react-icons/md";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

export default function MaterialSelector({ materials = [], onChange = null, className }) {

    const [size, setSize] = useState("sm");

    return (
        <aside tabIndex={-1} onFocus={() => setSize("md")} onBlur={() => setSize("sm")} className={twMerge(
            "w-20 overflow-hidden focus-within:w-[45%] transition-all p-1 border-l-1 border-gray-300 flex flex-col bg-slate-200"
            , className)}>
            <h2 className="text-sm text-center">Valgte</h2>
            {materials?.length > 0 && <>

                <MaterialList size={size} materials={materials} selectedMaterials={materials} onChange={event => { if (onChange) onChange(event) }} />
                {materials?.length > 1 && <Link href="/compare" className="text-center">
                    <Button size="sm" color="primary" className="mt-4 text-md font-bold">{size === 'md' && <span className="-mt-1">Sammenlign</span>}<MdCompareArrows className="size-8" /></Button>
                </Link>}
            </>}
        </aside>

    )
}