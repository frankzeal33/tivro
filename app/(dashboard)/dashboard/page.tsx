'use client'
import Title from "@/components/Title"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react"
import Image from "next/image"
import { BsFillLightningChargeFill } from "react-icons/bs";
import { HiBadgeCheck } from "react-icons/hi";
import { FaCircleCheck } from "react-icons/fa6";
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
import {
  Avatar,
  AvatarFallback
} from "@/components/ui/avatar"
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
import { Status } from "@/components/Status"

const requests = [
  {
    requestId: '#PG1005',
    fullName: 'Reginald Pepple Junior',
    phoneNo: '+234 282 458 88',
    email: 'info@cityvj.com',
    IdCheck: 'pending',
    creditCheck: 'pending',
    employmentCheck: 'pending',
    requestStatus: 'passed',
    date: 'Today at 02:30 PM'
  },
  {
    requestId: '#PG1005',
    fullName: 'Reginald Pepple Junior',
    phoneNo: '+234 282 458 88',
    email: 'info@cityvj.com',
    IdCheck: 'pending',
    creditCheck: 'failed',
    employmentCheck: 'pending',
    requestStatus: 'passed',
    date: 'Today at 02:30 PM'
  },
  {
    requestId: '#PG1005',
    fullName: 'Reginald Pepple Junior',
    phoneNo: '+234 282 458 88',
    email: 'info@cityvj.com',
    IdCheck: 'ongoing',
    creditCheck: 'pending',
    employmentCheck: 'failed',
    requestStatus: 'passed',
    date: 'Today at 02:30 PM'
  },
]

const data = [
  {
    plan: 'One-time plan',
    description: 'This will be used just used once',
    amount: 10000,
    features: ['One Verifications', 'Personality check provided','Work place checks provided', 'Credit score verifications provided', 'Employability checks provided']
  },
  {
    plan: 'Monthly plan',
    description: 'This will be used just used once',
    amount: 35000,
    features: ['Personality check provided', 'Work place checks provided', 'Credit score verifications provided', 'TivroAI', 'Employability checks provided']
  },
  {
    plan: 'Yearly plan',
    description: 'This will be used just used once',
    amount: 50000,
    features: ['Personality check provided', 'Work place checks provided', 'Credit score verifications provided', 'Employability checks provided', 'TivroAI']
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
        <Title title="Overview" desc="View and manage tenant verifications request"/>
        <div className="flex flex-col items-center justify-center w-full">
          {!subscription &&
            <div className={`flex flex-col gap-3 items-center justify-center max-w-96 text-center min-h-[70vh]`}>
                <Image src={"/empty1.png"} alt="" width={100} height={100} className="w-fit"/>
                <h1 className='text-xl font-semibold'>You’ve not made any requests yet</h1>
                <p className='text-ring'>Subscribe to a package to be able to make your first verification request</p>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button>Subscribe</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="rounded-2xl p-0 gap-0 min-w-[90%] lg:min-w-[70%] max-h-[75vh] overflow-y-scroll">
                    <AlertDialogHeader className="bg-background-light rounded-t-2xl p-4 flex flex-row items-center justify-between gap-2">
                      <AlertDialogTitle className="text-base">Subscribe to a package</AlertDialogTitle>
                      <AlertDialogCancel className="bg-background-light border-0 shadow-none size-8 rounded-full">
                        <X className="size-6"/>
                      </AlertDialogCancel>
                    </AlertDialogHeader>
                    <div>
                      <div className="bg-light p-4 shadow dark:border rounded-b-2xl">
                        <div className="grid md:grid-cols-3">
                          {data.map((item, index) => (
                            <div key={index} className={`flex flex-col gap-4 p-4 ${index === 0 ? 'border rounded-t-2xl md:rounded-l-2xl' : index === 1 ? 'border-x md:border-y' : 'border border-b-2xl md:rounded-r-2xl'}`}>
                              <div className="flex flex-col gap-1">
                                <div className="size-12 rounded-full bg-muted flex items-center justify-center">
                                  <HiBadgeCheck size={30} className="text-primary"/>
                                </div>
                                <h3 className="font-semibold">{item.plan}</h3>
                                <p className="text-ring text-sm">{item.description}</p>
                              </div>

                              <h3 className="font-bold text-2xl">₦{item.amount}</h3>

                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button>
                                    <BsFillLightningChargeFill size={14} className="text-primary-foreground"/>
                                    Subscribe
                                  </Button>
                                </AlertDialogTrigger>
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

                              <div className="space-y-2">
                                {item.features.map((feature, index) => (
                                  <div key={index} className="flex gap-1 items-start">
                                    <FaCircleCheck className="text-primary"/>
                                    <span className="text-xs">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                      </div>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
          }    
        </div>
      </div>
      

      {/* overview data */}
      {subscription && (
        <div>
          <div className="grid grid-col-1 lg:grid-cols-3 gap-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">10</CardTitle>
                <CardDescription className="flex items-center justify-between gap-1">
                  <span>Number of verifications</span>
                  <span className="rounded-full px-2 py-0.5 text-green-500 bg-green-500/30">One-time</span>
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">0</CardTitle>
                <CardDescription className="flex items-center justify-between gap-1">
                  <span>Total verification requested</span>
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">0</CardTitle>
                <CardDescription className="flex items-center justify-between gap-1">
                  <span>Completed verifications</span>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="flex items-center justify-between gap-2 w-full my-6">
            <SearchForm/>
            <Link href={'/dashboard/request-verification'}>
              <Button>
                <Plus/>
                Request verification
              </Button>
            </Link>
          </div>

          <div className="w-full p-2 rounded-2xl bg-light border min-h-[68vh] flex flex-col items-center justify-between">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted">
                  <TableHead className="rounded-tl-xl capitalize">Request ID</TableHead>
                  <TableHead className='capitalize'>Full name</TableHead>
                  <TableHead className='capitalize'>Email address</TableHead>
                  <TableHead className='capitalize'>ID check</TableHead>
                  <TableHead className='capitalize'>Credit check</TableHead>
                  <TableHead className='capitalize'>Employment check</TableHead>
                  <TableHead className='capitalize'>Request Status</TableHead>
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
                          {request.requestId}
                          <p className="text-muted-foreground text-xs">{request.date}</p>
                        </TableCell>
                        <TableCell className='capitalize'>
                          <div className="flex items-center">
                            <Avatar className="-mx-2">
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="ml-3">
                              {request.fullName}
                              <p className="text-muted-foreground text-xs">{request.phoneNo}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className='capitalize'>{request.email}</TableCell>
                        <TableCell className='capitalize'><Status status={request.IdCheck}/></TableCell>
                        <TableCell className='capitalize'><Status status={request.creditCheck}/></TableCell>
                        <TableCell className='capitalize'><Status status={request.employmentCheck}/></TableCell>
                        <TableCell className='capitalize'><Status status={request.requestStatus}/></TableCell>
                        <TableCell className='capitalize text-center bg-muted/30'>
                            <Link href={`/dashboard/certificates/${index}`}>
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
                <NotFound imageStyle='size-14' title='No requests found' desc='You haven’t added any requests yet'/>
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
