import AddCheckBox from "../add-check-box";
import MaterialIcon from "./material-icon";
import { addSelectedMaterial, removeSelectedMaterial } from "@/lib/actions";


export default  function MaterialList({ materials = [], selectedMaterials = [], size = "lg", onChange = null}) {

    return (
        <div>
            {materials?.map((material, index) => {
                return (
                    <div key={index} data-size={size} className="
                        border-b-1 border-gray-300 grid grid-cols-[auto_1fr_auto] py-2 px-4 justify-center items-center gap-x-2
                        data-[size=sm]:grid-cols-1 data-[size=sm]:p-0 data-[size=sm]:py-1
                        [&>.icon]:data-[size=sm]:size-7 
                        [&>h2]:data-[size=sm]:text-xs [&>h2]:data-[size=sm]:text-center [&>h2]:data-[size=sm]:font-normal
                        [&>.checkbox]:data-[size=sm]:hidden 
                        [&>p]:data-[size=sm]:hidden 

                        data-[size=md]:grid-cols-3 data-[size=md]:p-0 data-[size=md]:py-4
                        [&>.icon]:data-[size=md]:size-8 
                        [&>h2]:data-[size=md]:text-xs [&>h2]:data-[size=md]:font-normal [&>h2]:data-[size=md]:row-span-2
                        [&>p]:data-[size=md]:hidden 
                    ">
                        <MaterialIcon name={material.category} className="icon size-10 row-span-2 text-blue-500 m-auto" />
                        <h2 className="text-lg font-bold">{material.name}</h2>
                        <AddCheckBox checked={selectedMaterials.find(selectedMaterial => selectedMaterial.name === material.name) !== undefined} onChange={ event => {
                            event.detail.checked ? addSelectedMaterial(material) : removeSelectedMaterial(material);

                            if (onChange) onChange(event);
                         } } className="checkbox col-start-3 row-start-1 row-span-3" />
                        <p className="text-sm col-start-2 row-start-2">{material.category}</p>
                    </div>
                )
            })}
        </div>
    )
}