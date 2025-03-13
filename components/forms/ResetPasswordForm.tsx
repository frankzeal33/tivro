"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "../ui/checkbox"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent } from "react"

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {

  const router = useRouter()
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
    
    router.push('/reset-password/recovery-link')
    }

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
      <Link href={'/login'} className="text-sm -mt-4 flex gap-1 items-center">
        <ArrowLeft size={16} className="text-normal"/>
        Back
      </Link>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Reset password</h1>
        <p className="text-balance text-sm font-normal">
          Kindly enter your email to reset your password. Don’t worry, it happens to the best of us. 
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter email address" required />
        </div>
        <Button type="submit" className="w-full">
          Send recovery link
        </Button>
      </div>
    </form>
  )
}
