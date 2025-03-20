import {
    CardContent
  } from "@/components/ui/card"
import { Input } from "../ui/input"
import FormCardHeader from "./FormCardHeader"
import { Label } from "../ui/label"
import FormCardFooter from "./FormCardFooter"
import { FormEvent, FormEventHandler } from "react"
import { useGlobalContext } from "@/context/GlobalContext"

const RequestDetails = () => {

    const {
        requestDetails,
        setCurrentSection,
        identityCheck,
        setIdentityCheck,
        setRequestDetails,
        formProgress,
        setFormProgress,
        handleRequestDetailsChange
    } = useGlobalContext();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setCurrentSection("Identity check")
        setFormProgress({...formProgress, fraction: "2/6",  percent: 34})
        setRequestDetails({...requestDetails, completed: true,  iscurrentForm: false})
        setIdentityCheck({...identityCheck,  iscurrentForm: true})

    }

  return (
    <div className="shadow-none max-w-96">
            <FormCardHeader title="Confirm request details" desc="Please verify that these details match your information to proceed with the verification."/>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <CardContent className="px-4 py-2">
                    <div className="grid gap-6">
                        <div className='grid gap-2 md:grid-cols-2'>
                            <div className="grid gap-2">
                                <Label htmlFor="firstname">First name</Label>
                                <Input id="firstname" type="text" placeholder="Enter first name here" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="lastname">Last name</Label>
                                <Input id="lastname" type="text" placeholder="Enter last name here" required />
                            </div>
                        </div>
                        
                        <div className='grid gap-6'>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input id="email" type="email" placeholder="Enter email address" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone">Phone number</Label>
                                <Input id="phone" type="tel" placeholder="+234 9011222122" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="address">Apartment address</Label>
                                <Input id="address" type="text" placeholder="Enter apartment address" required />
                            </div>
                        </div>
                        
                    </div>
                </CardContent>
                <FormCardFooter text="Proceed"/>
            </form>
          </div>
  )
}

export default RequestDetails