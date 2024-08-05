
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { twMerge } from "tailwind-merge";

export default function BackButton({ className }) {
    const router = useRouter();

    return (
        <button onClick={() => router.back()} className={twMerge("absolute flex justify-center align-middle", className)}><IoIosArrowBack className="size-12" /></button>
    )
}