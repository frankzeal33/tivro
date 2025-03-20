import {
  CardContent,
  CardFooter,
 
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
import FormCardHeader from "./FormCardHeader"
import { Label } from "../ui/label"
import FormCardFooter from "./FormCardFooter"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useState } from "react"
import { Button } from "../ui/button"
import { useGlobalContext } from "@/context/GlobalContext"

const  EmploymentCheck = () => {

   const {
      setCurrentSection,
      apartmentInspection,
      setApartmentInspection,
      formProgress,
      setFormProgress,
      employmentInfo,
      setEmploymentInfo,
  } = useGlobalContext();

  const [activeTab, setActiveTab] = useState("Employment status");

  const handletoggle = (value: string) => {
    if(value === 'next'){
      if(activeTab === 'Company details'){
        setActiveTab("Uploads")
      }else if(activeTab === 'Uploads'){

        setCurrentSection("verify-apartment")
        setFormProgress({...formProgress, fraction: "5/6",  percent: 90})
        setEmploymentInfo({...employmentInfo, completed: true,  iscurrentForm: false})
        setApartmentInspection({...apartmentInspection,  iscurrentForm: true})

      }else{
        setActiveTab("Employment status")
      }
        
    }else if(value === 'prev'){
      if(activeTab === 'Company details'){
        setActiveTab("Employment status")
      }else if(activeTab === 'Uploads'){
        setActiveTab("Company details")
      }else{
        setActiveTab("Employment status")
      }
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setActiveTab("Company details")
  }

return (
  <div className="shadow-none max-w-96">
          <FormCardHeader title="Employment information" desc="Kindly provide your verification details below"/>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <CardContent className="px-4 py-2">
                  <div className="grid gap-6">
                    <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="grid grid-cols-3 bg-light border p-0 shadow-none mb-5">
                          <TabsTrigger value="Employment status" className='rounded-r-none bg-background text-xs p-2'>Employment</TabsTrigger>
                          <TabsTrigger value="Company details" className='rounded-none bg-background text-xs p-2'>Company details</TabsTrigger>
                          <TabsTrigger value="Uploads" className='rounded-l-none bg-background text-xs p-2'>Uploads</TabsTrigger>
                      </TabsList>
                      <TabsContent value="Employment status">
                        <div className="grid gap-6">
                          <div className='grid gap-6'>
                              <div className="grid gap-2">
                                  <Label htmlFor="email">Select employment status*</Label>
                                  <Select required>
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="---Select---" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectItem value="employed">Employed</SelectItem>
                                        <SelectItem value="self-employed">Self-employed</SelectItem>
                                        <SelectItem value="unemployed">Unemployed</SelectItem>
                                        <SelectItem value="student">Student</SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                              </div>
                              <div className="grid gap-2">
                                  <Label htmlFor="id">Select employment type*</Label>
                                  <Select required>
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="---Select---" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectItem value="full-time">Full-time</SelectItem>
                                        <SelectItem value="self-employed">freelance</SelectItem>
                                        <SelectItem value="contract">Contract</SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                              </div>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="Company details">
                        <div className="grid gap-6">
                          <div className='grid gap-6'>
                              <div className="grid gap-2">
                                  <Label htmlFor="cname">Company name</Label>
                                  <Input id="cname" type="text" placeholder="e.g. Tivro Logistics" required />
                              </div>
                              <div className="grid gap-2">
                                  <Label htmlFor="address">Company address</Label>
                                  <Input id="address" type="text" placeholder="e.g. Lagos, Nigeria" required />
                              </div>
                              <div className="grid gap-2">
                                  <Label htmlFor="email">Line manager email*</Label>
                                  <Input id="email" type="email" placeholder="e.g. example@gmail.com" required />
                                  <p className="text-xs text-negative">Employer’s email isn’t valid. Try again!</p>
                              </div>
                          </div>
                          
                        </div>
                      </TabsContent>
                      <TabsContent value="Uploads">
                        <div className='grid gap-6'>
                          <div className='grid gap-2'>
                            <Label htmlFor="card">Company ID card*</Label>
                            <Input id="cardId" className="hidden" type="file" />
                            <Label htmlFor="cardId" className="text-sm font-medium border cursor-pointer flex items-center justify-between w-full rounded-md hover:bg-muted">
                                <div className="text-ring p-2">---Choose file---</div>
                                <div className="bg-muted px-4 py-2 rounded-r-md">Choose file</div>
                            </Label>
                            <p className="text-xs text-negative">Upload document or an image format!</p>
                          </div>
                          <div className='grid gap-2'>
                            <Label htmlFor="card">Employment letter (optional)</Label>
                            <Input id="eletter" className="hidden" type="file" />
                            <Label htmlFor="eletter" className="text-sm font-medium border cursor-pointer flex items-center justify-between w-full rounded-md hover:bg-muted">
                                <div className="text-ring p-2">---Choose file---</div>
                                <div className="bg-muted px-4 py-2 rounded-r-md">Choose file</div>
                            </Label>
                          </div>
                        </div>                        
                      </TabsContent>
                  </Tabs>
                  </div>
              </CardContent>
              {activeTab === 'Employment status' ? (
                <FormCardFooter text="Next"/>
              ) : (
                <CardFooter  className="flex gap-2 items-center p-4 justify-between w-full border-t">
                  <Button variant={'outline'} type="button" className="w-[48%]" onClick={() => handletoggle('prev')}>Previous</Button>
                  <Button className="w-[48%]" type="button" onClick={() => handletoggle('next')}>Next</Button>
                </CardFooter >
              )}
              
          </form>
        </div>
)
}

export default EmploymentCheck