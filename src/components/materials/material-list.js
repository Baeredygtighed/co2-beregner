import AddCheckBox from "../add-check-box";
import MaterialIcon from "./material-icon";
import { addSelectedMaterial, removeSelectedMaterial } from "@/lib/actions";
import { LuFactory } from "react-icons/lu";
import { IoConstructOutline } from "react-icons/io5";
import { FiTrash2 } from "react-icons/fi";
import { BsChevronCompactUp } from "react-icons/bs";
import style from "./material-list.module.scss";
import { twMerge } from "tailwind-merge";


export default function MaterialList({ materials = [], selectedMaterials = [], size = "lg", onChange = null }) {

    return (
        <div>
            {materials?.map((material, index) => {
                return (
                    <div key={index} data-size={size} className={twMerge(style.flyin, `
                        border-b-1 border-gray-300 grid grid-cols-[1fr_auto] justify-center items-center gap-x-2 data-[size=sm]:block
                        [&>.close]:max-h-0 [&>.close]:focus-within:max-h-[0.75rem]
                        [&>.checkbox]:data-[size=sm]:hidden [&>.checkbox]:data-[size=md]:size-5
                        data-[size=sm]:min-h-16 data-[size=md]:min-h-16 data-[size=md]:pr-2
                        `)}>
                        <div data-size={size} tabIndex={size === "lg" ? -1 : null} className="
                            [&>.stats]:max-h-[0px] [&>.stats]:focus-within:max-h-[200px] grid grid-cols-[auto_1fr] gap-x-2 py-2 items-center

                            data-[size=sm]:grid-cols-1 data-[size=sm]:p-0 data-[size=sm]:py-1 

                            [&>.icon]:data-[size=sm]:size-6 
                            [&>h2]:data-[size=sm]:text-xs [&>h2]:data-[size=sm]:text-center [&>h2]:data-[size=sm]:font-normal
                            
                            [&>p]:data-[size=sm]:hidden
                            [&>.stats]:data-[size=sm]:hidden 

                            data-[size=md]:p-0 data-[size=md]:pr-2 data-[size=md]:py-3
                            [&>.icon]:data-[size=md]:size-7 
                            [&>h2]:data-[size=md]:text-xs [&>h2]:data-[size=md]:font-normal [&>h2]:data-[size=md]:row-span-2
                            
                            [&>p]:data-[size=md]:hidden
                            [&>.stats]:data-[size=md]:hidden 
                        ">

                            <MaterialIcon name={material.category} className="icon size-10 row-span-2 text-blue-500 m-auto" />
                            <h2 className="text-lg font-semibold leading-4">{material.name}</h2>

                            <p className="text-xs col-start-2 row-start-2 w-fit text-gray-400 uppercase">{material.category}</p>
                            <div className="stats overflow-hidden col-span-3 transition-all duration-500">
                                <table className="
                                    text-sm text-gray-400 w-fit
                                    [&>tbody>tr>td:nth-child(3)]:px-2 [&>tbody>tr>td:nth-child(3)]:text-right [&>tbody>tr>td:nth-child(3)]:text-black [&>tbody>tr>td:nth-child(3)]:font-bold
                                    [&>tbody>tr>td>span]:text-xs [&>tbody>tr>td>span]:text-gray-400 [&>tbody>tr>td>span]:font-normal

                                ">
                                    <tbody>
                                        <tr>
                                            <td><LuFactory /></td>
                                            <td>Produktion:</td>
                                            <td>{material.production_cost}<span>kg CO<sub>2</sub> eq/ton</span></td>
                                        </tr>
                                        <tr>
                                            <td><IoConstructOutline /></td>
                                            <td>Anvendelse:</td>
                                            <td>{material.production_cost}<span>kg CO<sub>2</sub> eq/ton</span></td>
                                        </tr>
                                        <tr>
                                            <td><FiTrash2 /></td>
                                            <td>Afskaffelse:</td>
                                            <td>{material.destruction_cost}<span>kg CO<sub>2</sub> eq/ton</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                                </div>
                        </div>
                        <AddCheckBox  minus={size === 'md'} checked={selectedMaterials.find(selectedMaterial => selectedMaterial.name === material.name) !== undefined} onChange={event => {
                            event.detail.checked ? addSelectedMaterial(material) : removeSelectedMaterial(material);

                            if (onChange) onChange(event);
                        }} className="checkbox col-start-3 row-start-1 data-[size=sm]:hidden" />
                        <button onClick={() => document.activeElement.blur()} className="close overflow-hidden w-full p-0 flex h-3 justify-center items-center text-blue-600 col-start-1 row-start-3 col-span-3 transition-all delay-200 duration-0"><BsChevronCompactUp className="size-9" /></button>
                            
                    </div>
                )
            })}
        </div>
    )
}