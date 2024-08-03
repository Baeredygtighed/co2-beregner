"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";

export default function TermList({ data }) {

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
        <Accordion className="pl-1">
            {data?.map(item =>
                <AccordionItem key={item.terms[0]} title={item.terms[0]}>{createMarkup(item.definition)}</AccordionItem>
            )}
        </Accordion>
    )

}