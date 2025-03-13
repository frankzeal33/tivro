"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "../ui/checkbox"
import { Eye } from "lucide-react"
import Link from "next/link"
import { FormEvent } from "react"
import { useRouter } from "next/navigation"

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {

  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    router.push('/register/verify-email')
  }

  return (
    <form className={cn("flex flex-col gap-6")} {...props} onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Get started with Tivro!</h1>
        <p className="text-balance text-sm font-normal">
        Kindly enter your details to get started
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="text" placeholder="Enter your name here" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter email address" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input id="password" type="password" placeholder="*********************" className="pr-12" required />
            <Eye className="text-ring absolute top-1.5 right-3 bg-light"/>
          </div>
        </div>
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </div>
      <div className="text-sm">
        Don&apos;t have an account?{" "}
        <Link href={"/login"} className="underline underline-offset-4 text-primary font-medium hover:no-underline">
          Login
        </Link>
      </div>
    </form>
  )
}
