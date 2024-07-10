"use client";
import MaterialList from "@/components/material-list";
import useAxios from "@/hooks/use-axios";
import { CgSpinner } from "react-icons/cg";

export default function MaterialsPage() {
    const { loading, data, error } = useAxios("/api/materials");

    return (
        <>
            <h1 className="text-center">Materialer</h1>
            {error && <div className="text-center text-red-600">Error: {error.message}</div>}
            {loading && <div className="flex justify-center items-center"><CgSpinner className="animate-[spin_.5s_linear_infinite] size-10 text-blue-600" /></div>}
            {data && <MaterialList materials={data.results} />}
        </>


    )

}