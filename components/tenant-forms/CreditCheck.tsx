import {
  CardContent,
 
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import FormCardHeader from "./FormCardHeader"
import { Label } from "../ui/label"
import FormCardFooter from "./FormCardFooter"

const  CreditCheck = () => {
return (
  <div className="shadow-none max-w-96">
          <FormCardHeader title="OTP verification" desc="An OTP has been sent to your BVN linked phone number. Kindly enter it below to proceed."/>
          <form className="flex flex-col gap-6">
              <CardContent className="px-4 py-2">
                  <div className="grid gap-1">
                    <div className='grid gap-3'>
                        <div className="grid gap-2">
                            <Label htmlFor="otp">Enter OTP*</Label>
                            <Input id="otp" type="number" placeholder="123456" required />
                            <p className="text-xs text-negative">Invalid code. Try again!</p>
                        </div>
                    </div>
                    <div className="text-sm">
                      Didn’t receive a code?{" "}
                      <Button className="p-0 text-primary" variant={'link'}>
                        Resend
                      </Button>
                    </div>    
                  </div>
              </CardContent>
              <FormCardFooter text="Proceed"/>
          </form>
        </div>
)
}

export default CreditCheck