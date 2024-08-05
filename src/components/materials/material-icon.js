import { GiWoodBeam, GiConcreteBag, GiRolledCloth, GiBrickPile, GiPapers, GiCheeseWedge, GiMetalBar, GiWarpPipe } from "react-icons/gi";
import { GrStatusUnknown } from "react-icons/gr";

export default function MaterialIcon({ name, className }) {
    const categoryIcons = [
        { name: 'træ', icon: GiWoodBeam },
        { name: 'beton', icon: GiConcreteBag },
        { name: 'beklædning', icon: GiRolledCloth },
        { name: 'sten', icon: GiBrickPile },
        { name: 'isolering', icon: GiPapers  },
        { name: 'organisk', icon: GiCheeseWedge },
        { name: 'metal', icon: GiMetalBar },
        { name: 'plast', icon: GiWarpPipe },

    ];

    const Icon = categoryIcons.find(icon => icon.name === name.toLowerCase())?.icon ?? GrStatusUnknown;

    return ( <Icon className={className} /> );
}