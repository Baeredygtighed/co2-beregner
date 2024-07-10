import { Button } from "@nextui-org/react";
import MaterialList from "./material-list";
import { MdCompareArrows } from "react-icons/md";
import { useState } from "react";

export default function MaterialSelector({ materials = [], onChange = null }) {

    const [size, setSize] = useState("sm");

    return (
        <aside tabIndex={-1} onFocus={() => setSize("md")} onBlur={() => setSize("sm")} className="w-[18%] overflow-hidden focus-within:w-[45%] transition-all p-1 border-l-1 border-gray-300 flex flex-col bg-slate-200">
            <h2 className="text-sm text-center">Valg</h2>
            {materials?.length > 0 && <>
                
                <MaterialList size={size} materials={materials} selectedMaterials={materials} onChange={event => { if (onChange) onChange(event) }} />
                {materials?.length > 1 && <Button size="sm" color="primary" className="w-full mt-4"><MdCompareArrows className="size-8" /></Button>}
            </>}
        </aside>

    )
}