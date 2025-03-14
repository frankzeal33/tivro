"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'
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
import { Calendar as CalendarIcon, ChevronRight, X } from "lucide-react"
import {
  Card
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Textarea } from '@/components/ui/textarea'

const page = () => {
    const [value, setValue] = useState()
    const [date, setDate] = React.useState<Date>()
    const [activeTab, setActiveTab] = useState("Property information");

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

  return (
    <div className='my-container space-y-4'>
        <ContainerTitle title='Add a new tenant' desc='Provide the tenant’s details to proceed' goBack='/dashboard/tenant-management'/>

        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 bg-light border p-0 shadow-none w-[400px]">
                <TabsTrigger value="Property information" className='rounded-r-none bg-background'>Property information</TabsTrigger>
                <TabsTrigger value="Maintenance information" className='rounded-l-none bg-background'>Maintenance information</TabsTrigger>
            </TabsList>
            <TabsContent value="Property information">
                <Card className='w-full shadow-none mt-4 p-4'>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="property">Property name</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a property name" />
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

                        <div className="grid gap-2">
                            <Label htmlFor="property type">Property type</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a property name" />
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

                        <div className="grid gap-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" type="text" placeholder="Enter last name here" required />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="location">Property description (optional)</Label>
                            <Textarea placeholder="Enter description here" />
                        </div>

                        <Button type="submit" className='max-w-24 ml-auto' onClick={() => toggle('next')}>
                            Next
                        </Button>
                    </div>
                </Card>
            </TabsContent>
            <TabsContent value="Maintenance information">
                <Card className='w-full shadow-none mt-4 p-4'>
                <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="property">Maintenance responsibility</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a property name" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Gbenga Sonoiki Estat">Gbenga Sonoiki Estate</SelectItem>
                                        <SelectItem value="Gbenga Sonoiki Estate">Gbenga Sonoiki Estate</SelectItem>
                                        <SelectItem value="Gbenga Sonoik Estate">Gbenga Sonoiki Estate</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="property type">PLease terms</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a property name" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Gbenga Sonoiki Estat">Gbenga Sonoiki Estate</SelectItem>
                                        <SelectItem value="Gbenga Sonoiki Estate">Gbenga Sonoiki Estate</SelectItem>
                                        <SelectItem value="Gbenga Sonoik Estate">Gbenga Sonoiki Estate</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="property type">Security features</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a property name" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Gbenga Sonoiki Estat">Gbenga Sonoiki Estate</SelectItem>
                                        <SelectItem value="Gbenga Sonoiki Estate">Gbenga Sonoiki Estate</SelectItem>
                                        <SelectItem value="Gbenga Sonoik Estate">Gbenga Sonoiki Estate</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className='ml-auto flex gap-2'>
                            <Button type="submit" variant={'outline'} className='max-w-48 bg-light' onClick={() => toggle('prev')}>
                                Previous
                            </Button>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                <Button type="submit" className='max-w-48'>
                                    Complete
                                </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="rounded-2xl p-0 w-[300px] gap-0">
                                    <AlertDialogHeader className="bg-background-light rounded-t-2xl p-4 flex flex-row items-center justify-between gap-2">
                                        <AlertDialogTitle className="text-sm">Confirm request</AlertDialogTitle>
                                    </AlertDialogHeader>
                                    <AlertDialogDescription className="bg-light px-4 py-6 flex flex-col items-center justify-center gap-3">
                                        <span>You are about to add a new property. Please ensure that the details you’ve provided are correct before proceeding. </span>
                                    </AlertDialogDescription>
                                    <AlertDialogFooter className='flex items-center justify-center w-full gap-2 rounded-b-2xl bg-light border-t p-4'>
                                        <AlertDialogCancel className='w-[50%] bg-light'>Cancel</AlertDialogCancel>
                                        <AlertDialogAction className='w-[50%]'>Proceed</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            
                        </div>
                    </div>
                </Card>
            </TabsContent>
        </Tabs>

    </div>
  )
}

export default page