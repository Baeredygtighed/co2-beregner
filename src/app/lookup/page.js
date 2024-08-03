"use client";
import SearchBar from "@/components/search-bar";
import Spinner from "@/components/spinner";
import TermList from "@/components/term-list";
import useAxios from "@/hooks/use-axios";

export default function LookupPage() {

    const axios = useAxios(`/api/terms`);

    /*     const dummyData = [
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
        ]; */

    return (
        <>
            <h1 className="text-center text-3xl font-semibold my-2">Opslag</h1>
            <SearchBar className="my-2" onInput={ event => axios.update(`/api/terms/${event ? event.target.value : ''}`)} />
            {axios.error && <div className="text-center text-red-600">Error: {axios.error.message}</div>}
            {axios.loading && <Spinner />}
            {axios.data && <TermList data={axios.data.results} />}
        </>
    )
}