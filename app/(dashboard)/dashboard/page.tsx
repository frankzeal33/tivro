'use client'
import Title from "@/components/Title"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Loader2, Plus, X } from "lucide-react"
import Image from "next/image"
import { BsFillLightningChargeFill } from "react-icons/bs";
import { HiBadgeCheck } from "react-icons/hi";
import { FaCircleCheck } from "react-icons/fa6";
import { useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loading } from "@/components/Loading"
import { toast } from "react-toastify"
import { axiosClient } from "@/GlobalApi"
import Skeleton from "@/components/Skeleton"
import TableSkeleton from "@/components/TableSkeleton"

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

type plansType = {
  title: string,
  description: string,
  verifications_provided: number,
  price: string,
  features: string[];
}

type overviewType = {
  Number_of_verification: number;
  Total_verification_requested: number;
  completed_verification: number;
  plan: string
  status: string
}

export default function Page() {

  const router = useRouter()
  const [subscription, setSubscription ] = useState(false)
  const [choosenSub, setChoosenSub] = useState<Partial<plansType>>({})
  const [openSubModal, setOpenSubModal] = useState(false);
  const [couponCode, setCouponCode] = useState("")
  const [showCouponInput, setShowCouponInput] = useState(false)
  const [loadingPlans, setLoadingPlans] = useState(false)
  const [submittingPayment, setSubmittingPayment] = useState(false)
  const [loadingPage, setLoadingPage] = useState(false)
  const [plansData, setPlansData] = useState<plansType[]>([
    {
        title: "Diamond",
        description: "Our basic gives you opportunity to verify",
        verifications_provided: 10,
        price: "10",
        features: ['One Verifications', 'Personality check provided','Work place checks provided', 'Credit score verifications provided', 'Employability checks provided']
    },
    {
        title: "Diamond",
        description: "Our basic gives you opportunity to verify",
        verifications_provided: 12,
        price: "100.00",
        features: ['Personality check provided', 'Work place checks provided', 'Credit score verifications provided', 'TivroAI', 'Employability checks provided']
    },
    {
        title: "Diamond",
        description: "Our basic gives you opportunity to verify",
        verifications_provided: 15,
        price: "100.00",
        features: ['Personality check provided', 'Work place checks provided', 'Credit score verifications provided', 'Employability checks provided', 'TivroAI']
    }
  ])
  const [subData, setSubData] = useState<Partial<overviewType>>({})
  const [openBVNModal, setOpenBVNModal] = useState(false)
  const [BVN, setBVN] = useState("")
  const [loadingBVN, setloadingBVN] = useState(false)
  const [sendingBVNOTP, setSendingBVNOTP] = useState(false)
  const [BVNOTP, setBVNOTP] = useState("")
  const [showOTPInput, setShowOTPInput] = useState(false)
  const [submittingOTP, setSubmittingOTP] = useState(false)
  const [submittingOTPResend, setSubmittingOTPResend] = useState(false)
  const arrayList = new Array(3).fill(null)
  const tableList = new Array(6).fill(null)

  const handleSubscription = () => {
    setOpenSubModal(true)
  }

  const getOverview = async () => {
  
    try {

      setLoadingPage(true)
      
      const response = await axiosClient.get("/dashboard/")
      setSubData(response.data || {})
      console.log(response.data)

    } catch (error: any) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoadingPage(false)
    } 
  }

  
  const getPlans = async () => {
  
    try {

      setLoadingPlans(true)
      
      const response = await axiosClient.get("/subscription/")
      // setPlansData(response.data || [])

    } catch (error: any) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoadingPlans(false)
    } 
  }

  useEffect(() => {
    getOverview()
    getPlans()
  }, [])

  const handlePayment = async (paymentMethod: string) => {

    const paymentData = {
      plan: choosenSub?.title,
      amount: choosenSub?.price,
      verifications_provided: choosenSub?.verifications_provided,
      coupon_code: couponCode
    }

    if(paymentMethod === 'flutterwave'){
      try {
          setSubmittingPayment(true)

          const result = await axiosClient.post("/flutterwave/payment/initiate/", paymentData)
          const paymentLink = result.data?.payment?.link;
          const couponMessage = result.data?.coupon?.message;

          if(couponMessage) {
            toast.info(couponMessage);
          }

          if (paymentLink) {
            window.location.href = paymentLink;
          } else {
            toast.error("No payment link received");
          }
  
      } catch (error: any) {
          toast.error(error.response?.data?.message);
  
      } finally {
          // setSubmittingPayment(false)
      }
    }else if(paymentMethod === 'nomba'){
       try {
          setSubmittingPayment(true)

          const result = await axiosClient.post("/nomba/payment/initiate/", paymentData)
          const paymentLink = result.data?.payment?.link;
          const couponMessage = result.data?.coupon?.message;

          if(couponMessage) {
            toast.info(couponMessage);
          }

          if (paymentLink) {
            window.location.href = paymentLink;
          } else {
            toast.error("No payment link received");
          }
  
      } catch (error: any) {
          toast.error(error.response?.data?.message);
  
      } finally {
          // setSubmittingPayment(false)
      }
    }
  }

  const requestVerification = () => {
    setOpenBVNModal(true)
    // router.push("'/dashboard/request-verification'")
  }

  const sendBVNOTP = async () => {
     try {

      setSendingBVNOTP(true)
      
      const response = await axiosClient.post("/request/bvn/", {bvn: BVN})
      toast.success(response.data?.message);
      setShowOTPInput(true)

    } catch (error: any) {
      if(error.response?.data?.message === "NOT NULL constraint failed: Verifications_verificationdata.email"){
        toast.error("BVN assigned to a user, Please contact support");
      }else{
        toast.error(error.response?.data?.message);
      }
    } finally {
      setSendingBVNOTP(false)
    } 
  }

  const verifyBVNOTP = async () => {
     try {

      setSubmittingOTP(true)
      
      const response = await axiosClient.post("/verify/bvn/otp/", {token: BVNOTP})
      toast.success(response.data?.message);
      setBVN("")
      setOpenBVNModal(false)

    } catch (error: any) {
      toast.error(error.response?.data?.message);
    } finally {
      setSubmittingOTP(false)
    } 
  }

  const resendBVNOTP = async () => {
    try {

      setSubmittingOTPResend(true)
      
      const response = await axiosClient.post("/bvn/resend/otp/", {bvn: BVN})
      toast.success(response.data?.message);

    } catch (error: any) {
      toast.error(error.response?.data?.message);
    } finally {
      setSubmittingOTPResend(false)
    } 
  }

  return (
    <div>
      <Title title="Overview" desc="View and manage tenant verifications request"/>
      {loadingPage ? (
        <div>
          <div className="grid grid-col-1 lg:grid-cols-3 gap-2">
            {arrayList.map((_, index) => (
              <Skeleton key={index} />
            ))}
          </div>
          <div className="mt-8">
            <div className='w-full h-72 bg-white rounded-sm shadow flex'>
              <div className='p-4 grid w-full gap-2'>
                {tableList.map((_, index) => (
                  <TableSkeleton key={index}/>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <div className="flex flex-col items-center justify-center w-full">
              {Object.keys(subData).length === 0 &&
                <div className={`flex flex-col gap-3 items-center justify-center max-w-96 text-center min-h-[70vh]`}>
                    <Image src={"/empty1.png"} alt="" width={100} height={100} className="w-fit"/>
                    <h1 className='text-xl font-semibold'>You’ve not made any requests yet</h1>
                    <p className='text-ring'>Subscribe to a package to be able to make your first verification request</p>
                    {/* coupon */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button>Subscribe</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="rounded-2xl p-0 gap-0 w-[300px] max-h-[75vh] overflow-y-auto">
                        <AlertDialogHeader className="bg-background-light rounded-t-2xl p-4 flex flex-row items-center justify-between gap-2">
                          <AlertDialogTitle className="text-base">Coupon Code</AlertDialogTitle>
                          <AlertDialogCancel onClick={() => {setShowCouponInput(false); setCouponCode("")}} className="bg-background-light border-0 shadow-none size-8 rounded-full">
                            <X className="size-6"/>
                          </AlertDialogCancel>
                        </AlertDialogHeader>
                        <div>
                          <div className="bg-light p-4 shadow dark:border rounded-b-2xl">
                            {showCouponInput ? (
                              <div>
                                <div className="grid gap-2 mb-5">
                                  <Label htmlFor="code">Enter Coupon Code</Label>
                                  <Input id="code" type="number" value={couponCode} onChange={(e: any) => setCouponCode(e.target.value)} placeholder="Enter code here" />
                                </div>
                                <div className="w-full flex items-center justify-center">
                                  <Button disabled={couponCode.length < 3} onClick={handleSubscription}>Continue</Button>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <h3 className="font-semibold">Do you have a coupon code?</h3>
                                <div className="w-full flex items-center justify-center gap-4 mt-4">
                                  <Button onClick={() => setShowCouponInput(true)}>Yes</Button>
                                  <Button onClick={handleSubscription}>No</Button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </AlertDialogContent>
                    </AlertDialog>
                    {/* subscribe */}
                    <AlertDialog open={openSubModal} onOpenChange={setOpenSubModal}>
                      {/* <AlertDialogTrigger asChild>
                        <Button>Subscribe</Button>
                      </AlertDialogTrigger> */}
                      <AlertDialogContent className="rounded-2xl p-0 gap-0 min-w-[90%] lg:min-w-[70%] max-h-[75vh] overflow-y-auto">
                        <AlertDialogHeader className="bg-background-light rounded-t-2xl p-4 flex flex-row items-center justify-between gap-2">
                          <AlertDialogTitle className="text-base">Subscribe to a package</AlertDialogTitle>
                          <AlertDialogCancel className="bg-background-light border-0 shadow-none size-8 rounded-full">
                            <X className="size-6"/>
                          </AlertDialogCancel>
                        </AlertDialogHeader>
                        <div>
                          <div className="bg-light p-4 shadow dark:border rounded-b-2xl w-full">
                            {loadingPlans ? (
                              <div className="flex w-full items-center justify-center min-h-[50vh]">
                                <Loading/>
                              </div>
                            ) : plansData.length === 0 ? (
                              <div className='flex flex-col items-center justify-center min-h-[50vh] w-full'>
                                <NotFound imageStyle='size-8' title='No plans found' desc='Please try again later'/>
                              </div>
                            ) : (
                              <div className="grid md:grid-cols-3">
                                {plansData.map((item, index) => (
                                  <div key={index} className={`flex flex-col gap-4 p-4 ${index === 0 ? 'border rounded-l-2xl md:rounded-l-2xl' : index === 1 ? 'border-x md:border-y' : 'border border-b-2xl md:rounded-r-2xl'}`}>
                                    <div className="flex flex-col gap-1">
                                      <div className="size-12 rounded-full bg-muted flex items-center justify-center">
                                        <HiBadgeCheck size={30} className="text-primary"/>
                                      </div>
                                      <h3 className="font-semibold">{item?.title}</h3>
                                      <p className="text-ring text-sm">{item?.description}</p>
                                    </div>

                                    <h3 className="font-bold text-2xl">₦{item?.price}</h3>
                                    {/* payment gateway */}
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button onClick={() => setChoosenSub(item)}>
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
                                            {submittingPayment ? (
                                              <span className="w-full min-h-[100px] flex items-center justify-center">
                                                <Loader2 className="animate-spin size-10 text-primary" />
                                              </span>
                                            ) : (
                                              <>
                                                <Button onClick={() => handlePayment('flutterwave')} className="rounded-full p-2 min-h-16 min-w-[250px] flex items-center justify-between bg-background-light">
                                                  <span className="flex gap-2 items-center justify-center">
                                                    <span className="size-12 rounded-full bg-primary-foreground p-2 flex items-center justify-center">
                                                    <Image src={'/flutterwave.png'} width={40} height={40} alt=""/>
                                                    </span>
                                                    <h4 className="text-accent-foreground font-semibold">Flutterwave</h4>
                                                  </span>
                                                  <ChevronRight size={14} className="text-accent-foreground"/>
                                                </Button>

                                                <Button onClick={() => handlePayment('nomba')} className="rounded-full p-2 min-h-16 min-w-[250px] flex items-center justify-between bg-background-light">
                                                  <span className="flex gap-2 items-center justify-center">
                                                    <span className="size-12 rounded-full bg-primary-foreground p-2 flex items-center justify-center">
                                                    <Image src={'/nomba.png'} width={20} height={20} alt=""/>
                                                    </span>
                                                    <h4 className="text-accent-foreground font-semibold">Nomba</h4>
                                                  </span>
                                                  <ChevronRight size={14} className="text-accent-foreground"/>
                                                </Button>
                                              </>
                                            )}
                                        </AlertDialogDescription>
                                      </AlertDialogContent>
                                    </AlertDialog>

                                    <div className="space-y-2">
                                      {item?.features.map((feature, index) => (
                                        <div key={index} className="flex gap-1 items-start">
                                          <FaCircleCheck className="text-primary"/>
                                          <span className="text-xs">{feature}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                          </div>
                        </div>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
              }    
            </div>
          </div>
      

        {/* overview data */}
        {Object.keys(subData).length !== 0 && (
          <div>
            <div className="grid grid-col-1 lg:grid-cols-3 gap-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{subData?.Number_of_verification}</CardTitle>
                  <CardDescription className="flex items-center justify-between gap-1">
                    <span>Number of verifications</span>
                    <span className="rounded-full px-2 py-0.5 text-green-500 bg-green-500/30">{subData?.plan}</span>
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{subData?.Total_verification_requested}</CardTitle>
                  <CardDescription className="flex items-center justify-between gap-1">
                    <span>Total verification requested</span>
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{subData?.completed_verification}</CardTitle>
                  <CardDescription className="flex items-center justify-between gap-1">
                    <span>Completed verifications</span>
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="flex items-center justify-between gap-2 w-full my-6">
              <SearchForm/>
              <Button loading={loadingBVN} disabled={loadingBVN} onClick={requestVerification}>
                <Plus/>
                {loadingBVN ? "Loading..." : "Request verification"}
              </Button>
            </div>

            <AlertDialog open={openBVNModal} onOpenChange={setOpenBVNModal}>
              <AlertDialogContent className="rounded-2xl p-0 gap-0 w-[300px] max-h-[75vh] overflow-y-auto">
                <AlertDialogHeader className="bg-background-light rounded-t-2xl p-4 flex flex-row items-center justify-between gap-2">
                  <AlertDialogTitle className="text-base">Verify your BVN</AlertDialogTitle>
                  <AlertDialogCancel onClick={() => {setShowCouponInput(false); setCouponCode("")}} className="bg-background-light border-0 shadow-none size-8 rounded-full">
                    <X className="size-6"/>
                  </AlertDialogCancel>
                </AlertDialogHeader>
                <div>
                  {showOTPInput ? (
                    <div className="bg-light p-4 shadow dark:border rounded-b-2xl">
                      <div>
                        <p className="mb-3 text-sm text-accent-foreground">An OTP was sent to your BVN-linked phone number to verify your BVN.</p>
                        <div className="grid gap-2 mb-5">
                          <Label htmlFor="bvn">Enter the OTP</Label>
                          <Input id="bvn" type="number" value={BVNOTP} onChange={(e: any) => setBVNOTP(e.target.value)} placeholder="Enter OTP here" />
                          <span className='text-center text-sm'>Didn’t receive a code? <Button variant={'link'} onClick={resendBVNOTP} className='p-0 text-primary font-medium'>Resend</Button></span>
                        </div>
                        <div className="w-full flex items-center justify-center">
                          <Button disabled={BVNOTP.length < 6 || submittingOTP} loading={sendingBVNOTP} onClick={verifyBVNOTP}>
                            {submittingOTP ? "Verifying..." : "Verify"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-light p-4 shadow dark:border rounded-b-2xl">
                      <div>
                        <div className="grid gap-2 mb-5">
                          <Label htmlFor="bvn">Enter BVN</Label>
                          <Input id="bvn" type="number" value={BVN} onChange={(e: any) => setBVN(e.target.value)} placeholder="Enter BVN here" />
                        </div>
                        <div className="w-full flex items-center justify-center">
                          <Button disabled={BVN.length < 11 || sendingBVNOTP} loading={sendingBVNOTP} onClick={sendBVNOTP}>
                            {sendingBVNOTP ? "Verifying..." : "Continue"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </AlertDialogContent>
            </AlertDialog>

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
      )}
    </div>
  )
}
