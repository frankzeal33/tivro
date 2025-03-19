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
import { Label } from "@/components/ui/label"
import {
  Avatar,
  AvatarImage,
} from "@/components/ui/avatar"

const Page = () => {
  return (
    <div className="tenant-container">
        <div className={cn("grid md:grid-cols-2 gap-6 items-start justify-center")}>
          <Card className="shadow-none max-w-80 p-4">
            <div className="flex gap-2">
                <div className="flex flex-col items-center">
                    <div className="size-6 rounded-full border border-primary flex items-center justify-center bg-primary">
                        <div className="size-2 rounded-full bg-light"></div>
                    </div>
                    <div className="h-10 w-0.5 bg-muted-foreground"></div>
                </div>
                <div>
                    <h3 className="font-medium text-primary">Begin tenant verification</h3>
                    <p className="text-xs text-muted-foreground">Confirm request details</p>
                </div>
            </div>
          </Card>
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
                    
                    <Button type="submit" className="w-full">
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