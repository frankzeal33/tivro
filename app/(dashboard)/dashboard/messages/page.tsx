"use client"
import Title from '@/components/Title'
import React, { useEffect, useState } from 'react'
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
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Check, ChevronLeft, ChevronRight, ChevronsUpDown, X } from "lucide-react" 
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Status } from '@/components/Status'
import NotFound from '@/components/NotFound'
import { axiosClient } from '@/GlobalApi'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import ReduceTextLength from '@/utils/ReduceTextLength'

type messageType = {
    id: number;
    title: string;
    body: string;
    status: boolean;
    created_at: string;
}[]

const Page = () => {

  const [loadingMessages, setLoadingMessages] = useState(false)
  const [messages, setMessages] = useState<messageType>([])
  const [count, setCount] = useState(0)

   const getMessages = async () => {
    
      try {
  
        setLoadingMessages(true)
        
        const response = await axiosClient.get("/notification/")
        setMessages(response.data?.items || [])
        setCount(response.data?.count || 0)
  
      } catch (error: any) {
        toast.error(error.response?.data?.message);
      } finally {
        setLoadingMessages(false)
      } 
    }
  
    useEffect(() => {
      getMessages()
    }, [])


  return (
    <div className='my-container'>
        <Title title='Inbox' desc='View new messages here'/>

        <div className='bg-light p-4 rounded-2xl border'>
            <div className='flex items-center gap-2 mb-6'>
                <p className="text-lg font-medium leading-none">Messages({count})</p>
            </div>

            <div className="w-full p-2 rounded-2xl bg-light border min-h-[68vh] flex flex-col items-center justify-between">
                <Table>
                <TableHeader>
                    <TableRow className="bg-muted">
                        <TableHead className="rounded-tl-xl capitalize">Title</TableHead>
                        <TableHead className='capitalize text-ellipsis line-clamp-1'>Message</TableHead>
                        <TableHead className='capitalize'>Date received</TableHead>
                        <TableHead className="rounded-tr-2xl capitalize">Action</TableHead>
                    </TableRow>
                </TableHeader>
                {
                messages.length !== 0 &&
                    (
                    <TableBody>
                        {messages.map((message, index) => (
                        <TableRow key={message?.id}>
                            <TableCell className={`capitalize ${message?.status && 'font-semibold'}`}>{message?.title}</TableCell>
                            <TableCell className={`capitalize ${message?.status && 'font-semibold'}`}>{ReduceTextLength(message?.body, 20)}</TableCell>
                            <TableCell className={`capitalize ${message?.status && 'font-semibold'}`}>{format(new Date(message?.created_at), "dd MMM yyyy HH:mm a")}</TableCell>
                            <TableCell className='capitalize text-center bg-muted/30'>
                               
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant={`${message?.status ? 'default' : 'ghost'}`}>View</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="rounded-2xl p-0 w-[300px] md:w-[600px] max-h-[95%] overflow-y-auto gap-0">
                                        <AlertDialogHeader className="bg-background-light rounded-t-2xl p-4 flex flex-row items-center justify-between gap-4">
                                            <AlertDialogTitle className="text-sm">{message?.title} 🎉</AlertDialogTitle>
                                            <AlertDialogCancel className="bg-background-light border-0 shadow-none size-8 rounded-full">
                                                <X className="size-6"/>
                                            </AlertDialogCancel>
                                        </AlertDialogHeader>
                                        <AlertDialogDescription className="bg-light px-4 rounded-b-2xl py-6 text-justify flex flex-col gap-3">
                                            {message?.body}
                                        </AlertDialogDescription>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    )
                }
                
                </Table>

                {messages.length === 0 &&
                <div className='flex flex-col items-center justify-center min-h-[58vh] w-full'>
                    <NotFound imageStyle='size-14' title='No requests found' desc='You haven’t added any tenants yet'/>
                </div>
                }

                {
                messages.length !== 0 &&
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