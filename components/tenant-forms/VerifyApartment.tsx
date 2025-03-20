import {
  Card,
  CardContent,
 
} from "@/components/ui/card"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import FormCardHeader from "./FormCardHeader"
import { Label } from "../ui/label"
import FormCardFooter from "./FormCardFooter"
import Image from "next/image"
import { useGlobalContext } from "@/context/GlobalContext"
import { FormEvent } from "react"

const  VerifyApartment = () => {

  const {
    setCurrentSection,
    apartmentInspection,
    setApartmentInspection,
    setFormProgress,
    formProgress,
    certificate,
    setCertificate,
  } = useGlobalContext();
    
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCurrentSection("certificates")
    setFormProgress({...formProgress, fraction: "6/6",  percent: 100})
    setApartmentInspection({...apartmentInspection, completed: true,  iscurrentForm: false})
    setCertificate({...certificate,  completed: true, iscurrentForm: true})
  }

return (
  <div className="shadow-none max-w-96">
          <FormCardHeader title="Apartment inspection" desc="Confirm apartment information provided before"/>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <CardContent className="px-4 py-2">
                  <div className="grid gap-6">
                      <div className='grid gap-6'>
                          <div className="grid gap-2">
                              <Label htmlFor="id">Apartment address</Label>
                              <Input id="id" type="number" placeholder="Wilbros pipeline, Lagos island" className="bg-background" disabled/>
                          </div>
                      </div>
                      <Card className="p-4 shadow-none grid lg:grid-cols-2 gap-2">
                        <div className="space-y-3">
                          <h4>Inspection service</h4>
                          <p className="text-xs text-muted-foreground">Are you too busy to inspect the apartment? Let us handle it for you! We'll provide a detailed report within 48 hours.</p>
                          <p className="text-xs text-muted-foreground">Inspection fee: <span className="text-primary font-bold">₦10,000</span></p>
                          <Button variant={'outline'} className="bg-light">Yes, proceed</Button>
                        </div>
                        <div className="hidden lg:flex">
                          <Image src={'/inspect.png'} width={100} height={100} alt="" className="w-full h-full rounded-2xl"/>
                        </div>
                      </Card>

                      <div>
                        <div className='w-full flex flex-col bg-muted gap-1 border border-l-primary border-l-6 rounded-md p-2'>
                          <h4 className="text-sm font-semibold">Property inspection request</h4>
                          <p className='text-muted-foreground text-xs md:text-sm'>Thank you for choosing Tivro. You’d be notified via mail with a detailed property inspection report within 48 hours.</p>  
                        </div>
                      </div>
                      
                  </div>
              </CardContent>
              <FormCardFooter text="Finish"/>
          </form>
        </div>
)
}

export default VerifyApartment