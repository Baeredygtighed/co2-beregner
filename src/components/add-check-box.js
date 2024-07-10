"use client";

import { useRef } from "react";
import { RxPlus } from "react-icons/rx";
import { RxCheck } from "react-icons/rx";
import { twMerge } from "tailwind-merge";

export default function AddCheckBox({ className }) {

    const checkbox = useRef(null);

    const clickHandler = event => {
        event.target.dataset.checked = event.target.dataset.checked === "true" ? "false" : "true";
    }

    return (
        <button onClick={clickHandler} data-checked="false" ref={checkbox} className={twMerge(`
            border-2 border-black size-7 flex justify-center items-center rounded-md text-black
            [&>.plus-icon]:block [&>.check-icon]:hidden
            [&>.plus-icon]:data-[checked=true]:hidden [&>.check-icon]:data-[checked=true]:block data-[checked=true]:text-blue-500 data-[checked=true]:border-blue-500
        `, className)}>
            <RxPlus className="plus-icon size-6 pointer-events-none" />
            <RxCheck className="check-icon size-6 pointer-events-none" />
        </button>
    );
}