"use client";
import MaterialList from "@/components/materials/material-list";
import MaterialSelector from "@/components/materials/material-selector";
import useAxios from "@/hooks/use-axios";
import { getSelectedMaterials } from "@/lib/actions";
import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { IoSearchOutline } from "react-icons/io5";

export default function MaterialsPage() {
    const { loading, data, error } = useAxios("/api/materials");

    const [selectedMaterials, setSelectedMaterials] = useState(null);

    const readCookie = async () => setSelectedMaterials(await getSelectedMaterials());

    useEffect(() => { readCookie() }, []);


    return (
        <div className="flex">

            <section className="flex-1 flex flex-col content-stretch px-2">

                <h1 className="text-center">Materialer</h1>

                <Input startContent={<IoSearchOutline />} variant="bordered" placeholder="Søg..." />

                {error && <div className="text-center text-red-600">Error: {error.message}</div>}
                {loading && <div className="flex justify-center items-center"><CgSpinner className="animate-[spin_.5s_linear_infinite] size-10 text-blue-600" /></div>}
                {data && selectedMaterials && <MaterialList materials={data.results} selectedMaterials={selectedMaterials} onChange={readCookie} />}

            </section>

            <MaterialSelector className="h-svh" materials={selectedMaterials} onChange={readCookie} />

        </div>
    )
}