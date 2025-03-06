import ChatAIOrganism from "@/components/organisms/ChatAIOrganism"
import SidebarOrganism from "@/components/organisms/SidebarOrganism"

const ChatAIPage = () => {
    return (
        <div className="">
            <SidebarOrganism />
            <div className="flex justify-center mt-5">
                <div className="w-[720px]">
                    <ChatAIOrganism />
                </div>
            </div>
        </div>
    )
}

export default ChatAIPage;