"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Avatar,
  AvatarImage,
} from "@/components/ui/avatar"
import { useRouter } from "next/navigation"

const Page = () => {

  const router = useRouter()
  const handleSubmit = () => {
    router.push('/tenant/start-verification')
  }

  return (
    <div className="tenant-container">
        <div className={cn("flex flex-col gap-6 items-center justify-center")}>
          <Card className="shadow-none max-w-96">
            <CardHeader className="text-center">
              <Avatar className='size-16 mx-auto'>
                  <AvatarImage src={'/photo.png'} alt="Tenant" />
              </Avatar>
              <CardTitle className="text-lg">Complete Tenant Verification</CardTitle>
              <CardDescription>
                Enter verification code sent to your email address
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div>
                  <div className="grid gap-3">
                    <div>
                      <Input
                        type="number"
                        placeholder="Enter code"
                        required
                        className="text-center"
                      />
                    </div>
                    <div className="text-center text-sm">
                      Didn’t receive a code?{" "}
                      <Button className="p-0 text-primary" variant={'link'}>
                        Resend
                      </Button>
                    </div>
                    <div>
                      <div className='w-full flex bg-muted gap-1 border border-l-primary border-l-6 rounded-md p-2'>
                        <p className='text-muted-foreground text-xs md:text-sm'>Once you begin the verification process, ensure you complete it in one go, as all information is saved as you progress.</p>  
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full" onClick={handleSubmit}>
                      Begin Verification
                    </Button>
                  </div>
                  
                </div>
              </form>
            </CardContent>
          </Card>
      </div>
    </div>
  )
}

export default Page