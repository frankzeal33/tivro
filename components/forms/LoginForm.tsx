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

export function LoginForm({
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
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Welcome Back!<span className="text-lg ml-1">👋</span></h1>
        <p className="text-balance text-sm font-normal">
          Kindly enter your details to log back in
        </p>
      </div>
      <div className="grid gap-6">
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
        <div className="flex items-center -mt-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>
          <Link
            href="/reset-password"
            className="ml-auto text-sm underline-offset-4 text-primary font-medium underline hover:no-underline"
          >
            Forgot your password?
          </Link>
        </div>
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </div>
      <div className="text-sm">
        Don&apos;t have an account?{" "}
        <Link href={"/register"} className="underline underline-offset-4 text-primary font-medium hover:no-underline">
          Sign up
        </Link>
      </div>
    </form>
  )
}
