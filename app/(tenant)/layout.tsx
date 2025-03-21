import { ThemeProvider } from "@/components/theme-provider"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/tenant-header/site-header";
import { AppSidebar } from "@/components/tenant-header/app-side";

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
            <div className="flex flex-col flex-1">
              <AppSidebar />
              <SidebarInset>
                <main className="px-4 md:px-6 p-6 pt-[6rem] lg:pt-6">
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
