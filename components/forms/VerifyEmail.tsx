"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent } from "react"

export function VerifyEmail({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {

  const router = useRouter()
    
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    router.push('/dashboard')
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
      <Link href={'/register'} className="text-sm -mt-4 flex gap-1 items-center">
        <ArrowLeft size={16} className="text-normal"/>
        Back
      </Link>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Verify your email</h1>
        <p className="text-balance text-sm font-normal">
            We sent a mail to your email preferred address. Kindly enter the OTP to verify your account.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <InputOTP maxLength={6}>
                <InputOTPGroup className="w-full flex gap-3 justify-between">
                    <InputOTPSlot index={0} className="rounded-md border size-10 bg-light" />
                    <InputOTPSlot index={1} className="rounded-md border size-10 bg-light"/>
                    <InputOTPSlot index={2} className="rounded-md border size-10 bg-light"/>
                    <InputOTPSlot index={3} className="rounded-md border size-10 bg-light"/>
                    <InputOTPSlot index={4} className="rounded-md border size-10 bg-light"/>
                    <InputOTPSlot index={5} className="rounded-md border size-10 bg-light"/>
                </InputOTPGroup>
            </InputOTP>
        </div>
        <Button type="submit" className="w-full">
            Confirm
        </Button>
      </div>
      <div className="text-sm -mt-4">
        Resend{" "}
        <span className="text-primary font-medium">
          3s
        </span>
      </div>
    </form>
  )
}
