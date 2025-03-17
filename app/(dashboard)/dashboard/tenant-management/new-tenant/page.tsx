"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import PhoneInput from 'react-phone-number-input'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ContainerTitle } from '@/components/ContainerTitle'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { IoIosInformationCircle } from "react-icons/io";

const Page = () => {
    const [value, setValue] = useState<string | undefined>(undefined)
    const [date, setDate] = useState<Date>()

    const router = useRouter()
    
    const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    router.push('/register/verify-email')
    }

  return (
    <div className='my-container space-y-4'>
        <ContainerTitle title='Add a new tenant' desc='Provide the tenant’s details to proceed' goBack='/dashboard/tenant-management'/>

        <div className='bg-light p-4 rounded-2xl border'>
            <form className={cn("flex flex-col gap-6")} onSubmit={handleSubmit}>
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
                        <Label htmlFor="property">Select a property</Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a property" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Properties</SelectLabel>
                                <SelectItem value="Gbenga Sonoiki Estat">Gbenga Sonoiki Estate</SelectItem>
                                <SelectItem value="Gbenga Sonoiki Estate">Gbenga Sonoiki Estate</SelectItem>
                                <SelectItem value="Gbenga Sonoik Estate">Gbenga Sonoiki Estate</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='grid gap-6 md:grid-cols-2'>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input id="email" type="email" placeholder="Enter email address" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone no.</Label>
                            <PhoneInput
                                placeholder="Enter phone number"
                                value={value}
                                defaultCountry="NG"
                                onChange={phone => setValue(phone)}
                                className='border p-2 rounded-md text-sm focus:outline-0 w-full'
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="Occupancy-date">Occupancy date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                    variant={"outline"}
                                    className={cn(
                                        "justify-start text-left font-normal bg-light",
                                        !date && "text-muted-foreground"
                                    )}
                                    >
                                    <CalendarIcon />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                                    <Select
                                    onValueChange={(value) =>
                                        setDate(addDays(new Date(), parseInt(value)))
                                    }
                                    >
                                    <SelectTrigger className='w-full'>
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="0">Today</SelectItem>
                                        <SelectItem value="1">Tomorrow</SelectItem>
                                        <SelectItem value="3">In 3 days</SelectItem>
                                        <SelectItem value="7">In a week</SelectItem>
                                    </SelectContent>
                                    </Select>
                                    <div className="rounded-md border">
                                        <Calendar mode="single" selected={date} onSelect={setDate}/>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="Renewal-date">Renewal date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                    variant={"outline"}
                                    className={cn(
                                        "justify-start text-left font-normal bg-light",
                                        !date && "text-muted-foreground"
                                    )}
                                    >
                                    <CalendarIcon />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                                    <Select
                                    onValueChange={(value) =>
                                        setDate(addDays(new Date(), parseInt(value)))
                                    }
                                    >
                                    <SelectTrigger className='w-full'>
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="0">Today</SelectItem>
                                        <SelectItem value="1">Tomorrow</SelectItem>
                                        <SelectItem value="3">In 3 days</SelectItem>
                                        <SelectItem value="7">In a week</SelectItem>
                                    </SelectContent>
                                    </Select>
                                    <div className="rounded-md border">
                                        <Calendar mode="single" selected={date} onSelect={setDate}/>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <div className='w-full flex items-center bg-muted gap-1 border border-l-primary border-l-6 rounded-md p-2'>
                            <IoIosInformationCircle size={20} className='text-muted-foreground'/>
                            <p className='text-muted-foreground text-xs md:text-sm'>Please note that you would be charged $4.00 for initiating this request. </p>  
                        </div>
                    </div>
                    
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                        <Button type="submit" className='max-w-48'>
                            Add a new tenant
                        </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="rounded-2xl p-0 w-[300px] gap-0">
                            <AlertDialogHeader className="bg-background-light rounded-t-2xl p-4 flex flex-row items-center justify-between gap-2">
                                <AlertDialogTitle className="text-sm">Confirm request</AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogDescription className="bg-light px-4 py-6 flex flex-col items-center justify-center gap-3">
                                <span>You are about to add a new tenant . Please ensure that the details you’ve provided are correct before proceeding.</span>
                            </AlertDialogDescription>
                            <AlertDialogFooter className='flex items-center justify-center w-full gap-2 rounded-b-2xl bg-light border-t p-4'>
                                <AlertDialogCancel className='w-[50%] bg-light'>Cancel</AlertDialogCancel>
                                <AlertDialogAction className='w-[50%]'>Proceed</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Page