import { ThemeProvider } from "@/components/theme-provider"

import { AppSidebar } from "@/components/sidebar/app-side"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/tenant-header/site-header";

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
              {/* <AppSidebar /> */}
              <SidebarInset>
                <main className="p-6">
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
