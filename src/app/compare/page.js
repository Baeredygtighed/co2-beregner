"use client";
import BackButton from "@/components/back-button";
import Spinner from "@/components/spinner";
import StackedChart from "@/components/stacked-chart";
import { getSelectedMaterials } from "@/lib/actions";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

export default function ComparePage() {
    const [selectedMaterials, setSelectedMaterials] = useState(null);
    const [chartData, setChartData] = useState(null);

    const readCookie = async () => setSelectedMaterials(await getSelectedMaterials());

    useEffect(() => { readCookie() }, []);

    useEffect(() => {

        if (selectedMaterials) {

            const labels = selectedMaterials.map(material => material.name);
            const datasets = [
                {
                    label: "Produktion",
                    data: selectedMaterials.map(material => material.production_cost),
                    backgroundColor: '#3F88C5',
                },
                {
                    label: "Anvendelse",
                    data: selectedMaterials.map(material => material.usage_cost),
                    backgroundColor: '#F49D37',
                },
                {
                    label: "Afskaffelse",
                    data: selectedMaterials.map(material => material.destruction_cost),
                    backgroundColor: '#D72638',
                },
            ];

            setChartData({ labels, datasets });


        }
    }, [selectedMaterials]);

    return (
        <>
            <BackButton />
            <div className="px-2" >

                <h1 className="text-center text-3xl font-semibold my-2 flex-1">Sammenlign materialer</h1>

                {!chartData && <Spinner />}
                {chartData && <StackedChart labels={chartData.labels} datasets={chartData.datasets} />}
            </div>
        </>

    )

}