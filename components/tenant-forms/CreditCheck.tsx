import {
  CardContent,
 
} from "@/components/ui/card"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import FormCardHeader from "./FormCardHeader"
import { Label } from "../ui/label"
import FormCardFooter from "./FormCardFooter"
import { useGlobalContext } from "@/context/GlobalContext"
import { FormEvent } from "react"

const  CreditCheck = () => {

    const {
        setCurrentSection,
        otp,
        employmentInfo,
        formProgress,
        setFormProgress,
        setEmploymentInfo,
        setOtp
    } = useGlobalContext();
  
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setCurrentSection("employment-check")
      setFormProgress({...formProgress, fraction: "4/6",  percent: 68})
      setOtp({...otp, completed: true,  iscurrentForm: false})
      setEmploymentInfo({...employmentInfo,  iscurrentForm: true})
    }

return (
  <div className="shadow-none max-w-96">
          <FormCardHeader title="OTP verification" desc="An OTP has been sent to your BVN linked phone number. Kindly enter it below to proceed."/>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
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