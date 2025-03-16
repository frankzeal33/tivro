"use client"
import { Button } from '@/components/ui/button'
import { ArrowLeft, Check, ChevronLeft, ChevronRight, ChevronsUpDown } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { BsFillLightningChargeFill } from 'react-icons/bs'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "@/components/ui/command"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Separator } from '@/components/ui/separator'
import { SubscriptionStatus } from '@/components/SubscriptionStatus'
import { ContainerTitle } from '@/components/ContainerTitle'
import { cn } from '@/lib/utils'
import NotFound from '@/components/NotFound'
import { useState } from 'react'

const frameworks = [
    {
      value: "passed",
      label: "Passed",
    },
    {
      value: "failed",
      label: "Failed",
    },
    {
      value: "pending",
      label: "Pending",
    },
    {
      value: "ongoing",
      label: "Ongoing",
    }
  ]


const certificates = [
    {
      id: 1,
      transaction: "Paystack",
      plan: "one-time",
      datePurchased: "22 Sep 2024, 10:15 AM",
      amount: 20000,
      status: 'successful'
    },
    {
        id: 1,
        transaction: "Paystack",
        plan: "one-time",
        datePurchased: "22 Sep 2024, 10:15 AM",
        amount: 20000,
        status: 'failed'
    },
    {
        id: 1,
        transaction: "Paystack",
        plan: "one-time",
        datePurchased: "22 Sep 2024, 10:15 AM",
        amount: 20000,
        status: 'pending'
    },
  ]


const page = () => {

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

  return (
    <div className='my-container space-y-4'>
        <ContainerTitle title='Subscriptions' desc='Manage your Tivro subscriptions'/>

        <div className='bg-light p-4 rounded-2xl border space-y-4'>
            <div>
                <div className='flex gap-1 items-center justify-between'>
                    <div className='rounded-full size-10 bg-primary/20 flex items-center justify-center'>
                        <BsFillLightningChargeFill size={26} className="text-primary"/>
                    </div>
                    <Button>Upgrade plan</Button>
                </div>
                <div className='flex flex-col mt-2'>
                    <div className="space-y-1">
                        <h4 className="text-sm leading-none">One-time plan</h4>
                        
                    </div>
                    <div className="flex h-10 items-center space-x-4 text-sm mt-5">
                        <div>
                            <div className='mb-1'>Amount</div>
                            <p className="text-sm text-muted-foreground">₦10,000</p>
                        </div>
                        <Separator orientation="vertical" />
                        <div>
                            <div className='mb-1'>Date issued</div>
                            <p className="text-sm text-muted-foreground">26th Nov, 2024</p>
                        </div>
                        <Separator orientation="vertical" />
                        <div>
                            <div className='mb-1'>Subscription status</div>
                            <SubscriptionStatus status='active'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className='bg-light p-4 rounded-2xl border'>
            <div className='flex items-center gap-2 mb-6'>
                <p className="text-lg font-medium leading-none">Subscription history</p>
            </div>
            
                <div className="w-full p-2 rounded-2xl bg-light border min-h-[68vh] flex flex-col items-center justify-between">
                <Table>
                        <TableHeader>
                            <TableRow className="bg-muted">
                            <TableHead className="rounded-tl-xl capitalize">Transaction</TableHead>
                            <TableHead className='capitalize'>Plan</TableHead>
                            <TableHead className='capitalize'>Date purchased</TableHead>
                            <TableHead className="capitalize">Amount</TableHead>
                            <TableHead className='rounded-tr-xl capitalize'>
                                <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="border-0 shadow-none justify-between"
                                    >
                                    Status
                                    <ChevronsUpDown className="opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                    <CommandInput placeholder="Search status..." />
                                    <CommandList>
                                        <CommandEmpty>No status found.</CommandEmpty>
                                        <CommandGroup>
                                        {frameworks.map((framework) => (
                                            <CommandItem
                                            key={framework.value}
                                            value={framework.value}
                                            onSelect={(currentValue) => {
                                                setValue(currentValue === value ? "" : currentValue)
                                                setOpen(false)
                                            }}
                                            >
                                            {framework.label}
                                            <Check
                                                className={cn(
                                                "ml-auto",
                                                value === framework.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            </CommandItem>
                                        ))}
                                        </CommandGroup>
                                    </CommandList>
                                    </Command>
                                </PopoverContent>
                                </Popover>
                            </TableHead>
                            </TableRow>
                        </TableHeader>
                        {
                        certificates.length !== 0 &&
                            (
                            <TableBody>
                                {certificates.map((cert, index) => (
                                <TableRow key={index}>
                                    <TableCell className="capitalize">{cert.transaction}</TableCell>
                                    <TableCell className='capitalize'>{cert.plan}</TableCell>
                                    <TableCell className='capitalize'>{cert.datePurchased}</TableCell>
                                    <TableCell className='capitalize'>₦{cert.amount}</TableCell>
                                    <TableCell className='capitalize'>
                                    <SubscriptionStatus status={cert.status}/>
                                    </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                            )
                        }
                        
                    </Table>

                    {certificates.length === 0 &&
                    <div className='flex flex-col items-center justify-center min-h-[58vh] w-full'>
                        <NotFound imageStyle='size-14' title='No requests found' desc='You haven’t added any tenants yet'/>
                    </div>
                    }

                    {
                    certificates.length !== 0 &&
                    (
                        <div className='flex gap-2 items-center justify-between w-full my-2'>
                        <div className='flex gap-2 items-center justify-between'>
                            <Select>
                                <SelectTrigger className="w-[75px]">
                                <SelectValue placeholder="10" />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="apple">10</SelectItem>
                                    <SelectItem value="banana">20</SelectItem>
                                    <SelectItem value="blueberry">50</SelectItem>
                                    <SelectItem value="grapes">70</SelectItem>
                                    <SelectItem value="pineapple">100</SelectItem>
                                </SelectGroup>
                                </SelectContent>
                            </Select>
                            <span className='text-muted-foreground'>Per Page</span>
                        </div>
                            
                        <div className='flex gap-2 items-center justify-between'>
                            <Link href={"#"}><ChevronLeft size={20}/></Link>
                            <Button variant={'ghost'} className='bg-red-500/10 text-red-700 border-0 font-semibold'>1</Button>
                            <Link href={"#"}><ChevronRight size={20}/></Link>
                        </div>
                    </div>
                    )
                    }
                </div>
        </div>
    </div>
  )
}

export default page