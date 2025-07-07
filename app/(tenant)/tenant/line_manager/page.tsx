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
import { useTenantStore } from "@/store/TenantStore"


const Page = () => {

  const router = useRouter()
  const params = useParams();
  const token = params.token as string;
  const [loading, setLoading] = useState(false)

  const tenantInfo = useTenantStore((state) => state.setTenantInfo)

   // Debounced validation
   

  useEffect(() => {
    // if (!token) {
    //   router.replace("/")
    // }
  }, [token])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // try {
    
    //   setLoading(true)
      
    //   const response = await axiosClient.get(`/tenant/?token=${token}&pin=${pin}`)

    //   if(response.data?.status === 500){
    //     toast.error(response.data?.message)
    //   }else{
    //     tenantInfo(response.data)
    //     toast.success("Verification Started")
    //     router.push('/tenant/start-verification')
    //   }

    // } catch (error: any) {
    //   toast.error(error.response?.data?.detail);
    // } finally {
    //   setLoading(false)
    // } 

  }
  
  return (
    <div className="tenant-container -mt-[4.5rem] lg:mt-0">
        <div className={cn("flex flex-col gap-6 items-center justify-center")}>
          <Card className="shadow-none max-w-96 p-0">
            <CardHeader className="text-center px-4 pt-4">
              <Avatar className='size-16 mx-auto'>
                  <AvatarImage src={'/photo.png'} alt="Tenant" />
              </Avatar>
              <CardTitle className="text-lg">Line Manager Verification</CardTitle>
              <CardDescription>
                Confirm that you are the line manager of this tenant.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              
              <CardFooter className="flex gap-5 p-4 border-t items-center justify-center">
                <Button loading={loading} disabled={loading} type="submit">
                  {loading ? "Loading..." : "Yes"}
                </Button>
                <Button loading={loading} disabled={loading} type="submit">
                  {loading ? "Loading..." : "No"}
                </Button>
              </CardFooter>
            </form>
            
          </Card>
      </div>
    </div>
  )
}

export default Page