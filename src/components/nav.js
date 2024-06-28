import { Navbar, NavbarItem } from "@nextui-org/react";
import Link from "next/link";
import { GiWoodBeam } from "react-icons/gi";

export default function Nav() {

    const linkStyles = "flex items-center flex-col uppercase text-xs [&>svg]:size-8";


  return (
    <Navbar>
        <NavbarItem>
            <Link href="/materials" className={linkStyles}><GiWoodBeam />Materialer</Link>
        </NavbarItem>

    </Navbar>
  );
}