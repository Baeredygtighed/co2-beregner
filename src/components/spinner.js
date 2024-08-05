import { CgSpinner } from "react-icons/cg";

export default function Spinner() {
    return (
        <div className="flex justify-center items-center w-full h-full absolute top-0 z-10"><CgSpinner className="animate-[spin_.5s_linear_infinite] size-20 text-blue-600" /></div>
    )
}