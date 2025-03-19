"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Avatar,
  AvatarImage,
} from "@/components/ui/avatar"
import { useEffect, useState } from "react"
import RequestDetails from "@/components/tenant-forms/RequestDetails"
import IdentityCheck from "@/components/tenant-forms/IdentityCheck"
import CreditCheck from "@/components/tenant-forms/CreditCheck"
import EmploymentCheck from "@/components/tenant-forms/EmploymentCheck"
import VerifyApartment from "@/components/tenant-forms/VerifyApartment"
import Certificates from "@/components/tenant-forms/Certificates"
import { Progress } from "@/components/ui/progress"


const runSections = [
  {
    section: "Begin tenant verification",
    desc: "Confirm request details",
    completed: true,
    iscurrentForm: false
  },
  {
    section: "identity-check",
    desc: "",
    completed: false,
    iscurrentForm: true
  },
  {
    section: "credit-check",
    desc: "",
    completed: false,
    iscurrentForm: false
  },
  {
    section: "employment-check",
    desc: "",
    completed: false,
    iscurrentForm: false
  },
  {
    section: "verify-apartment",
    desc: "",
    completed: false,
    iscurrentForm: false
  },
  {
    section: "certificates",
    desc: "",
    completed: false,
    iscurrentForm: false
  }
];

const Page = () => {

  
  const [currentSection, setCurrentSection] = useState('');
  const [sections, setSections] = useState<any>([])

  useEffect(() => {
    setSections(runSections)
    setCurrentSection(runSections[0].section)
  }, [runSections])
  

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
  };

  const renderStages = () => {
    switch (currentSection) {
      case "Begin tenant verification":
        return <RequestDetails />;
      case "identity-check":
        return <IdentityCheck />;
      case "credit-check":
        return <CreditCheck />;
      case "employment-check":
        return <EmploymentCheck />;
      case "verify-apartment":
        return <VerifyApartment />;
      case "certificates":
        return <Certificates />;
    }
  };

  return (
    <div className="tenant-container">
        <div className="fixed w-full p-4 bg-light border-b top-[4rem] right-0 left-0 lg:hidden">
          <div className="flex items-center justify-between gap-2 mb-2">
            <p className="text-ring">Step 1/6</p>
            <h4>Begin tenant verification</h4>
          </div>
          <Progress value={33} className="w-full" />
        </div>
        <div className={cn("grid lg:grid-cols-2 gap-6 items-start justify-center")}>
          <Card className="hidden lg:flex flex-col shadow-none max-w-80 p-4 gap-1">
            {sections.map((item: any, index: number) => (
                <div className="flex gap-2" key={index}>
                  <div className="flex flex-col gap-0.5 items-center">
                    <div className={`size-8 rounded-full flex items-center justify-center ${item.iscurrentForm && 'bg-primary/10'}`}>
                      <div className={`size-6 rounded-full border-2 flex items-center justify-center ${item.iscurrentForm ? 'bg-primary border-primary' : item.completed ? 'bg-light border-primary' : 'bg-light border-gray'}`}>
                          <div className={`size-2 rounded-full  ${item.iscurrentForm ? 'bg-light' : item.completed ? 'bg-primary' : 'bg-gray'}`}></div>
                      </div>
                    </div>
                    {index !== sections.length -1 && (
                      <div className={`h-10 w-0.5 ${item.completed ? 'bg-primary' : 'bg-gray'}`}></div>
                    )}
                  </div>
                  <div>
                      <h3 className={`font-medium text-base ${item.iscurrentForm ? 'text-primary' : item.completed ? 'text-primary' : 'text-disabled'}`}>{item.section}</h3>
                      <p className={`text-sm font-light ${item.completed ? 'text-accent-foreground' : 'text-disabled'}`}>{item.desc}</p>
                  </div>
                </div>
            ))}
          </Card>
          <Card className="shadow-none max-w-96 p-0">
            {renderStages()}
          </Card>
      </div>
    </div>
  )
}

export default Page