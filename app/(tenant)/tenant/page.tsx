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

const Page = () => {
  return (
    <div className="tenant-container">
        <div className={cn("flex flex-col gap-6 items-center justify-center")}>
          <Card className="shadow-none">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Complete Tenant Verification</CardTitle>
              <CardDescription>
                Enter verification code sent to your email address
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid gap-6">
                  
                
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="code" className="text-center">Email</Label>
                      <Input
                        id="code"
                        type="number"
                        placeholder="Enter code"
                        required
                        className="text-center"
                      />
                    </div>
                    <div className="grid gap-2">
                        <div className='w-full flex items-center bg-muted gap-1 border border-l-primary border-l-6 rounded-md p-2'>
                            <p className='text-muted-foreground text-xs md:text-sm'>Once you begin the verification process, ensure you complete it in one go, as all information is saved as you progress.</p>  
                        </div>
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Login
                    </Button>
                  </div>
                  <div className="text-center text-sm">
                    Didn’t receive a code? 
                    <Button className="p-0" variant={'link'}>
                      Resend
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