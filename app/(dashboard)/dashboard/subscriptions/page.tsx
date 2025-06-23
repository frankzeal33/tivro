"use client"
import { Button } from '@/components/ui/button'
import { ArrowLeft, Check, ChevronLeft, ChevronRight, ChevronsUpDown } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect } from 'react'
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
import { ContainerTitle } from '@/components/ContainerTitle'
import { cn } from '@/lib/utils'
import NotFound from '@/components/NotFound'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { axiosClient } from '@/GlobalApi'
import { format } from 'date-fns'
import { SubscriptionStatus } from '@/components/SubscriptionStatus'
import displayCurrency from '@/utils/displayCurrency'
import { Loading } from '@/components/Loading'

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

type planType = {
    Number_of_verification: number;
    status: string;
    plan: string;
    date: string;
    amount: number
}

type historyType = {
    payment_gateway: string;
    plan: string;
    status: string;
    amount: number;
    created_at: string;
}[]

const Page = () => {

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const [loadingSubscription, setLoadingSubscription] = useState(false)
    const [loadingPlan, setLoadingPlan] = useState(false)
    const [subscriptionPlan, setSubscriptionPlan] = useState<planType>()
    const [subHistory, setSubHistory] = useState<historyType>([])

    const getPlan = async () => {
    
        try {
        
            setLoadingPlan(true)
            
            const response = await axiosClient.get("/user/subscription/plans/")
            setSubscriptionPlan(response.data || {})
    
        } catch (error: any) {
            toast.error(error.response?.data?.message);
        } finally {
            setLoadingPlan(false)
        } 
    }

    const getSubscription = async () => {
    
        try {
        
            setLoadingSubscription(true)
            
            const response = await axiosClient.get("/transaction/list/")
            setSubHistory(response.data || [])
    
        } catch (error: any) {
            toast.error(error.response?.data?.message);
        } finally {
            setLoadingSubscription(false)
        } 
    }
    
    useEffect(() => {
        getPlan()
        getSubscription()
    }, [])

  return (
    <div className='my-container space-y-4'>
        <ContainerTitle title='Subscriptions' desc='Manage your Tivro subscriptions'/>

        <div className='bg-light p-4 rounded-2xl border space-y-4'>
            {loadingSubscription ? (
                <div className='flex flex-col items-center justify-center min-h-[20vh] w-full'>
                    <Loading/>
                </div>
            ) : (
                <div>
                    <div className='flex gap-1 items-center justify-between'>
                        <div className='rounded-full size-10 bg-primary/20 flex items-center justify-center'>
                            <BsFillLightningChargeFill size={26} className="text-primary"/>
                        </div>
                        <Button>Upgrade plan</Button>
                    </div>
                    <div className='flex flex-col mt-2'>
                        <div className="space-y-1">
                            <h4 className="text-sm leading-none">{subscriptionPlan?.plan}</h4>
                            
                        </div>
                        <div className="flex h-10 items-start md:items-center space-x-4 text-sm my-7">
                            <div>
                                <div className='mb-1'>Amount</div>
                                <p className="text-sm text-muted-foreground">{displayCurrency(Number(subscriptionPlan?.amount), "NGN")}</p>
                            </div>
                            <div>
                                <div className='mb-1'>Date issued</div>
                                <p className="text-sm text-muted-foreground">{subscriptionPlan?.date && format(new Date(subscriptionPlan?.date), "dd MMM yyyy")}</p>
                            </div>
                            <Separator orientation="vertical" />
                            <div>
                                <div className='mb-1'>Subscription status</div>
                                <SubscriptionStatus status={subscriptionPlan?.status || "N/A"}/>
                            </div>
                        </div>
                    </div>
                </div>
            )}
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
                        subHistory.length !== 0 &&
                            (
                            <TableBody>
                                {subHistory.map((history, index) => (
                                <TableRow key={index}>
                                    <TableCell className="capitalize">{history?.payment_gateway}</TableCell>
                                    <TableCell className='capitalize'>{history?.plan}</TableCell>
                                    <TableCell className='capitalize'>{format(new Date(history?.created_at), "dd MMM yyyy HH:mm a")}</TableCell>
                                    <TableCell className='capitalize'>₦{history?.amount}</TableCell>
                                    <TableCell className='capitalize'>
                                    <SubscriptionStatus status={history?.status}/>
                                    </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                            )
                        }
                        
                    </Table>

                    {subHistory.length === 0 && !loadingSubscription &&
                    <div className='flex flex-col items-center justify-center min-h-[58vh] w-full'>
                        <NotFound imageStyle='size-14' title='No requests found' desc='You haven’t added any tenants yet'/>
                    </div>
                    }

                    {loadingSubscription &&
                        <div className='flex flex-col items-center justify-center min-h-[58vh] w-full'>
                            <Loading/>
                        </div>
                    }

                    {
                    subHistory.length !== 0 && !loadingSubscription &&
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

export default Page