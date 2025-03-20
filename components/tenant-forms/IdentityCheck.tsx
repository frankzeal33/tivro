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
import { useGlobalContext } from "@/context/GlobalContext"
import { FormEvent } from "react"

const  IdentityCheck = () => {

  const {
      setCurrentSection,
      otp,
      identityCheck,
      setIdentityCheck,
      formProgress,
      setFormProgress,
      setOtp
  } = useGlobalContext();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCurrentSection("credit-check")
    setFormProgress(51)
    setFormProgress({...formProgress, fraction: "3/6",  percent: 51})
    setIdentityCheck({...identityCheck, completed: true,  iscurrentForm: false})
    setOtp({...otp,  iscurrentForm: true})
  }
  
return (
  <div className="shadow-none max-w-96">
          <FormCardHeader title="Identity check" desc="We request a user’s Bank Verification Number (BVN) for verification, credit check and security purposes."/>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <CardContent className="px-4 py-2">
                  <div className="grid gap-6">
                      <div className='grid gap-6'>
                          <div className="grid gap-2">
                              <Label htmlFor="email">Select ID method*</Label>
                              <Select required>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="---Select---" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value="Bank verification number (BVN)">Bank verification number (BVN)</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                          </div>
                          <div className="grid gap-2">
                              <Label htmlFor="id">Enter identification number*</Label>
                              <Input id="id" type="number" placeholder="e.g 1234567890" required />
                              <p className="text-xs text-negative">Incorrect BVN. Try again!</p>
                          </div>
                      </div>
                      
                  </div>
              </CardContent>
              <FormCardFooter text="Proceed"/>
          </form>
        </div>
)
}

export default IdentityCheck