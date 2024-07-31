import { GiWoodBeam } from "react-icons/gi";
import { GiConcreteBag } from "react-icons/gi";
import { GrStatusUnknown } from "react-icons/gr";

export default function MaterialIcon({ name, className }) {
    const categoryIcons = [
        { name: 'træ', icon: GiWoodBeam },
        { name: 'beton', icon: GiConcreteBag },
    ];

    const Icon = categoryIcons.find(icon => icon.name === name.toLowerCase())?.icon ?? GrStatusUnknown;

    return ( <Icon className={className} /> );
}