import { Icon } from "@iconify/react";
import ProtectedImage from "../utilities/ProtectedImage";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
    const router = useRouter();

    const menuItems = [
        { href: "/", icon: "material-symbols:home", label: "Landing Page" },
        { href: "/overview", icon: "tabler:chart-line", label: "Dashboard Overview" },
        { href: "/cms", icon: "mdi:web", label: "Manajemen Website" },
        { href: "/finance", icon: "gridicons:arrow-down", label: "Keuangan" },
        { href: "/inventory", icon: "mdi:warehouse", label: "Inventaris" },
        { href: "/sales", icon: "mdi:cart-outline", label: "Penjualan & CRM" },
        { href: "/purchase", icon: "mdi:truck-fast", label: "Pembelian & Supplier" },
        { href: "/production", icon: "mdi:factory", label: "Produksi" },
        { href: "/hr", icon: "mdi:account-group-outline", label: "SDM & Penggajian" },
        { href: "/chat", icon: "mingcute:ai-fill", label: "TanyaAI" },
    ];

    return (
        <nav className="fixed top-0 left-0">
            <ul className="flex flex-col items-start h-screen pl-3 pr-3 w-[256px] bg-background overflow-scroll">

                {/* Logo Perusahaan */}
                <li>
                    <ProtectedImage
                        src="/favicon/F2.png"
                        alt="logo"
                        className="w-32 mt-5 mb-5 animate-spin360"
                    />
                </li>

                {/* Rendering List Menu */}
                <div className="flex flex-col w-full">
                    {menuItems.map((item, index) => {
                        const isActive = router.pathname === item.href;

                        return (
                            <li key={index}>
                                <Link 
                                    href={item.href} 
                                    className={`flex items-center p-5 m-1 text-xs rounded-full transition-all duration-300
                                        ${isActive ? "bg-black text-white font-bold" : "text-black hover:text-white hover:bg-black"}`}
                                >
                                    <Icon icon={item.icon} width="16" height="16" className="mr-2" />
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </div>

                {/* Logo Footer */}
                <li>
                    <ProtectedImage
                        src="/favicon/F2.png"
                        alt="logo"
                        className="w-32 mt-5 mb-5"
                    />
                </li>

            </ul>
        </nav>
    );
};

export default Sidebar;
