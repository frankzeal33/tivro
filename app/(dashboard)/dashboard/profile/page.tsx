"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ContainerTitle } from '@/components/ContainerTitle'

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { X } from "lucide-react"
import {
  Card
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import PhoneInputWithCountrySelect from 'react-phone-number-input'
import { PiSealCheckFill } from "react-icons/pi";

const page = () => {
    const [value, setValue] = useState()
    const [date, setDate] = useState<Date>()
    const [activeTab, setActiveTab] = useState("Personal information");
    const [open, setOpen] = useState(false);
    const router = useRouter()
    
    const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    router.push('/register/verify-email')
    }

    const toggle = (value: string) => {
        if(value === 'next'){
            setActiveTab("Maintenance information")
        }else if(value === 'prev'){
            setActiveTab("Property information")
        }
    }

    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      setFileName(file ? file.name : "No file selected");
    };

  return (
    <div className='my-container space-y-4'>
        <ContainerTitle title='Profile' desc='Manage your personal information here'/>

        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 bg-light border p-0 shadow-none">
                <TabsTrigger value="Personal information" className='rounded-r-none bg-background'>Personal information</TabsTrigger>
                <TabsTrigger value="Change email" className='rounded-none bg-background'>Change email</TabsTrigger>
                <TabsTrigger value="Change password" className='rounded-l-none bg-background'>Change password</TabsTrigger>
            </TabsList>
            <TabsContent value="Personal information">
                <Card className='w-full shadow-none mt-4 p-4'>
                    <div className='flex gap-4 items-center'>
                        <div className='relative'>
                            <Avatar className='size-32'>
                                <AvatarImage src={'/photo.png'} alt="@shadcn" />
                                <AvatarFallback className='text-4xl'>CN</AvatarFallback>
                            </Avatar>
                            <PiSealCheckFill size={30} className='text-primary absolute top-22 right-0'/>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h3 className='2xl font-semibold'>Profile Picture</h3>
                            <p className="text-sm font-medium text-muted-foreground leading-none">This image will be displayed on your profile</p>
                            <Input id="picture" type="file" className="hidden" onChange={handleFileChange}/>
                            <Label htmlFor="picture" className="text-sm font-medium border cursor-pointer p-2 flex items-center justify-center max-w-[130px] rounded-md hover:bg-muted">
                                Upload Picture
                            </Label>
                        </div>
                    </div>
                </Card>
                <Card className='w-full shadow-none mt-4 p-4'>
                    <form>
                        <div className="grid gap-6">
                            <div className='grid gap-6 md:grid-cols-2'>
                                <div className="grid gap-2">
                                    <Label htmlFor="firstname">First name</Label>
                                    <Input id="firstname" type="text" placeholder="Enter first name here" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="lastname">Last name</Label>
                                    <Input id="lastname" type="text" placeholder="Enter last name here" required />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input id="email" type="email" placeholder="Enter email address" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone">Phone no.</Label>
                                <PhoneInputWithCountrySelect
                                    placeholder="Enter phone number"
                                    value={value}
                                    defaultCountry="NG"
                                    onChange={setValue}
                                    className='border p-2 rounded-md text-sm focus:outline-0 w-full'
                                />
                            </div>
                    
                            <Button type="submit" className='max-w-40'>
                                Update profile
                            </Button>
                            
                        </div>
                    </form>
                </Card>
            </TabsContent>
            <TabsContent value="Change email">
                <Card className='w-full shadow-none mt-4 p-4'>
                    <form>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input id="email" type="email" placeholder="Enter email address" required disabled className='bg-background'/>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="new-email">New email address</Label>
                                <Input id="new-email" type="email" placeholder="Enter new email address" required />
                            </div>
                        
                    
                            <Button type="submit" className='max-w-40' onClick={() => setOpen(true)}>
                                Change email
                            </Button>
                            
                        </div>
                    </form>
                </Card>
            </TabsContent>
            <TabsContent value="Change password">
                <Card className='w-full shadow-none mt-4 p-4'>
                    <form>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="old-password">Old password</Label>
                                <Input id="old-password" type="password" placeholder="Enter old password" required/>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="new-password">New password</Label>
                                <Input id="new-password" type="password" placeholder="Enter new password" required />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="cnew-password">Confirm new password</Label>
                                <Input id="cnew-password" type="password" placeholder="Confirm password" required />
                            </div>
                        
                    
                            <Button type="submit" className='max-w-40' onClick={() => setOpen(true)}>
                                Change password
                            </Button>
                            
                        </div>
                    </form>
                </Card>
            </TabsContent>
        </Tabs>

        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className="rounded-2xl p-0 w-[300px] gap-0">
                <form>
                    <AlertDialogHeader className="bg-background-light rounded-t-2xl p-4 flex flex-row items-center justify-between gap-2">
                        <AlertDialogTitle className="text-sm">Verify OTP</AlertDialogTitle>
                        <AlertDialogCancel className='bg-background-light border-0 shadow-none'><X className='text-2xl'/></AlertDialogCancel>
                    </AlertDialogHeader>
                    <AlertDialogDescription className="w-full bg-light px-4 py-4 flex flex-col items-center justify-center gap-3">
                        <span className='grid gap-2 w-full'>
                            <span>Enter the confirmation code sent to <span className='text-accent-foreground'>reginaldabiepepple@gmail.com</span> to confirm this action</span>
                            <Input type='number' placeholder="Enter code here" required className='text-center'/>
                            <span className='text-center'>Didn’t receive a code? <Button variant={'link'} className='p-0 text-primary font-medium'>Resend</Button></span>
                        </span>
                    </AlertDialogDescription>
                    <AlertDialogFooter className='flex items-center justify-center w-full gap-2 rounded-b-2xl bg-light border-t p-4'>
                        <AlertDialogAction className='w-full' onClick={() => setOpen(true)}>Verify</AlertDialogAction>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>

    </div>
  )
}

export default page