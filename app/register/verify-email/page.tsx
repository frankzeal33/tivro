import { VerifyEmail } from "@/components/forms/VerifyEmail"
import OnBoarding from "@/components/OnBoarding"

export default function RegisterPage() {
  return (
    <OnBoarding image="/verify.png" formComponent={<VerifyEmail/>}/>
  )
}