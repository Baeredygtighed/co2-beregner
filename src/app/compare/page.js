"use client";
import BackButton from "@/components/back-button";
import Spinner from "@/components/spinner";
import StackedChart from "@/components/stacked-chart";
import { getSelectedMaterials } from "@/lib/actions";
import { useEffect, useState } from "react";
import { LuFactory } from "react-icons/lu";
import { IoConstructOutline } from "react-icons/io5";
import { FiTrash2 } from "react-icons/fi";
import { BiSolidUpArrow } from "react-icons/bi";

export default function ComparePage() {
    const [selectedMaterials, setSelectedMaterials] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [materialStats, setMaterialStats] = useState(null);

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

            const highestProduction = selectedMaterials.find(material => material.production_cost === Math.max(...selectedMaterials.map(material => material.production_cost)));
            const highestUsage = selectedMaterials.find(material => material.usage_cost === Math.max(...selectedMaterials.map(material => material.usage_cost)));
            const highestDestruction = selectedMaterials.find(material => material.destruction_cost === Math.max(...selectedMaterials.map(material => material.destruction_cost)));
            const highestTotal = selectedMaterials.find(material => material.production_cost + material.usage_cost + material.destruction_cost === Math.max(...selectedMaterials.map(material => material.production_cost + material.usage_cost + material.destruction_cost)));

            const lowestProduction = selectedMaterials.find(material => material.production_cost === Math.min(...selectedMaterials.map(material => material.production_cost)));
            const lowestUsage = selectedMaterials.find(material => material.usage_cost === Math.min(...selectedMaterials.map(material => material.usage_cost)));
            const lowestDestruction = selectedMaterials.find(material => material.destruction_cost === Math.min(...selectedMaterials.map(material => material.destruction_cost)))
            const lowestTotal = selectedMaterials.find(material => material.production_cost + material.usage_cost + material.destruction_cost === Math.min(...selectedMaterials.map(material => material.production_cost + material.usage_cost + material.destruction_cost)));

            setMaterialStats({
                highestProduction,
                highestUsage,
                highestDestruction,
                highestTotal,
                lowestProduction,
                lowestUsage,
                lowestDestruction,
                lowestTotal
            });

            setChartData({ labels, datasets });

        }
    }, [selectedMaterials]);

    return (
        <>
            <header className="sticky top-0 py-2 bg-white border-b-1">
                <BackButton />
                <h1 className="text-center text-2xl font-semibold my-2 flex-1">Sammenlign materialer</h1>
            </header>
            
            <div className="px-2 min-h-full mb-28 max-w-[800px] mx-auto" >
                {!chartData && <Spinner />}
                {chartData && <StackedChart labels={chartData.labels} datasets={chartData.datasets} />}
                {materialStats && <>
                    
                    <table className="w-full mx-auto">
                        <thead>
                            <tr>
                                <th colSpan={5}><h2 className="text-center text-xl font-semibold my-2">Højeste CO<sub>2</sub> forbrug:</h2></th>
                            </tr>
                            <tr>
                                <th colSpan={2} className="text-center">Statistik</th>
                                <th className="text-center">Materiale</th>
                                <th colSpan={2} className="text-center">CO<sub>2</sub></th>
                            </tr>
                        </thead>
                        <tbody className="[&>tr>td:nth-child(1)]:w-min [&>tr>td:nth-child(3)]:w-max [&>tr>td:nth-child(4)]:text-right [&>tr>td:nth-child(5)]:text-xs [&>tr>td:nth-child(5)]:w-min">
                            <tr>
                                <td><LuFactory /></td>
                                <td>Produktion</td>
                                <td>{materialStats.highestProduction.name}</td>
                                <td>{materialStats.highestProduction.production_cost}</td>
                                <td><span>kg CO<sub>2</sub> eq/ton</span></td>
                            </tr>
                            <tr>
                                <td><IoConstructOutline /></td>
                                <td>Anvendelse</td>
                                <td>{materialStats.highestProduction.name}</td>
                                <td>{materialStats.highestUsage.usage_cost}</td>
                                <td><span>kg CO<sub>2</sub> eq/ton</span></td>
                            </tr>
                            <tr>
                                <td><FiTrash2 /></td>
                                <td>Afskaffelse</td>
                                <td>{materialStats.highestDestruction.name}</td>
                                <td>{materialStats.highestDestruction.destruction_cost}</td>
                                <td><span>kg CO<sub>2</sub> eq/ton</span></td>
                            </tr>
                            <tr>
                                <td><BiSolidUpArrow /></td>
                                <td>Samlet</td>
                                <td>{materialStats.highestTotal.name}</td>
                                <td>{materialStats.highestTotal.production_cost + materialStats.highestTotal.usage_cost + materialStats.highestDestruction.destruction_cost}</td>
                                <td><span>kg CO<sub>2</sub> eq/ton</span></td>
                            </tr>
                        </tbody>
                        <thead>
                            <tr>
                                <th colSpan={5}><h2 className="text-center text-xl font-semibold my-2">Laveste CO<sub>2</sub> forbrug:</h2></th>
                            </tr>
                            <tr>
                                <th colSpan={2} className="text-center">Statistik</th>
                                <th className="text-center">Materiale</th>
                                <th colSpan={2} className="text-center">CO<sub>2</sub></th>
                            </tr>
                        </thead>
                        <tbody className="[&>tr>td:nth-child(1)]:w-min [&>tr>td:nth-child(3)]:w-max [&>tr>td:nth-child(4)]:text-right [&>tr>td:nth-child(5)]:text-xs">
                            <tr>
                                <td><LuFactory /></td>
                                <td>Produktion</td>
                                <td>{materialStats.lowestProduction.name}</td>
                                <td>{materialStats.lowestProduction.production_cost}</td>
                                <td><span>kg CO<sub>2</sub> eq/ton</span></td>
                            </tr>
                            <tr>
                                <td><IoConstructOutline /></td>
                                <td>Anvendelse</td>
                                <td>{materialStats.lowestProduction.name}</td>
                                <td>{materialStats.lowestUsage.usage_cost}</td>
                                <td><span>kg CO<sub>2</sub> eq/ton</span></td>
                            </tr>
                            <tr>
                                <td><FiTrash2 /></td>
                                <td>Afskaffelse</td>
                                <td>{materialStats.lowestDestruction.name}</td>
                                <td>{materialStats.lowestDestruction.destruction_cost}</td>
                                <td><span>kg CO<sub>2</sub> eq/ton</span></td>
                            </tr>
                            <tr>
                                <td><BiSolidUpArrow /></td>
                                <td>Samlet</td>
                                <td>{materialStats.lowestTotal.name}</td>
                                <td>{materialStats.lowestTotal.production_cost + materialStats.lowestTotal.usage_cost + materialStats.lowestDestruction.destruction_cost}</td>
                                <td><span>kg CO<sub>2</sub> eq/ton</span></td>
                            </tr>
                        </tbody>
                    </table>
                </>}
            </div>
        </>

    )

}