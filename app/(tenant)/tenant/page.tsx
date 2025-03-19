"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
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
          <Card className="shadow-none max-w-96 p-0">
            <CardHeader className="text-center px-4 pt-4">
              <Avatar className='size-16 mx-auto'>
                  <AvatarImage src={'/photo.png'} alt="Tenant" />
              </Avatar>
              <CardTitle className="text-lg">Complete Tenant Verification</CardTitle>
              <CardDescription>
                Enter verification code sent to your email address
              </CardDescription>
            </CardHeader>
            <form>
              <CardContent className="px-4 pb-4">
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
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 border-t">
                <Button type="submit" className="w-full"  onClick={handleSubmit}>
                  Begin Verification
                </Button>
              </CardFooter>
            </form>
            
          </Card>
      </div>
    </div>
  )
}

export default Page