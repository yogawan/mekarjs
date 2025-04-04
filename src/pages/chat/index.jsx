import AssistantAI from "@/components/chat/AssistantAI";
import SidebarOrganism from "@/components/global/Sidebar"

const ChatAIPage = () => {
    return (
        <div>
            <SidebarOrganism />
            <div className="ml-[256px] pl-5 pt-5 flex justify-center">
                <div className="w-[720px]">
                    <AssistantAI />
                </div>
            </div>
        </div>
    )
}

export default ChatAIPage;