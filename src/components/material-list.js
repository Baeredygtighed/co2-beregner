export default function MaterialList({ materials }) {

    return (
        <div>
            {materials.map((material, index) => {
                return (
                    <div key={index} className="border-b-1 border-gray-300 grid grid-cols-[1fr_auto] py-2 px-4">
                        <h2 className="text-lg font-bold">{material.name}</h2><input type="checkbox" className="size-4" />
                        <p className="col-span-2 text-sm">{material.category}</p>
                    </div>
                )
            })}
        </div>
    )
}