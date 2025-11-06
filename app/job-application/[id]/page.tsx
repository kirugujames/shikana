"use client"
import { ApplicationForm } from "@/components/application-form";
import { useParams } from "next/navigation";


export default function JobapplicationPage() {
 const routeData = useParams()
 const id = routeData?.id;
 console.log(id)
 
  return (
    <main className="w-full">
      <ApplicationForm id={id}/>
    </main>
  )
}