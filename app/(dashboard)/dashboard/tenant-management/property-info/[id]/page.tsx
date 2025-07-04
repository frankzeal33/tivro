"use client"
import { Button } from '@/components/ui/button'
import { ArrowLeft, ChevronLeft, ChevronRight, Plus, X } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
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
import { toast } from 'react-toastify'
import { axiosClient } from '@/GlobalApi'
import { useParams } from 'next/navigation'
import Skeleton from '@/components/Skeleton'
import TableSkeleton from '@/components/TableSkeleton'

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

type historyType = {
  property_name: string;
  tenant_id: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  move_in: string;
  renewal_date: string;
  Active_tenant: boolean
}[]

type propertyType = {
  house_id: string;
  property_name: string;
  address: string;
  house_type: string;
  number_of_rooms: number;
  number_of_flats: number;
  property_description: string;
}

const Page = () => {

  const params = useParams();
    const id = params.id;
    const [date, setDate] = useState<Date>()
    const [loadingProperty, setLoadingProperty] = useState(false)
    const [loadingHistory, setLoadingHistory] = useState(false)
    const [property, setProperty] = useState<propertyType | null>(null)
    const [history, setHistory] = useState<historyType>([])
    const [openEditTenant, setOpenEditTenant] = useState(false)
    const [submittingTenant, setSubmittingTenant] = useState(false)
    const [openConfirmModal, setOpenConfirmModal] = useState(false)
    const arrayList = new Array(2).fill(null)
    const tableList = new Array(6).fill(null)
  
    const getProperty = async () => {
      
      try {
        setLoadingProperty(true)
        
        const response = await axiosClient.get(`/property/${id}/`)
        setProperty(response.data || {})
  
      } catch (error: any) {
        toast.error(error.response?.data?.message);
      } finally {
        setLoadingProperty(false)
      } 
    }
  
    const getHistory = async () => {
      
      try {
  
        setLoadingHistory(true)
        
        const response = await axiosClient.get(`/property/${id}/tenants/`)
        setHistory(response.data.items || [])
  
      } catch (error: any) {
        toast.error(error.response?.data?.message);
      } finally {
        setLoadingHistory(false)
      } 
    }
    
    useEffect(() => {
      getProperty()
      getHistory()
    }, [id])

  return (
    <div className='my-container space-y-4'>

      {loadingProperty ? (
          <div className="grid grid-col-1 gap-4">
              {arrayList.map((_, index) => (
                  <Skeleton key={index} />
              ))}
          </div>
      ) : (
        <div className='space-y-4'>
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
                                <p className="text-sm text-muted-foreground">{property?.property_name}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium leading-none">Property type</p>
                                <p className="text-sm text-muted-foreground">{property?.house_type}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium leading-none">No of flats</p>
                                <p className="text-sm text-muted-foreground">{property?.number_of_flats}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium leading-none">No of rooms</p>
                                <p className="text-sm text-muted-foreground">{property?.number_of_rooms}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium leading-none">Property Location</p>
                                <p className="text-sm text-muted-foreground">{property?.address}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium leading-none">House ID</p>
                                <p className="text-sm text-muted-foreground">{property?.house_id}</p>
                            </div>
                        </div>
                        <div className='bg-muted p-2 rounded-2xl mt-4'>
                            <p className="text-sm font-medium leading-none mb-1">Property description</p>
                            <p className="text-sm text-muted-foreground">{property?.property_description}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
          </div>
        </div>
      )}

      {loadingHistory ? (
        <div className="mt-4">
            <div className='w-full h-72 bg-white rounded-sm shadow flex'>
                <div className='p-4 grid w-full gap-2'>
                {tableList.map((_, index) => (
                    <TableSkeleton key={index}/>
                ))}
                </div>
            </div>
        </div>
      ) : (
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
      )}
  
    </div>
  )
}

export default Page