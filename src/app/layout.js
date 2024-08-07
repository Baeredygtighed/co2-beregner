import "./globals.css"
import { Providers } from "./providers"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Navbar from "@/components/navbar"
import NavbarButton from "@/components/navbar-button"
import { GiHouse, GiOpenBook, GiWoodBeam  } from "react-icons/gi";
import { RiSettings5Fill } from "react-icons/ri";

export const metadata = {
	title: "CO₂mpare",
	description: "CO₂mpare er et værktøj til at sammenligne byggematerialers klimaaftryk. Find bæredygtige alternativer og lær mere om bæredygtige materialer.",
	other: {
	  "apple-mobile-web-app-capable": "yes",
	},
  };
  
  export const viewport = {
	initialScale: 1.0,
	maximumScale: 1.0,
	userScalable: 0,
	viewportFit: "cover",
  };

export default function RootLayout({ children }) {
	return (
		<html lang="da">
			<body>
				<Providers>
					<main>
						{children}
					</main>
					<Navbar>
						<NavbarButton url="/" text="Hjem" icon={<GiHouse />} />
						<NavbarButton url="/materials" alias="/compare" text="Materialer" icon={<GiWoodBeam />} />
						<NavbarButton url="/lookup" text="Opslag" icon={<GiOpenBook />} />
						<NavbarButton url="/dashboard" alias="/login" text="Dashboard" icon={<RiSettings5Fill />} />
					</Navbar>
				</Providers>
				<ToastContainer
					position="bottom-center"
					theme="colored"
					hideProgressBar={true}
					closeButton={false}
					closeOnClick={true}
					stacked={true}
				/>
			</body>
		</html>
	)
}
