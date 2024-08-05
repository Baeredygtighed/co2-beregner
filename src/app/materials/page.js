"use client";
import MaterialList from "@/components/materials/material-list";
import MaterialSelector from "@/components/materials/material-selector";
import Spinner from "@/components/spinner";
import useAxios from "@/hooks/use-axios";
import { getSelectedMaterials } from "@/lib/actions";
import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

export default function MaterialsPage() {
    const axios = useAxios("/api/materials");

    const [selectedMaterials, setSelectedMaterials] = useState(null);

    const readCookie = async () => setSelectedMaterials(await getSelectedMaterials());
    const search = event => axios.update(`/api/materials${event && event.target.value !== '' ? `?search=${event.target.value}` : ""}`);

    useEffect(() => { readCookie() }, []);

    return (
        <div className="flex min-h-lvh">

            <div className="flex-1 flex flex-col content-stretch pb-28">
                <header className="sticky top-0 py-2 bg-white border-b-1 z-10 px-2">
                    <h1 className="text-center text-3xl font-semibold">Materialer</h1>
                    <Input className="mb-1" startContent={<IoSearchOutline />} variant="bordered" isClearable="true" placeholder="Søg..." onInput={search} onClear={search} />
                    
                </header>


                {axios.error && <div className="text-center text-red-600">Error: {error.message}</div>}
                {axios.loading && <Spinner />}
                {axios.data && selectedMaterials && <MaterialList className="px-4" materials={axios.data.results} selectedMaterials={selectedMaterials} onChange={readCookie} />}
                

            </div>

            <MaterialSelector materials={selectedMaterials} onChange={readCookie} />

        </div>
    )
}