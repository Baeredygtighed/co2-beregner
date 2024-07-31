"use client";

import { RxPlus, RxMinus, RxCheck } from "react-icons/rx";
import { twMerge } from "tailwind-merge";

export default function AddCheckBox({ className, onChange = null, checked = false, minus = false}) {

    const clickHandler = event => {

        checked = event.target.dataset.checked === "true" ? "false" : "true";

        if (onChange) onChange(new CustomEvent("change", {detail: { checked: checked === "true" }}));
    }

    return (
        <div onClick={clickHandler} data-checked={checked} className={twMerge(`
            border-2 border-black size-7 flex justify-center items-center rounded-md text-black cursor-pointer transition-all
            [&>.plus-icon]:block [&>.check-icon]:hidden
            [&>.plus-icon]:data-[checked=true]:hidden [&>.check-icon]:data-[checked=true]:block data-[checked=true]:text-blue-500 data-[checked=true]:border-blue-500
        `, className)}>
            <RxPlus className="plus-icon size-6 pointer-events-none" />
            { minus ? <RxMinus className="check-icon size-6 pointer-events-none" /> : <RxCheck className="check-icon size-6 pointer-events-none" />}
        </div>
    );
}