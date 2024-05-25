import { createPortal } from "react-dom"

export default function Sidebar({ setSidebarToggle }) {
    return (
        <>
            {createPortal(
                <div className="flex z-30">
                    <div onClick={() => setSidebarToggle((prev) => !prev)} id="backdrop"></div>
                    <div className="flex flex-col fixed z-30 h-full bg-white w-56 max-w-56 pt-24 sidebar">
                        <button onClick={() => setSidebarToggle((prev) => !prev)}><img className="h-5 w-fit mb-10 absolute left-44 top-5" src={closeImg} alt="closeImg" /></button>
                        <ul className="ml-10 flex flex-col gap-8">
                            <li><a className="font-bold" href="#">Collections</a></li>
                            <li><a className="font-bold" href="#">Men</a></li>
                            <li><a className="font-bold" href="#">Women</a></li>
                            <li><a className="font-bold" href="#">About</a></li>
                            <li><a className="font-bold" href="#">Contact</a></li>
                        </ul>
                    </div>
                </div>, document.getElementById("modal")
            )}
        </>
    )
}

//sidebar fixed h-screen w-full bg-black opacity-50 z-30 hidden