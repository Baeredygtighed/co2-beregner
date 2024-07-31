"use client";
import StackedChart from "@/components/stacked-chart";
import { getSelectedMaterials } from "@/lib/actions";
import { useEffect, useState } from "react";

export default function ComparePage() {
    const [selectedMaterials, setSelectedMaterials] = useState(null);
    const [chartData, setChartData] = useState(null);

    const readCookie = async () => setSelectedMaterials(await getSelectedMaterials());

    useEffect(() => { readCookie() }, []);

    useEffect(() => {

        if (selectedMaterials) {

            console.log(selectedMaterials);
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
        <div className="p-2">
            <h1>Sammenlign materialer</h1>
            {chartData && <StackedChart labels={chartData.labels} datasets={chartData.datasets} />}
        </div>
    )

}