"use client"

import * as React from "react"
import {
  ChartNoAxesColumnIncreasing,
  BadgeCheck,
  Users,
  MessageCircleMore,
  CircleUserRound,
  CreditCard,
  CircleHelp,
  LogOut
} from "lucide-react"

import { NavBar } from "@/components/sidebar/nav-bar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"


const data = { 
  navHeader: [
    {
      title: "Overview",
      url: "/dashboard",
      icon: ChartNoAxesColumnIncreasing,
    },
    {
      title: "Certificates",
      url: "/dashboard/certificates",
      icon: BadgeCheck,
    },
    {
      title: "Tenant/Management",
      url: "/dashboard/tenant-management",
      icon: Users,
    },
    {
      title: "Messages",
      url: "/dashboard/messages",
      icon: MessageCircleMore,
    },
    {
      title: "Profile",
      url: "/dashboard/profile",
      icon: CircleUserRound,
    },
    {
      title: "Subscription Plans",
      url: "/dashboard/subscriptions",
      icon: CreditCard,
    },
  ],

  navFooter: [
    {
      title: "FAQs",
      url: "#",
      icon: CircleHelp,
    },
    {
      title: "Logout",
      url: "#",
      icon: LogOut,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-[4rem] h-[calc(100svh-4rem]"
      {...props}
    >
      <SidebarContent className="bg-light">
        <NavBar items={data.navHeader} />
        <NavBar items={data.navFooter} className="mt-auto" />
        <Card className="mx-3 bg-muted border-0">
          <CardHeader>
            <CardTitle className="text-sm">Create project</CardTitle>
            <CardDescription className="text-xs">Your team has used 80% of your available space. Need more?</CardDescription>
          </CardHeader>
          <CardContent>
          <Progress value={40} />
          <h2 className="text-primary mt-2">Upgrade Plan</h2>
          </CardContent>
        </Card>

        <Separator className="my-4 mx-3 max-w-[210px]" />

        <div className="mx-3 mb-4 text-xs space-y-2">
          <p>V. 1.0</p>
          <p>©2025 Product of Urello Technologies Limited - 1787613</p>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
