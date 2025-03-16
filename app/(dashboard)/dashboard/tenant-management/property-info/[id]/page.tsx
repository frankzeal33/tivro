import { Button } from '@/components/ui/button'
import { ArrowLeft, ChevronLeft, ChevronRight, Plus, X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {
    Card,
    CardContent,
  } from "@/components/ui/card"
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import NotFound from '@/components/NotFound'
import { ContainerTitle } from '@/components/ContainerTitle'

const requests = [
    {
      id: 1,
      fullName: 'Ojiego Franklin',
      occupancyDate: '14 Aug 2024, 3:34 PM',
      renewalDate: '14 Aug 2024, 3:34 PM',
    },
    {
      id: 1,
      fullName: 'Ojiego Franklin',
      occupancyDate: '14 Aug 2024, 3:34 PM',
      renewalDate: '14 Aug 2024, 3:34 PM',
    },
    {
      id: 1,
      fullName: 'Ojiego Franklin',
      occupancyDate: '14 Aug 2024, 3:34 PM',
      renewalDate: '14 Aug 2024, 3:34 PM',
    },
]

const Page = () => {
    const status = 'passed'
  return (
    <div className='my-container space-y-4'>
        <div  className='flex items-end justify-between gap-2'>
            <ContainerTitle goBack='/dashboard/tenant-management' title='Property information' desc='View your property details here'/>
        </div>

        <div className='bg-light p-4 rounded-2xl border space-y-4'>
            <p className='text-lg font-semibold'>Property information</p>

            <Card className='shadow-none'>
                <CardContent>               
                    <div>
                        <div className='grid md:grid-cols-2 gap-4'>
                            <div>
                                <p className="text-sm font-medium leading-none">Property name</p>
                                <p className="text-sm text-muted-foreground">Reginald</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium leading-none">Property type</p>
                                <p className="text-sm text-muted-foreground">Estate</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium leading-none">Maintenance</p>
                                <p className="text-sm text-muted-foreground">Reginald</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium leading-none">Lease terms</p>
                                <p className="text-sm text-muted-foreground">Estate</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium leading-none">Property Location</p>
                                <p className="text-sm text-muted-foreground">14 Adamawa Street, Port Harcourt, Nigeria</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium leading-none">Security features</p>
                                <p className="text-sm text-muted-foreground">Onion</p>
                            </div>
                        </div>
                        <div className='bg-muted p-2 rounded-2xl mt-4'>
                            <p className="text-sm font-medium leading-none mb-1">Property description</p>
                            <p className="text-sm text-muted-foreground">My estate is one of a kind, I only need people who have cars and money, because i’m a no nonsense somebody.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className='bg-light p-4 rounded-2xl border space-y-4'>
            <div className='flex items-center gap-2 mb-6'>
                <p className="text-lg font-medium leading-none">History</p>
            </div>

            <div className="w-full p-2 rounded-2xl bg-light border min-h-[68vh] flex flex-col items-center justify-between">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted">
                  <TableHead className="rounded-tl-xl capitalize">Full name</TableHead>
                  <TableHead className='capitalize'>Occupancy date</TableHead>
                  <TableHead className='capitalize'>Renewal date</TableHead>
                  <TableHead className='capitalize'>Action</TableHead>
                </TableRow>
              </TableHeader>
              {
              requests.length !== 0 &&
                (
                  <TableBody>
                    {requests.map((request, index) => (
                      <TableRow key={index}>
                        <TableCell className='capitalize'>
                          <div className="flex items-center">
                            <Avatar className="-mx-2">
                              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                              <AvatarFallback className="bg-white">CN</AvatarFallback>
                            </Avatar>
                            <div className="ml-3">
                              {request.fullName}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className='capitalize'>
                          {request.occupancyDate}
                        </TableCell>
                        <TableCell className='capitalize'>{request.renewalDate}</TableCell>
                        <TableCell className='capitalize text-center bg-muted/30'>
                            <Link href={`/dashboard/tenant-management/tenant-info/${request.id}`}>
                                <Button variant={'ghost'} className='bg-light'>View Profile</Button>
                            </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )
              }
              
            </Table>

            {requests.length === 0 &&
               <div className='flex flex-col items-center justify-center min-h-[58vh] w-full'>
                <NotFound imageStyle='size-14' title='No data found' desc='No history added yet'/>
              </div>
            }

            {
              requests.length !== 0 &&
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