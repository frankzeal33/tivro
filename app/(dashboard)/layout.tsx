import { ThemeProvider } from "@/components/theme-provider"

import { AppSidebar } from "@/components/sidebar/app-side"
import { SiteHeader } from "@/components/sidebar/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function  RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="[--header-height:calc(theme(spacing.14))]">
          <SidebarProvider className="flex flex-col">
            <SiteHeader />
            <div className="flex flex-1">
              <AppSidebar />
              <SidebarInset>
                <main className="w-full p-6">
                  {children}
                </main>
              </SidebarInset>
            </div>
          </SidebarProvider>
        </div>
      </ThemeProvider>
    </>
  )
}
