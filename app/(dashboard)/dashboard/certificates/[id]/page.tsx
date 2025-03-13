import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { BsFillLightningChargeFill } from 'react-icons/bs'
import {
    Card,
    CardContent,
  } from "@/components/ui/card"
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import Image from 'next/image'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Status } from '@/components/Status'

const page = () => {
    const status = 'passed'
  return (
    <div className='my-container space-y-4'>
        <div  className='flex items-end justify-between gap-2'>
            <div>
                <Link href={'/dashboard/certificates'} className="text-sm mb-6 flex gap-1 items-center">
                    <ArrowLeft size={16} className="text-normal"/>
                    Back
                </Link>
                <h2 className='font-bold text-2xl'>Issued certificate</h2>
                <p className='text-muted-foreground'>22 Sep 2024, 10:15 AM</p>
            </div>
            <Button>
                <BsFillLightningChargeFill size={26} className="text-primary-foreground"/>
                Download
            </Button>
        </div>

        <div className='bg-light p-4 rounded-2xl border space-y-4'>
            <Card className='shadow-none'>
                <CardContent>               
                    <div className='flex flex-col gap-4 items-center justify-center'>
                        <Avatar className='size-32'>
                            <AvatarImage src={'/photo.png'} alt="@shadcn" />
                            <AvatarFallback className='text-4xl'>CN</AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col items-center gap-2'>
                            <p className="text-2xl font-medium leading-none">Ojiego Franklin</p>
                            <div className='flex items-center gap-1'>
                                <p className="text-base text-muted-foreground">Certificate of verification presented by</p>
                                <div className="flex items-center">
                                    <Image src={'/tivro.png'} width={16} height={20} alt=""/>
                                    <h2 className="font-bold text-base">ivro</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className='shadow-none'>
                <CardContent>               
                    <div>
                        <div className='grid md:grid-cols-2 gap-4'>
                            <div>
                                <p className="text-sm font-medium leading-none">First name</p>
                                <p className="text-sm text-muted-foreground">franklin</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium leading-none">Last name</p>
                                <p className="text-sm text-muted-foreground">ojiego</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium leading-none">Email</p>
                                <p className="text-sm text-muted-foreground">ojiegofranklin@gmail.com</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium leading-none">Phone No</p>
                                <p className="text-sm text-muted-foreground">+234 8283939393</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium leading-none">Address</p>
                                <p className="text-sm text-muted-foreground">Warszawa, 020235, Wschodu Slonca</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium leading-none">Date issued</p>
                                <p className="text-sm text-muted-foreground">22 Sep 2024, 10:15 AM</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className='bg-light p-4 rounded-2xl border space-y-4'>
            <div className='flex items-center gap-2 mb-6'>
                <p className="text-xl font-medium leading-none">Verification Status</p>
                <Status status={status}/>
            </div>

            <div>
                <Accordion type="multiple" className="w-full space-y-6" defaultValue={["item-1", "item-2", "item-3"]}>
                    <AccordionItem value="item-1" className='border rounded-2xl px-6'>
                        <AccordionTrigger className='border-b rounded-none hover:no-underline'>
                            <div className='flex items-center gap-2'>
                                <p className="text-lg font-medium leading-none">Identity check</p>
                                <Status status={status} otherStyles='text-sm'/>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className='space-y-2 py-4'>
                                <div className='md:flex gap-2 items-center justify-between'>
                                    <p className="text-sm text-muted-foreground">Identification method</p>
                                    <p className="text-sm font-medium leading-none">Bank verification number (BVN)</p>
                                </div>
                                <div className='md:flex gap-2 items-center justify-between'>
                                    <p className="text-sm text-muted-foreground">Identification number</p>
                                    <p className="text-sm font-medium leading-none">43585**********23</p>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2" className='border rounded-2xl px-6'>
                        <AccordionTrigger className='border-b rounded-none hover:no-underline'>
                            <div className='flex items-center gap-2'>
                                <p className="text-lg font-medium leading-none">Credit check</p>
                                <Status status={status} otherStyles='text-sm'/>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className='space-y-2 py-4'>
                                <div className='md:flex gap-2 items-center justify-between'>
                                    <p className="text-sm text-muted-foreground">No data indicating  non-payment.</p>
                                </div>
                                <div className='md:flex gap-2 items-center justify-between'>
                                    <p className="text-sm text-muted-foreground">Databases analysed:</p>
                                    <p className="text-sm font-bold leading-none">Credit Information Bureau</p>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3" className='border rounded-2xl px-6'>
                        <AccordionTrigger className='border-b rounded-none hover:no-underline'>
                            <div className='flex items-center gap-2'>
                                <p className="text-lg font-medium leading-none">Employment check</p>
                                <Status status={status} otherStyles='text-sm'/>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className='space-y-2 py-4'>
                                <div className='md:flex gap-2 items-center justify-between'>
                                    <p className="text-sm text-muted-foreground">Line Manager Check</p>
                                    <p className="text-sm font-medium leading-none">Passed</p>
                                </div>
                                <div className='md:flex gap-2 items-center justify-between'>
                                    <p className="text-sm text-muted-foreground">Identification Card and Income check</p>
                                    <p className="text-sm font-medium leading-none">Passed</p>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    </div>
  )
}

export default page