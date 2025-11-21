import {Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger} from "@/shared/shadcn/components/ui/sidebar.tsx";
import {usePanelStore} from "@/features/terrarium/model/usePanelStore.ts";

export function TerrariumSidebar() {

    const {setPanelType,setItems,open} =usePanelStore();

    const openMyDesigns = () => {
        setPanelType("myDesigns");

        setItems([
            { id: 1, url: "/assets/test/a.webp" },
            { id: 2, url: "/assets/test/j.jpeg" },
        ]);

        open();
    };

    const openIcons = () => {
        setPanelType("icons");

        setItems([
            { id: 1, url: "/assets/test/g.webp" },
            { id: 2, url: "/assets/test/a.webp" },
        ]);

        open();
    };

    const openImages = () => {
        setPanelType("images");

        setItems([
            { id: 1, url: "/assets/test/a.webp" },
            { id: 2, url: "/assets/test/j.jpeg" },
            { id: 3, url: "/assets/test/g.webp" },
            { id: 4, url: "/assets/test/h.jfif" },
            { id: 5, url: "/assets/test/d.webp" },
        ]);

        open();
    };

    return (

            <Sidebar className="border-r">
                <SidebarHeader>
                    <SidebarTrigger />
                    <div className="text-lg font-semibold">테라리움 꾸미기</div>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>메뉴</SidebarGroupLabel>

                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton onClick={openMyDesigns}>내 디자인</SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton onClick={openIcons}>아이콘</SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton onClick={openImages}>이미지</SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter>
                    <div className="text-sm text-muted-foreground">Terrarium</div>
                </SidebarFooter>
            </Sidebar>
    );
}