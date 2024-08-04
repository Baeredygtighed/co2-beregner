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
        <div className="flex">

            <section className="flex-1 flex flex-col content-stretch px-2 pb-28">
                <header className="sticky top-0 py-2 bg-white border-b-1 z-10">
                    <h1 className="text-center text-3xl font-semibold">Materialer</h1>
                    <Input className="mb-1" startContent={<IoSearchOutline />} variant="bordered" isClearable="true" placeholder="Søg..." onInput={search} onClear={search} />
                </header>


                {axios.error && <div className="text-center text-red-600">Error: {error.message}</div>}
                {axios.loading && <Spinner />}
                {axios.data && selectedMaterials && <MaterialList materials={axios.data.results} selectedMaterials={selectedMaterials} onChange={readCookie} />}

            </section>

            <MaterialSelector className="h-svh" materials={selectedMaterials} onChange={readCookie} />

        </div>
    )
}