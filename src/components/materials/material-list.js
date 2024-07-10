import AddCheckBox from "../add-check-box"
import MaterialIcon from "./material-icon"

export default function MaterialList({ materials }) {

    return (
        <div>
            {materials.map((material, index) => {
                return (
                    <div key={index} className="border-b-1 border-gray-300 grid grid-cols-[auto_1fr_auto] py-2 px-4 justify-center items-center gap-x-2">
                        <MaterialIcon name={material.category} className="size-10 row-span-2 text-blue-500" />
                        <h2 className="text-lg font-bold">{material.name}</h2><AddCheckBox className="col-start-3 row-start-1 row-span-3" />
                        <p className="col-span-2 text-sm col-start-2 row-start-2">{material.category}</p>
                    </div>
                )
            })}
        </div>
    )
}