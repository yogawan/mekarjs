import EmployeeList from "@/components/karyawan/EmployeeList";
import SidebarOrganism from "@/components/global/Sidebar"

const ChatAIPage = () => {
    return (
        <div>
            <SidebarOrganism />
            <div className="ml-[256px] pl-5 pt-5">
                <EmployeeList />
            </div>
        </div>
    )
}

export default ChatAIPage;