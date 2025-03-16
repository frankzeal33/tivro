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
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const requests = [
    {
        id: 1,
        title: 'Invoice',
        purpose: 'NEPA',
        role: 'Landlord',
        date: '14 Aug 2024, 3:34 PM',
    },
    {
        id: 1,
        title: 'Invoice',
        purpose: 'NEPA',
        role: 'Landlord',
        date: '14 Aug 2024, 3:34 PM',
    },
    {
        id: 1,
        title: 'Invoice',
        purpose: 'NEPA',
        role: 'Landlord',
        date: '14 Aug 2024, 3:34 PM',
    }
]

const Page = () => {
    const status = 'passed'
  return (
    <div className='my-container space-y-4'>
        <div  className='flex items-end justify-between gap-2'>
            <div>
                <Link href={'/dashboard/tenant-management'} className="text-sm mb-6 flex gap-1 items-center">
                    <ArrowLeft size={16} className="text-normal"/>
                    Back
                </Link>
                <h2 className='font-bold text-2xl'>Tenant information</h2>
                <p className='text-muted-foreground'>View new tenant details here</p>
            </div>
            <div className='flex gap-1'>
                <Button variant={'outline'} className='bg-light'><Plus/> Edit Profile</Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button>Send Invoice</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="rounded-2xl p-0 w-[300px] md:w-[500px] gap-0">
                        <form>
                            <AlertDialogHeader className="bg-background-light rounded-t-2xl p-4 flex flex-row items-center justify-between gap-2">
                                <AlertDialogTitle className="text-sm">Send invoice</AlertDialogTitle>
                                <AlertDialogCancel className='bg-background-light border-0 shadow-none'><X className='text-2xl'/></AlertDialogCancel>
                            </AlertDialogHeader>
                            <AlertDialogDescription className="w-full bg-light px-4 py-4 flex flex-col items-center justify-center gap-3">
                                <span className='grid gap-2 w-full'>
                                    <Label htmlFor="firstname" className='text-accent-foreground'>First name</Label>
                                    <Input id="firstname" className='bg-background-light' placeholder="Enter here" required disabled/>
                                </span>
                                <span className='grid gap-2 w-full'>
                                    <Label htmlFor="lastname" className='text-accent-foreground'>Last name</Label>
                                    <Input id="lastname" className='bg-background-light' placeholder="Enter here" required disabled/>
                                </span>
                                <span className='grid gap-2 w-full'>
                                    <Label htmlFor="Property-name" className='text-accent-foreground'>Property name</Label>
                                    <Input id="Property-name" placeholder="Enter here" required />
                                </span>
                                <span className='grid gap-2 w-full'>
                                    <Label htmlFor="Purpose" className='text-accent-foreground'>Purpose for invoice</Label>
                                    <Input id="Purpose" placeholder="Enter here" required />
                                </span>
                                <span className='grid gap-2 w-full'>
                                    <Label htmlFor="email" className='text-accent-foreground'>Email address</Label>
                                    <Input id="email" className='bg-background-light' placeholder="Enter here" required disabled />
                                </span>
                                <span className='grid gap-2 w-full'>
                                    <Label htmlFor="amount" className='text-accent-foreground'>Enter amount</Label>
                                    <Input id="amount" type="number" placeholder="Enter amount here" required />
                                </span>
                            </AlertDialogDescription>
                            <AlertDialogFooter className='flex items-center justify-center w-full gap-2 rounded-b-2xl bg-light border-t p-4'>
                                <AlertDialogAction className='w-full'>Send invoice</AlertDialogAction>
                            </AlertDialogFooter>
                        </form>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
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
                                <p className="text-sm font-medium leading-none">Occupancy date</p>
                                <p className="text-sm text-muted-foreground">22 Sep 2024</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium leading-none">Renewal date</p>
                                <p className="text-sm text-muted-foreground">22 Sep 2024</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium leading-none">Selected property</p>
                                <p className="text-sm text-muted-foreground">Sonoiki Estate</p>
                            </div>
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
                  <TableHead className="rounded-tl-xl capitalize">Title</TableHead>
                  <TableHead className='capitalize'>Purpose</TableHead>
                  <TableHead className='capitalize'>Role</TableHead>
                  <TableHead className='capitalize'>Date created</TableHead>
                </TableRow>
              </TableHeader>
              {
              requests.length !== 0 &&
                (
                  <TableBody>
                    {requests.map((request, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium capitalize">
                          {request.title}
                        </TableCell>
                        <TableCell className='capitalize'>
                          {request.purpose}
                        </TableCell>
                        <TableCell className='capitalize'>{request.role}</TableCell>
                        <TableCell className='capitalize'>{request.date}</TableCell>
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