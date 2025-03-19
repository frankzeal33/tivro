import Image from "next/image"
import { ReactElement } from "react"
import Link from "next/link";

export default function OnBoarding({formComponent, image}: {formComponent: ReactElement; image: string}) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex gap-2 max-w-sm w-full items-center mx-auto">
          <Link href={'/'} className="flex items-center gap-2 font-medium">
              <Image src={'/logo.png'} width={100} height={70} alt="" className="w-fit"/>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            {formComponent}
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          width={1000}
          height={1000}
          src={image}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
