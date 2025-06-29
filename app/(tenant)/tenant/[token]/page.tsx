"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Avatar,
  AvatarImage,
} from "@/components/ui/avatar"
import { useParams, useRouter } from "next/navigation"
import { FormEvent, useCallback, useEffect, useState } from "react"
import { axiosClient } from "@/GlobalApi"
import { toast } from "react-toastify"
import { Loader2 } from "lucide-react"
import { z } from "zod"
import { debounce } from "lodash"

const otpSchema = z.object({
  pin: z.string().min(6, "PIN must be 6 digits"),
})

const Page = () => {

  const router = useRouter()
  const params = useParams();
  const token = params.token as string;
  const [loading, setLoading] = useState(false)
  const [loadingOTPResend,  setLoadingOTPResend] = useState(false)
  const [pin, setPin] = useState("")
  const [error, setError] = useState<string>("")
  const [touched, setTouched] = useState(false)

   // Debounced validation
    const validateOtp = useCallback(
      debounce((value: string) => {
        const result = otpSchema.safeParse({ pin: value })
        if (!result.success) {
          const message = result.error.formErrors.fieldErrors.pin?.[0] || "Invalid input"
          setError(message)
        } else {
          setError("")
        }
      }, 300),
      []
    )

    useEffect(() => {
      if (touched) {
        validateOtp(pin)
      }
    }, [pin, touched, validateOtp])

  const storeToken = () => {
    localStorage.setItem("token", token)
  }

  useEffect(() => {
    if (!token) {
      router.replace("/")
    }else{
      storeToken()
    }
  }, [token])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const result = otpSchema.safeParse({ pin })

    if (!result.success) {
      const message = result.error.formErrors.fieldErrors.pin?.[0] || "Invalid input"
      setError(message)
      setTouched(true)
      return
    }

    setError("")

    try {
    
      setLoading(true)
      
      const response = await axiosClient.get(`/tenant/?token=${token}&pin=${pin}`)
      router.push('/tenant/start-verification')

    } catch (error: any) {
      toast.error(error.response?.data?.detail);
    } finally {
      setLoading(false)
    } 

  }

  const resendOTP = async () => {
    try {

      setLoadingOTPResend(true)
      
      // const response = await axiosClient.post("/bvn/resend/otp/", {bvn: BVN})
      // toast.success("Another PIN has been sent");

    } catch (error: any) {
      toast.error(error.response?.data?.message);
    } finally {
       setLoadingOTPResend(false)
    } 
  }
  

  return (
    <div className="tenant-container -mt-[4.5rem] lg:mt-0">
        <div className={cn("flex flex-col gap-6 items-center justify-center")}>
          <Card className="shadow-none max-w-96 p-0">
            <CardHeader className="text-center px-4 pt-4">
              <Avatar className='size-16 mx-auto'>
                  <AvatarImage src={'/photo.png'} alt="Tenant" />
              </Avatar>
              <CardTitle className="text-lg">Complete Tenant Verification</CardTitle>
              <CardDescription>
                Enter verification code sent to your email address
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="px-4 pb-4">
                <div>
                  <div className="grid gap-3">
                    <div>
                      <Input
                        type="number"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        onBlur={() => setTouched(true)}
                        placeholder="Enter pin"
                        className="text-center"
                      />
                    </div>
                    {touched && error && <p className="text-sm text-center text-red-500">{error}</p>}
                    <div className="text-center text-sm flex items-center justify-center gap-1">
                      Didn’t receive a code?{" "}
                      {loadingOTPResend ? (
                        <Loader2 className="animate-spin size-5 text-primary" />
                      ) : (
                        <Button type="button" onClick={resendOTP} className="p-0 text-primary" variant={'link'}>
                          Resend
                        </Button>
                      )}
                    </div>
                    <div>
                      <div className='w-full flex bg-muted gap-1 border border-l-primary border-l-6 rounded-md p-2'>
                        <p className='text-muted-foreground text-xs md:text-sm'>Once you begin the verification process, ensure you complete it in one go, as all information is saved as you progress.</p>  
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 border-t">
                <Button loading={loading} disabled={loading} type="submit" className="w-full">
                  {loading ? "Starting..." : "Begin Verification"}
                </Button>
              </CardFooter>
            </form>
            
          </Card>
      </div>
    </div>
  )
}

export default Page