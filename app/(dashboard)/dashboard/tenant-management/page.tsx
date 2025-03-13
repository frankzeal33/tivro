'use client'
import Title from "@/components/Title"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import NotFound from "@/components/NotFound"
import { useRouter } from "next/navigation"
import { SearchForm } from "@/components/sidebar/search-form"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import { TenentStatus } from "@/components/TenantStatus"

const requests = [
  {
    id: 1,
    propertyName: '#PG1005',
    fullName: 'Reginald Pepple Junior',
    contact: '+234 282 458 88',
    email: 'info@cityvj.com',
    occupancyDate: 'Today at 02:30 PM',
    renewalDate: 'Today at 02:30 PM',
    status: 'due',
  },
  {
    id: 2,
    propertyName: '#PG1005',
    fullName: 'Reginald Pepple Junior',
    contact: '+234 282 458 88',
    email: 'info@cityvj.com',
    occupancyDate: 'Today at 02:30 PM',
    renewalDate: 'Today at 02:30 PM',
    status: 'evicted',
  },
  {
    id: 3,
    propertyName: '#PG1005',
    fullName: 'Reginald Pepple Junior',
    contact: '+234 282 458 88',
    email: 'info@cityvj.com',
    occupancyDate: 'Today at 02:30 PM',
    renewalDate: 'Today at 02:30 PM',
    status: 'active',
  },
]

export default function Page() {

  const router = useRouter()
  const [subscription, setSubscription ] = useState(false)

  const handlePayment = (paymentMethod: string) => {
    if(paymentMethod === 'save-haven'){
      setSubscription(true)
    }else if(paymentMethod === 'paystack'){
      setSubscription(true)
    }
  }

  return (
    <div>
      <div>
        <Title title="Tenant Management" desc="View and manage tenant seamlessly with ease">
            <div className="flex gap-2">
                <Link href={'/dashboard/tenant-management/new-property'}>
                    <Button variant={'outline'}>Add Property</Button>
                </Link>
               
                <Link href={'/dashboard/tenant-management/new-tenant'}>
                    <Button>Add Tenant</Button>
                </Link>
            </div>
        </Title>
      </div>
      
        <div>
          <div className="grid grid-col-1 lg:grid-cols-3 gap-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">$100,000</CardTitle>
                <CardDescription className="flex items-center justify-between gap-1">
                  <span>Wallet balance</span>
                  <Button>Fund Wallet</Button>
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">0</CardTitle>
                <CardDescription className="flex items-center justify-between gap-1">
                  <span>Total number of tenants</span>
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">0</CardTitle>
                <CardDescription className="flex items-center justify-between gap-1">
                  <span>Total number of properties</span>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="flex items-center justify-between gap-2 w-full my-6">
            <div className="flex gap-1">
                <Button>Tenants</Button>
                <Button variant={'outline'}>Properties</Button>
            </div>
            <SearchForm/>
          </div>

          <div className="w-full p-2 rounded-2xl bg-light border min-h-[68vh] flex flex-col items-center justify-between">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted">
                  <TableHead className="rounded-tl-xl capitalize">Property name</TableHead>
                  <TableHead className='capitalize'>Full name</TableHead>
                  <TableHead className='capitalize'>Contact</TableHead>
                  <TableHead className='capitalize'>Email</TableHead>
                  <TableHead className='capitalize'>Occupancy date</TableHead>
                  <TableHead className='capitalize'>Renewal date</TableHead>
                  <TableHead className='capitalize'>Status</TableHead>
                  <TableHead className="rounded-tr-2xl capitalize">Action</TableHead>
                </TableRow>
              </TableHeader>
              {
              requests.length !== 0 &&
                (
                  <TableBody>
                    {requests.map((request, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium capitalize">
                          {request.propertyName}
                        </TableCell>
                        <TableCell className='capitalize'>
                          {request.fullName}
                        </TableCell>
                        <TableCell className='capitalize'>{request.contact}</TableCell>
                        <TableCell className='capitalize'>{request.email}</TableCell>
                        <TableCell className='capitalize'>{request.occupancyDate}</TableCell>
                        <TableCell className='capitalize'>{request.renewalDate}</TableCell>
                        <TableCell className='capitalize'><TenentStatus status={request.status}/></TableCell>
                        <TableCell className='capitalize text-center bg-muted/30'>
                            <Link href={`/dashboard/certificates/${request.id}`}>
                                <Button variant={'ghost'}>View</Button>
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
                <NotFound imageStyle='size-14' title='No requests found' desc='You haven’t added any tenants yet'/>
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
