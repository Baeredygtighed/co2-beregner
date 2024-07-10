"use client";
import SearchBar from "@/components/search-bar";
import { useRouter } from "next/navigation";

export default function LookupDetailsPage({ params }) {

    const dummyData = [
        { 
            terms: ["Biobaseret", "Biobaserede"],
            definition: "Disse materialer stammer fra naturlige ressourcer, såsom træ, hør, halm og ålegræs. De optager CO₂ fra atmosfæren, mens de vokser, og er derfor mere bæredygtige. Eksempler inkluderer træ og papir."
        },
        { 
            terms: ["Genbrug"],
            definition: "Disse materialer er blevet brugt før og er blevet genanvendt til nye produkter. Eksempler inkluderer genbrugspapir, genbrugt plast og genbrugt metal."
        },
        {
            terms: ["Miljømærkning", "Miljømærket"],
            definition: "Der findes forskellige mærkningsordninger, som hjælper med at vælge bæredygtige byggematerialer. For træ kan du kigge efter **FSC** eller **PEFC**."
        },
        {
            terms: ["FSC"],
            definition: "Forest Stewardship Council (FSC) er en international mærkningsordning, der sikrer, at træ og papir kommer fra bæredygtigt skovbrug."
        },
        {
            terms: ["PEFC"],
            definition: "Programme for the Endorsement of Forest Certification (PEFC) er en international mærkningsordning, der sikrer, at træ og papir kommer fra bæredygtigt skovbrug."
        },
    ];

    
    const router = useRouter();
    const searchResults = dummyData.filter(result => result.terms.some(term => term.toLowerCase().includes(params.query.toLowerCase())));

    const createMarkup = text => {
        const parts = text.split(/\*\*(.+?)\*\*/g);

        return parts.map((part, index) => {
            if (index % 2 === 1) {
                return <span className="font-bold cursor-pointer underline" key={index} onClick={() => router.replace(`/lookup/${part.toLowerCase()}`)}>{part}</span>;
            }
            return part;
        });
    }

    return (
        <>
            <SearchBar baseUrl="lookup" value={params.query} />
            <div className="flex flex-col gap-2">
                {searchResults.map(result => (
                    <details key={result.terms[0]} className="pl-1">
                        <summary className="cursor-pointer p-2">{result.terms[0]}</summary>
                        <p>{createMarkup(result.definition)}</p>
                    </details>
                ))}
            </div>
        </>

    )
}