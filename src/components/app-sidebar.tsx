import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  // Command,
  Frame,
  // GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
// import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
// import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  // SidebarRail,
  // SidebarTrigger
} from "@/components/ui/sidebar"
import h1 from '@/assets/h1.png';

// This is sample data.
const data = {
  user: {
    name: "Jon Doe",
    email: "johne@microsoft.com",
    avatar: h1,
  },
  teams: [
    {
      name: "MagenticOne",
      logo: AudioWaveform,
      plan: "General",
    },
    {
      name: "Predictive Maintenance",
      logo: AudioWaveform,
      plan: "General",
    },
    {
      name: "MagenticThree",
      logo: AudioWaveform,
      plan: "General",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "/", // updated to route to Playground
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Chat",
          url: "/", // primary playground page
        },
        {
          title: "History",
          url: "/playground-history", // updated route for Playground history
        },
        // Optionally remove or update additional sub-items if not used
      ],
    },
    {
      title: "Agent Teams",
      url: "/agents", // updated to route directly to Agents page
      icon: Bot,
      isActive: true,
      items: [
        {
          title: "Library",
          url: "/agents", // route to Agents page
        },
        // ...existing code if additional links are required...
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser user={data.user} />
        {/* <img src={banner} alt="AutoGen" style={{width: '100%'}} /> */}
        {/* <SidebarTrigger size="icon"  /> */}
        {/* <TeamSwitcher teams={data.teams} /> */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>

    </Sidebar>
  )
}
