import Logo from "@/components/logo";

export default function Home() {

	return (
		<div className="flex flex-col justify-center items-center px-2 pt-20">
			<Logo className="h-auto w-[80%] max-w-72" />
			<ul className="list-disc mt-4 [&>li]:my-2 [&>li]:ml-8">
				<li>Vælg <em>&quot;Materialer&quot;</em> for at sammenligne materialer.</li>
				<li>Vælg <em>&quot;Opslag</em>&quot; for at slå ord op i ordbogen.</li>
				<li>Vælg <em>&quot;Dashboard&quot;</em> for at tilføje og rette indhold. <br />(Kræver administrator rettighedder.)</li>
			</ul>
		</div>
	)
}
