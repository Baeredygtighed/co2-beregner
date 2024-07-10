"use client";
import MaterialList from "@/components/materials/material-list";
import MaterialSelector from "@/components/materials/material-selector";
import useAxios from "@/hooks/use-axios";
import { getSelectedMaterials } from "@/lib/actions";
import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";

export default function MaterialsPage() {
    const { loading, data, error } = useAxios("/api/materials");

    const [selectedMaterials, setSelectedMaterials] = useState(null);

    const readCookie = async () => setSelectedMaterials( await getSelectedMaterials() );

    useEffect(() => {
        readCookie();
    }, []);

    return (
        <div className="flex">
            <main className="flex-1">
                <h1 className="text-center">Materialer</h1>
                {error && <div className="text-center text-red-600">Error: {error.message}</div>}
                {loading && <div className="flex justify-center items-center"><CgSpinner className="animate-[spin_.5s_linear_infinite] size-10 text-blue-600" /></div>}
                {data && selectedMaterials && <MaterialList materials={data.results} selectedMaterials={selectedMaterials} onChange={ () => readCookie() } />}
            </main>
            <MaterialSelector materials={selectedMaterials} onChange={ () => readCookie() } />
        </div>


    )

}