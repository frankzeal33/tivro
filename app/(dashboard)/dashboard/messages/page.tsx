"use client"
import Title from '@/components/Title'
import React from 'react'
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

const certificates   = [
    {
      id: 1,
      title: "New verification request",
      message: "You created a verification request for Gbenga",
      dateRecieved: "14 Aug 2024, 3:34 PM",
      seen: true
    },
    {
        id: 1,
        title: "New verification request",
        message: "You created a verification request for Gbenga",
        dateRecieved: "14 Aug 2024, 3:34 PM",
        seen: false
    },
    {
        id: 1,
        title: "New verification request",
        message: "You created a verification request for Gbenga",
        dateRecieved: "14 Aug 2024, 3:34 PM",
        seen: false
    },
  ]

const Page = () => {

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <div className='my-container'>
        <Title title='Inbox' desc='View new messages here'/>

        <div className='bg-light p-4 rounded-2xl border'>
            <div className='flex items-center gap-2 mb-6'>
                <p className="text-lg font-medium leading-none">Messages(1)</p>
            </div>

            <div className="w-full p-2 rounded-2xl bg-light border min-h-[68vh] flex flex-col items-center justify-between">
                <Table>
                <TableHeader>
                    <TableRow className="bg-muted">
                        <TableHead className="rounded-tl-xl capitalize">Title</TableHead>
                        <TableHead className='capitalize'>Message</TableHead>
                        <TableHead className='capitalize'>Date received</TableHead>
                        <TableHead className="rounded-tr-2xl capitalize">Action</TableHead>
                    </TableRow>
                </TableHeader>
                {
                certificates.length !== 0 &&
                    (
                    <TableBody>
                        {certificates.map((cert, index) => (
                        <TableRow key={index}>
                            <TableCell className={`capitalize ${cert.seen && 'font-semibold'}`}>{cert.title}</TableCell>
                            <TableCell className={`capitalize ${cert.seen && 'font-semibold'}`}>{cert.message}</TableCell>
                            <TableCell className={`capitalize ${cert.seen && 'font-semibold'}`}>{cert.dateRecieved}</TableCell>
                            <TableCell className='capitalize text-center bg-muted/30'>
                               
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant={`${cert.seen ? 'default' : 'ghost'}`}>View</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="rounded-2xl p-0 w-[300px] md:w-[600px] gap-0">
                                        <AlertDialogHeader className="bg-background-light rounded-t-2xl p-4 flex flex-row items-center justify-between gap-2">
                                            <AlertDialogTitle className="text-sm">New Verification Request 🎉</AlertDialogTitle>
                                            <AlertDialogCancel className="bg-background-light border-0 shadow-none size-8 rounded-full">
                                                <X className="size-6"/>
                                            </AlertDialogCancel>
                                        </AlertDialogHeader>
                                        <AlertDialogDescription className="bg-light px-4 rounded-b-2xl py-6 flex flex-col items-center justify-center gap-3">
                                            You have successfully created a verification request for Reginald Pepple. Please visit your overview page to track the status of this request. 
                                            If your proposed tenant has not received the notification, you can resend the request at no additional cost. Our system ensures that all verification requests are processed promptly, but if you encounter any issues, feel free to reach out to our support team.
                                            We appreciate your trust in Tivro Africa and remain committed to providing a seamless experience for your verification needs.
                                            Best regards,Tivro Africa Team
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

export default Page