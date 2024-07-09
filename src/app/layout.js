import "./globals.css"
import { Providers } from "./providers"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
}

export default function RootLayout({ children }) {
	return (
		<html lang="da">
			<body>
				<Providers>
					<main>
						{children}
					</main>
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
