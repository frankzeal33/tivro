'use client'
import Title from "@/components/Title"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { useState } from "react";
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
import NotFound from "@/components/NotFound"
import { Label } from '@/components/ui/label'
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
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

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

const properties = [
  {
    id: 1,
    propertyName: '#PG1005',
    fullName: 'Reginald Pepple Junior',
    contact: '+234 282 458 88',
    email: 'info@cityvj.com',
    occupancyDate: 'Today at 02:30 PM',
    renewalDate: 'Today at 02:30 PM',
    status: 'due',
  }
]

export default function Page() {

  const router = useRouter()
  const [open, setOpen] = useState(false);
   const [activeTab, setActiveTab] = useState("Tenants");
   const [subscription, setSubscription] = useState(false);

  const handlePayment = (paymentMethod: string) => {
    if(paymentMethod === 'save-haven'){
      setSubscription(true)
      setOpen(false)
    }else if(paymentMethod === 'paystack'){
      setSubscription(true)
      setOpen(false)
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
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button>Fund Wallet</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="rounded-2xl p-0 w-[300px] gap-0">
                        <form>
                            <AlertDialogHeader className="bg-background-light rounded-t-2xl p-4 flex flex-row items-center justify-between gap-2">
                                <AlertDialogTitle className="text-sm">Fund wallet</AlertDialogTitle>
                                <AlertDialogCancel className='bg-background-light border-0 shadow-none'><X className='text-2xl'/></AlertDialogCancel>
                            </AlertDialogHeader>
                            <AlertDialogDescription className="w-full bg-light px-4 py-4 flex items-center justify-center gap-3">
                                <span className='grid gap-2 w-full'>
                                    <Label htmlFor="amount">Enter amount</Label>
                                    <Input id="amount" type="number" placeholder="Enter amount here" required />
                                </span>
                            </AlertDialogDescription>
                            <AlertDialogFooter className='flex items-center justify-center w-full gap-2 rounded-b-2xl bg-light border-t p-4'>
                                <AlertDialogAction className='w-full' onClick={() => setOpen(true)}>Make Payment</AlertDialogAction>
                            </AlertDialogFooter>
                        </form>
                    </AlertDialogContent>
                  </AlertDialog>
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

          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between gap-1 mt-7 mb-3">
              <TabsList className="grid grid-cols-2 bg-light border p-0 shadow-none w-[200px]">
                  <TabsTrigger value="Tenants" className='rounded-r-none data-[state=active]:bg-primary data-[state=active]:text-light'>Tenants</TabsTrigger>
                  <TabsTrigger value="Properties" className='rounded-l-none data-[state=active]:bg-primary data-[state=active]:text-light'>Properties</TabsTrigger>
              </TabsList>
              <SearchForm/>
            </div>
            
            <TabsContent value="Tenants">
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
                              <Link href={`/dashboard/tenant-management/tenant-info/${request.id}`}>
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
            </TabsContent>
            <TabsContent value="Properties">
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
                  properties.length !== 0 &&
                    (
                      <TableBody>
                        {properties.map((property, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium capitalize">
                              {property.propertyName}
                            </TableCell>
                            <TableCell className='capitalize'>
                              {property.fullName}
                            </TableCell>
                            <TableCell className='capitalize'>{property.contact}</TableCell>
                            <TableCell className='capitalize'>{property.email}</TableCell>
                            <TableCell className='capitalize'>{property.occupancyDate}</TableCell>
                            <TableCell className='capitalize'>{property.renewalDate}</TableCell>
                            <TableCell className='capitalize'><TenentStatus status={property.status}/></TableCell>
                            <TableCell className='capitalize text-center bg-muted/30'>
                                <Link href={`/dashboard/tenant-management/tenant-info/${property.id}`}>
                                    <Button variant={'ghost'}>View</Button>
                                </Link>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    )
                  }
                
              </Table>

              {properties.length === 0 &&
                <div className='flex flex-col items-center justify-center min-h-[58vh] w-full'>
                  <NotFound imageStyle='size-14' title='No Properties found' desc='You haven’t added any properties yet'/>
                </div>
              }

              {
                properties.length !== 0 &&
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
            </TabsContent>
          </Tabs>
        </div>

        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent className="rounded-2xl p-0 w-[300px] gap-0">
              <AlertDialogHeader className="bg-background-light rounded-t-2xl p-4 flex flex-row items-center justify-between gap-2">
              <AlertDialogTitle className="text-sm">Select payment method</AlertDialogTitle>
              <AlertDialogCancel className="bg-background-light border-0 shadow-none size-8 rounded-full">
                  <X className="size-6"/>
              </AlertDialogCancel>
              </AlertDialogHeader>
              <AlertDialogDescription className="bg-light rounded-b-2xl px-4 py-6 flex flex-col items-center justify-center gap-3">
                  <Button onClick={() => handlePayment('save-haven')} className="rounded-full p-2 min-h-16 min-w-[250px] flex items-center justify-between bg-background-light">
                  <span className="flex gap-2 items-center justify-center">
                      <span className="size-12 rounded-full bg-primary-foreground p-2 flex items-center justify-center">
                      <Image src={'/save-haven.png'} width={40} height={40} alt=""/>
                      </span>
                      <h4 className="text-accent-foreground font-semibold">Save Haven</h4>
                  </span>
                  <ChevronRight size={14} className="text-accent-foreground"/>
                  </Button>

                  <Button onClick={() => handlePayment('paystack')} className="rounded-full p-2 min-h-16 min-w-[250px] flex items-center justify-between bg-background-light">
                  <span className="flex gap-2 items-center justify-center">
                      <span className="size-12 rounded-full bg-primary-foreground p-2 flex items-center justify-center">
                      <Image src={'/paystack.png'} width={20} height={20} alt=""/>
                      </span>
                      <h4 className="text-accent-foreground font-semibold">Paystack</h4>
                  </span>
                  <ChevronRight size={14} className="text-accent-foreground"/>
                  </Button>
              </AlertDialogDescription>
          </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
