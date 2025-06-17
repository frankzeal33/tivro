import { NewPasswordForm } from "@/components/forms/NewPasswordForm"
import OnBoarding from "@/components/OnBoarding"

export default function NewPassword() {
  return (
    <OnBoarding image="/new-password.png" formComponent={<NewPasswordForm/>}/>
  )
}