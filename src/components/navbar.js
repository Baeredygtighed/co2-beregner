export default function Navbar({children}) {

    return (
        <nav className='fixed bottom-0 w-full bg-gray-100 border-t-1 shadow-[0_-5px_10px_0px_#00000011]'>
            <ul className='flex justify-stretch [&>li+li]:border-l-1 [&>li+li]:border-gray-200'>
                {children}
            </ul>
        </nav>
    );
}