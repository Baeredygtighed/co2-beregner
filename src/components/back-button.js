
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

export default function BackButton() {
    const router = useRouter();

    return (
        <button onClick={() => router.back()} className="absolute flex justify-center align-middle"><IoIosArrowBack className="size-12" /></button>
    )
}