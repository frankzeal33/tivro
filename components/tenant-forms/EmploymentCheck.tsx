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
import { ChangeEvent, useState } from "react"
import { Button } from "../ui/button"
import { useGlobalContext } from "@/context/GlobalContext"
import { toast } from "react-toastify"
import { axiosClient } from "@/GlobalApi"
import { z } from "zod"
import { tenantValidationForm } from "@/utils/tenantValidationForm"
import ReduceTextLength from "@/utils/ReduceTextLength"
import { useTenantStore } from "@/store/TenantStore"

const generalSchema = z.object({
  employment_status: z.string().min(1, "Select Employment Status"),
  employment_type: z.string().min(1, "Select Employment Type")
})

const employedCDetailsSchema = z.object({
  company_name: z.string().min(1, "Company name is required"),
  company_address: z.string().min(1, "Company address is required"),
  line_manager_email: z.string().email("Invalid email address"),
})

type GeneralFormValues = z.infer<typeof generalSchema>
type employedCDetailsFormValues = z.infer<typeof employedCDetailsSchema>

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

  const tenantInfo = useTenantStore((state) => state.tenantInfo)
  const [activeTab, setActiveTab] = useState("Employment status");
  const [loading, setLoading] = useState(false);

  const [generalForm, setGeneralForm] = useState({
    employment_status: "employed",
    employment_type: "",
  })
  const [employedFormCompanydetails, setEmployedFormCompanydetails] = useState({
    company_name: "",
    company_address: "",
    line_manager_email: "",
  })
  const [employedCIDCard, setEmployedCIDCard] = useState<File | null>(null)
  const [employedLetter, setEmployedLetter] = useState<File | null>(null)

  const handleEmployedCIDCardChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const allowedTypes = ["image/jpg", "image/jpeg", "image/png", "application/pdf"];

      if (file) {
        const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

        if (file.size > maxSizeInBytes) {
          toast.error("File size must be less than 5MB");
          return;
        }

        if (!allowedTypes.includes(file.type)) {
          toast.error("Only JPG, JPEG, PNG, or PDF files are allowed");
          return;
        }

        setEmployedCIDCard(file);

      }
  };

  const handleEmployedLetter = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const allowedTypes = ["image/jpg", "image/jpeg", "image/png", "application/pdf"];

      if (file) {
        const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

        if (file.size > maxSizeInBytes) {
          toast.error("File size must be less than 5MB");
          return;
        }

        if (!allowedTypes.includes(file.type)) {
          toast.error("Only JPG, JPEG, PNG, or PDF files are allowed");
          return;
        }

        setEmployedLetter(file);

      }
  };

  const handleTabChange = (tab: string) => {

    if(tab === "Employment status"){

      setActiveTab(tab)
    }else if(tab === "Company details"){

      const result = tenantValidationForm(generalSchema, generalForm, "employment-form-error");
      if (!result.success) return;

      setActiveTab(tab)
    }else if(tab === "Uploads"){

      if(generalForm.employment_status === "employed"){
        const result = tenantValidationForm(generalSchema, generalForm, "employment-form-error");
        if (!result.success) return;

        const details = tenantValidationForm(employedCDetailsSchema, employedFormCompanydetails, "employment-form-error");
        if (!details.success) return;

      }else if(generalForm.employment_status === "self-employed"){

      }else if(generalForm.employment_status === "unemployed"){

      }else if(generalForm.employment_status === "freelance"){

      }else{

      }
     

      setActiveTab(tab)
    }
    
  };

  const handletoggle = (value: string) => {
    if(value === 'next'){
      if(activeTab === 'Company details'){

        if(generalForm.employment_status === "employed"){

          const details = tenantValidationForm(employedCDetailsSchema, employedFormCompanydetails);
          if (!details.success) return;

        }else if(generalForm.employment_status === "self-employed"){

        }else if(generalForm.employment_status === "unemployed"){

        }else if(generalForm.employment_status === "freelance"){

        }else{

        }

        setActiveTab("Uploads")
      }else if(activeTab === 'Uploads'){
        if(generalForm.employment_status === "employed"){

          if(!employedCIDCard){
            return toast.error("Upload your company ID Card");
          }

        }else if(generalForm.employment_status === "self-employed"){

        }else if(generalForm.employment_status === "unemployed"){

        }else if(generalForm.employment_status === "freelance"){

        }else{

        }
        submitData()

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

    const result = tenantValidationForm(generalSchema, generalForm);
    if (!result.success) return;

    setActiveTab("Company details")
  }

  const submitData = () => {

    if(generalForm.employment_status === "employed"){
      submitEmployed()
    }else if(generalForm.employment_status === "self-employed"){

    }else if(generalForm.employment_status === "unemployed"){

    }else if(generalForm.employment_status === "freelance"){

    }else{

    }
    
   
  }

  const submitEmployed = async () => {

    try {
    
      setLoading(true)

      const employedData = new FormData();
      employedData.set('token', tenantInfo?.user_token)
      employedData.set('employment_status', generalForm.employment_status)
      employedData.set('employment_type', generalForm.employment_type)
      employedData.set('company_name', employedFormCompanydetails.company_name)
      employedData.set('company_address', employedFormCompanydetails.company_address)
      employedData.set('line_manager_email', employedFormCompanydetails.line_manager_email)
      
      if (employedCIDCard) {
        employedData.set('id_card', employedCIDCard);
      }

      if (employedLetter) {
        employedData.set('employment_letter', employedLetter);
      }

      const response = await axiosClient.post(`/employed/status/`, employedData)

      toast.success(response.data?.message)
      gotoNext()
      
    } catch (error: any) {
      toast.error(error.response?.data?.detail);
    } finally {
      setLoading(false)
    } 
  }

  const gotoNext = () => {
    setCurrentSection("verify-apartment")
    setFormProgress({...formProgress, fraction: "5/6",  percent: 90})
    setEmploymentInfo({...employmentInfo, completed: true,  iscurrentForm: false})
    setApartmentInspection({...apartmentInspection, iscurrentForm: true})
  }

return (
  <div className="shadow-none max-w-96">
          <FormCardHeader title="Employment information" desc="Kindly provide your verification details below"/>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <CardContent className="px-4 py-2">
                  <div className="grid gap-6">
                    <Tabs defaultValue={activeTab} value={activeTab} onValueChange={handleTabChange}>
                      <TabsList className="grid grid-cols-3 bg-light border p-0 shadow-none mb-5">
                        <TabsTrigger value="Employment status" className='rounded-r-none bg-background text-xs p-2'>Employment</TabsTrigger>
                        <TabsTrigger value="Company details" className='rounded-none bg-background text-xs p-2'>Company details</TabsTrigger>
                        <TabsTrigger value="Uploads" className='rounded-l-none bg-background text-xs p-2'>Uploads</TabsTrigger>
                      </TabsList>
                      <TabsContent value="Employment status">
                        <div className="grid gap-6">
                          <div className='grid gap-6'>
                              <div className="grid gap-2">
                                  <Label>Select employment status*</Label>
                                  <Select value={generalForm.employment_status} onValueChange={(value) => setGeneralForm({...generalForm, employment_status: value})}>
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="---Select---" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectItem value="employed">Employed</SelectItem>
                                        <SelectItem value="self-employed">Self-employed</SelectItem>
                                        <SelectItem value="unemployed">Unemployed</SelectItem>
                                        <SelectItem value="freelance">Freelance</SelectItem>
                                        <SelectItem value="student">Student</SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                              </div>
                              <div className="grid gap-2">
                                  <Label htmlFor="id">Select employment type*</Label>
                                  <Select value={generalForm.employment_type} onValueChange={(value) => setGeneralForm({...generalForm, employment_type: value})}>
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="---Select---" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {generalForm.employment_status === "employed" ? (
                                        <SelectGroup>
                                          <SelectItem value="Full-time">Full-time</SelectItem>
                                          <SelectItem value="Part-time">Part-time</SelectItem>
                                          <SelectItem value="Contract">Contract</SelectItem>
                                          <SelectItem value="Freelance">Freelance</SelectItem>
                                        </SelectGroup>
                                      ) : generalForm.employment_status === "self-employed" ? (
                                        <SelectGroup>
                                          <SelectItem value="CEO">CEO</SelectItem>
                                          <SelectItem value="Partner">Partner</SelectItem>
                                        </SelectGroup>
                                      ) : generalForm.employment_status === "unemployed" ? (
                                        <SelectGroup>
                                          <SelectItem value="freelance">freelance</SelectItem>
                                        </SelectGroup>
                                      ) : generalForm.employment_status === "freelance" ? (
                                        <SelectGroup>
                                          <SelectItem value="freelancer">freelancer</SelectItem>
                                        </SelectGroup>
                                      ) : (
                                        <SelectGroup>
                                          <SelectItem value="student">student</SelectItem>
                                          <SelectItem value="freelancer">freelancer</SelectItem>
                                        </SelectGroup>
                                      )}
                                      
                                    </SelectContent>
                                  </Select>
                              </div>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="Company details">
                        <div className="grid gap-6">
                          {generalForm.employment_status === "employed" ? (
                            <div className='grid gap-6'>
                              <div className="grid gap-2">
                                  <Label htmlFor="cname">Company name</Label>
                                  <Input id="cname" type="text" placeholder="e.g. Tivro Logistics"  value={employedFormCompanydetails.company_name} onChange={(e: any) => setEmployedFormCompanydetails({ ...employedFormCompanydetails, company_name: e.target.value})} />
                              </div>
                              <div className="grid gap-2">
                                  <Label htmlFor="address">Company address</Label>
                                  <Input id="address" type="text" placeholder="e.g. Lagos, Nigeria" value={employedFormCompanydetails.company_address} onChange={(e: any) => setEmployedFormCompanydetails({ ...employedFormCompanydetails, company_address: e.target.value})} />
                              </div>
                              <div className="grid gap-2">
                                  <Label htmlFor="email">Line manager email</Label>
                                  <Input id="email" type="email" placeholder="e.g. example@gmail.com" value={employedFormCompanydetails.line_manager_email} onChange={(e: any) => setEmployedFormCompanydetails({ ...employedFormCompanydetails, line_manager_email: e.target.value})} />
                                  {/* <p className="text-xs text-negative">Employer’s email isn’t valid. Try again!</p> */}
                              </div>
                            </div>
                          ) : generalForm.employment_status === "self-employed" ? (
                            <div className='grid gap-6'>
                              <div className="grid gap-2">
                                  <Label htmlFor="cname">Business name</Label>
                                  <Input id="cname" type="text" placeholder="e.g. Tivro Logistics" required />
                              </div>
                              <div className="grid gap-2">
                                  <Label htmlFor="address">Business address</Label>
                                  <Input id="address" type="text" placeholder="e.g. Lagos, Nigeria" required />
                              </div>
                              <div className="grid gap-2">
                                  <Label htmlFor="email">CAC No</Label>
                                  <Input id="email" type="email" placeholder="e.g. example@gmail.com" required />
                                  <p className="text-xs text-negative">Employer’s email isn’t valid. Try again!</p>
                              </div>
                            </div>
                          ) : generalForm.employment_status === "unemployed" ? (
                            <div className='grid gap-6'>
                              <div className="grid gap-2">
                                  <Label htmlFor="cname">Guarantor Name</Label>
                                  <Input id="cname" type="text" placeholder="e.g. Tivro Logistics" required />
                              </div>
                              <div className="grid gap-2">
                                  <Label htmlFor="address">Guarantor Address</Label>
                                  <Input id="address" type="text" placeholder="e.g. Lagos, Nigeria" required />
                              </div>
                              <div className="grid gap-2">
                                  <Label htmlFor="email">Guarantor Phone No.</Label>
                                  <Input id="email" type="email" placeholder="e.g. example@gmail.com" required />
                                  <p className="text-xs text-negative">Employer’s email isn’t valid. Try again!</p>
                              </div>
                            </div>
                          ) : generalForm.employment_status === "freelance" ? (
                            <div className='grid gap-6'>
                              <div className="grid gap-2">
                                  <Label htmlFor="cname">Working Site/Company Name</Label>
                                  <Input id="cname" type="text" placeholder="e.g. Tivro Logistics" required />
                              </div>
                              <div className="grid gap-2">
                                  <Label htmlFor="address">Letter of engagement</Label>
                                  <Input id="address" type="text" placeholder="e.g. Lagos, Nigeria" required />
                              </div>
                            </div>
                          ) : (
                            <div className='grid gap-6'>
                              <div className="grid gap-2">
                                  <Label htmlFor="cname">Guarantor Name</Label>
                                  <Input id="cname" type="text" placeholder="e.g. Tivro Logistics" required />
                              </div>
                              <div className="grid gap-2">
                                  <Label htmlFor="address">Guarantor Address</Label>
                                  <Input id="address" type="text" placeholder="e.g. Lagos, Nigeria" required />
                              </div>
                              <div className="grid gap-2">
                                  <Label htmlFor="email">Guarantor Phone No.</Label>
                                  <Input id="email" type="email" placeholder="e.g. example@gmail.com" required />
                                  <p className="text-xs text-negative">Employer’s email isn’t valid. Try again!</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </TabsContent>
                      <TabsContent value="Uploads">
                        {generalForm.employment_status === "employed" ? (
                          <div className='grid gap-6'>
                            <div className='grid gap-2'>
                              <Label htmlFor="card">Company ID card*</Label>
                              <Input id="cardId" className="hidden" type="file" onChange={handleEmployedCIDCardChange}/>
                              <Label htmlFor="cardId" className="text-sm font-medium border cursor-pointer flex items-center justify-between w-full rounded-md hover:bg-muted">
                                  <div className="text-ring text-xs p-2">{employedCIDCard ? ReduceTextLength(employedCIDCard.name, 15) : "---Choose file---"}</div>
                                  <div className="bg-muted px-4 py-2 rounded-r-md">Choose file</div>
                              </Label>
                              <p className="text-xs text-negative">{!employedCIDCard && "Upload document or an image format!"}</p>
                            </div>
                            <div className='grid gap-2'>
                              <Label htmlFor="card">Employment letter (optional)</Label>
                              <Input id="eletter" className="hidden" type="file" onChange={handleEmployedLetter}/>
                              <Label htmlFor="eletter" className="text-sm font-medium border cursor-pointer flex items-center justify-between w-full rounded-md hover:bg-muted">
                                  <div className="text-ring text-xs p-2">{employedLetter ? ReduceTextLength(employedLetter.name, 15) : "---Choose file---"}</div>
                                  <div className="bg-muted px-4 py-2 rounded-r-md">Choose file</div>
                              </Label>
                              <p className="text-xs text-negative">{!employedLetter && "Upload document or an image format!"}</p>
                            </div>
                          </div>   
                          ) : generalForm.employment_status === "self-employed" ? (
                            <div className='grid gap-6'>
                              <div className='grid gap-2'>
                                <Label htmlFor="card">Proof of business (Business location)</Label>
                                <Input id="cardId" className="hidden" type="file" />
                                <Label htmlFor="cardId" className="text-sm font-medium border cursor-pointer flex items-center justify-between w-full rounded-md hover:bg-muted">
                                    <div className="text-ring p-2">---Choose file---</div>
                                    <div className="bg-muted px-4 py-2 rounded-r-md">Choose file</div>
                                </Label>
                                <p className="text-xs text-negative">Upload document or an image format!</p>
                              </div>
                              <div className='grid gap-2'>
                                <Label htmlFor="card">Proof of business (Business card/Signpost - optional)</Label>
                                <Input id="eletter" className="hidden" type="file" />
                                <Label htmlFor="eletter" className="text-sm font-medium border cursor-pointer flex items-center justify-between w-full rounded-md hover:bg-muted">
                                    <div className="text-ring p-2">---Choose file---</div>
                                    <div className="bg-muted px-4 py-2 rounded-r-md">Choose file</div>
                                </Label>
                              </div>
                            </div>   
                          ) : generalForm.employment_status === "unemployed" ? (
                            <div className='grid gap-6'>
                              <div className='grid gap-2'>
                                <Label htmlFor="card">proof of identity(Driving Licenses, passport - optional)</Label>
                                <Input id="cardId" className="hidden" type="file" />
                                <Label htmlFor="cardId" className="text-sm font-medium border cursor-pointer flex items-center justify-between w-full rounded-md hover:bg-muted">
                                    <div className="text-ring p-2">---Choose file---</div>
                                    <div className="bg-muted px-4 py-2 rounded-r-md">Choose file</div>
                                </Label>
                                <p className="text-xs text-negative">Upload document or an image format!</p>
                              </div>
                            </div>   
                          ) : generalForm.employment_status === "freelance" ? (
                           <div className='grid gap-6'>
                              <div className='grid gap-2'>
                                <Label htmlFor="card">Letter of engagement</Label>
                                <Input id="cardId" className="hidden" type="file" />
                                <Label htmlFor="cardId" className="text-sm font-medium border cursor-pointer flex items-center justify-between w-full rounded-md hover:bg-muted">
                                    <div className="text-ring p-2">---Choose file---</div>
                                    <div className="bg-muted px-4 py-2 rounded-r-md">Choose file</div>
                                </Label>
                                <p className="text-xs text-negative">Upload document or an image format!</p>
                              </div>
                              <div className='grid gap-2'>
                                <Label htmlFor="card">proof of identity(Driving Licenses, passport - optional)</Label>
                                <Input id="eletter" className="hidden" type="file" />
                                <Label htmlFor="eletter" className="text-sm font-medium border cursor-pointer flex items-center justify-between w-full rounded-md hover:bg-muted">
                                    <div className="text-ring p-2">---Choose file---</div>
                                    <div className="bg-muted px-4 py-2 rounded-r-md">Choose file</div>
                                </Label>
                              </div>
                            </div>   
                          ) : (
                            <div className='grid gap-6'>
                              <div className='grid gap-2'>
                                <Label htmlFor="card">proof of identity(Driving Licenses, passport - optional)</Label>
                                <Input id="cardId" className="hidden" type="file" />
                                <Label htmlFor="cardId" className="text-sm font-medium border cursor-pointer flex items-center justify-between w-full rounded-md hover:bg-muted">
                                    <div className="text-ring p-2">---Choose file---</div>
                                    <div className="bg-muted px-4 py-2 rounded-r-md">Choose file</div>
                                </Label>
                                <p className="text-xs text-negative">Upload document or an image format!</p>
                              </div>
                            </div>   
                          )}                     
                      </TabsContent>
                  </Tabs>
                  </div>
              </CardContent>
              {activeTab === 'Employment status' ? (
                <FormCardFooter text="Next"/>
              ) : (
                <CardFooter  className="flex gap-2 items-center p-4 justify-between w-full border-t">
                  <Button variant={'outline'} type="button" className="w-[48%]" onClick={() => handletoggle('prev')}>Previous</Button>
                  <Button loading={activeTab === "Uploads" && loading} disabled={activeTab === "Uploads" && loading} className="w-[48%]" type="button" onClick={() => handletoggle('next')}>Next</Button>
                </CardFooter >
              )}
              
          </form>
        </div>
)
}

export default EmploymentCheck