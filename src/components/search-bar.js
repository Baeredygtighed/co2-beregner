"use client";
import { Input } from "@nextui-org/react";
import { IoSearchOutline } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

export default function SearchBar({className ='', onInput = null, value = ''}) {

    const handleInput = (event = null) => {
        value = event?.target?.value ?? '';
        onInput && onInput(event);
    }

    return (
        <Input className={twMerge("mx-1 w-[calc(100%-.5rem)]", className)} startContent={<IoSearchOutline />} variant="bordered" isClearable="true" placeholder="Søg..." onInput={handleInput} onClear={handleInput} />
    )
}