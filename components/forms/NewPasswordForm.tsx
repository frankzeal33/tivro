"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, Eye } from "lucide-react"
import Link from "next/link"
import { FormEvent } from "react"
import { useRouter } from "next/navigation"

export function NewPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {

  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    router.push('/reset-password/reset-successful')
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Create new password</h1>
        <p className="text-balance text-sm font-normal">
            One more step to go and you’re back into your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="newPassword">New Password</Label>
          <div className="relative">
            <Input id="newPassword" type="password" placeholder="*********************" className="pr-12" required />
            <Eye className="text-ring absolute top-1.5 right-3 bg-light"/>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <div className="relative">
            <Input id="confirmPassword" type="password" placeholder="*********************" className="pr-12" required />
            <Eye className="text-ring absolute top-1.5 right-3 bg-light"/>
          </div>
          <div className=" flex gap-x-4 gap-y-2 items-center flex-wrap">
            <div className="space-y-1">
                <div className="flex items-center space-x-1">
                    <CheckCircle size={13} className="text-primary"/>
                    <Label className="text-[10px]">Minimum of 8 characters long</Label>
                </div>
                <div className="flex items-center space-x-1">
                    <CheckCircle size={13} className="text-primary"/>
                    <Label className="text-[10px]">At least one capital letter</Label>
                </div>
            </div>
            <div className="space-y-1">
                <div className="flex items-center space-x-1">
                    <CheckCircle size={13} className="text-primary"/>
                    <Label className="text-[10px]">At least one number</Label>
                </div>
                <div className="flex items-center space-x-1">
                    <CheckCircle size={13} className="text-primary"/>
                    <Label className="text-[10px]">At least one symbol</Label>
                </div>
            </div>
          </div>
        </div>
        <Button type="submit" className="w-full">
            Reset password
        </Button>
      </div>
    </form>
  )
}
