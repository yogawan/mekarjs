import { Icon } from "@iconify/react";
import ProtectedImageAtom from "../atoms/ProtectedImageAtom";
import Link from "next/link";

const SidebarOrganism = () => {
    return (
        <nav className="fixed top-0 left-0">
            <ul className="flex flex-col items-start justify-between h-screen pl-3 w-[164px] bg-black/2">
                <li>
                    <ProtectedImageAtom
                        src="/company/MekarJS2.png"
                        alt="logo"
                        className="w-32"
                    />
                </li>

                <div className="flex flex-col">
                    <li>
                        <Link href="/dashboard" className="flex items-center p-5 m-1 text-white bg-black text-xs rounded-full">
                            <Icon icon="tabler:chart-line" width="16" height="16" className="mr-2" />
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link href="/income" className="flex items-center p-5 m-1 text-black hover:text-white hover:bg-black text-xs rounded-full">
                            <Icon icon="gridicons:arrow-down" width="16" height="16" className="mr-2" />
                            Pemasukan
                        </Link>
                    </li>
                    <li>
                        <Link href="/expense" className="flex items-center p-5 m-1 text-black hover:text-white hover:bg-black text-xs rounded-full">
                            <Icon icon="gridicons:arrow-up" width="16" height="16" className="mr-2" />
                            Pengeluaran
                        </Link>
                    </li>
                    {/* <li>
                        <Link href="/inventory" className="flex items-center p-5 m-1 text-black hover:text-white hover:bg-black text-xs rounded-full">
                            <Icon icon="material-symbols:inventory-sharp" width="16" height="16" className="mr-2" />
                            Inventory
                        </Link>
                    </li> */}
                    <li>
                        <Link href="/print" className="flex items-center p-5 m-1 text-black hover:text-white hover:bg-black text-xs rounded-full">
                            <Icon icon="material-symbols:print" width="16" height="16" className="mr-2" />
                            Cetak
                        </Link>
                    </li>
                    <li>
                        <Link href="/chat" className="flex items-center p-5 m-1 text-black hover:text-white hover:bg-black text-xs rounded-full">
                            <Icon icon="mingcute:ai-fill" width="16" height="16" className="mr-2" />
                            TanyaAI
                        </Link>
                    </li>
                </div>

                <li>
                    <ProtectedImageAtom
                        src="/favicon/F2.png"
                        alt="logo"
                        className="w-32"
                    />
                </li>
            </ul>
        </nav>
    );
};

export default SidebarOrganism;
