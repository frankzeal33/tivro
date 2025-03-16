"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
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

const Page = () => {
    const [value, setValue] = useState()

    const router = useRouter()
    
    const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    router.push('/register/verify-email')
    }

  return (
    <div className='my-container space-y-4'>
        <div  className='flex items-end justify-between gap-2'>
            <div>
                <Link href={'/dashboard'} className="text-sm mb-6 flex gap-1 items-center">
                    <ArrowLeft size={16} className="text-normal"/>
                    Back
                </Link>
                <h2 className='font-bold text-2xl'>Verification request</h2>
                <p className='text-muted-foreground'>Provide the tenant’s details to proceed with verification</p>
            </div>
        </div>

        <div className='bg-light p-4 rounded-2xl border'>
            <form className={cn("flex flex-col gap-6")} onSubmit={handleSubmit}>
                <div className="grid gap-6">
                    <div className='grid gap-6 md:grid-cols-2'>
                        <div className="grid gap-2">
                            <Label htmlFor="firstname">First name</Label>
                            <Input id="firstname" type="text" placeholder="Enter your name here" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="lastname">Last name</Label>
                            <Input id="lastname" type="text" placeholder="Enter your name here" required />
                        </div>
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
                                onChange={setValue}
                                className='border p-2 rounded-md text-sm focus:outline-0 w-full'
                            />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone">Home address</Label>
                        <Input id="phone" type="text" placeholder="Enter your name here" required />
                    </div>
                    
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                        <Button type="submit" className='max-w-48'>
                            Request Verification
                        </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="rounded-2xl p-0 w-[300px] gap-0">
                            <AlertDialogHeader className="bg-background-light rounded-t-2xl p-4 flex flex-row items-center justify-between gap-2">
                                <AlertDialogTitle className="text-sm">Confirm verification request</AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogDescription className="bg-light px-4 py-6 flex flex-col items-center justify-center gap-3">
                                <span>You are about to send a verification request. Please endure that the details you’ve provided are correct before proceeding.</span>
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