import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutTemplate } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import bgImage from "@/public/bgImage.png"

export default function Home() {
  return (
    <>
    <div className="flex h-14 bg-gray-50 w-full items-center justify-between p-4">
          <div className='flex items-center justify-center'>
             <p className="pl-3 text-xl md:text-2xl text-red-700 font-extrabold">QueryMaster</p>
          </div>
      <div className=" flex items-center gap-4 w-50">
          <Link href = {'/dashboard'}>
            <Button className="hover:scale-105">Sign In</Button>
            <Button className="hidden md:inline-flex hover:scale-105 ml-3">Sign Up</Button>
          </Link>
      </div>
          
        </div>
    
      <div>
        
        <div className="mt-24 text-center mb-8">
          <div className="flex flex-col gap-3 items-center justify-center m-4">
              <h1 className="font-extrabold text-gray-800 text-[20px] md:text-[28px]">Boost Your Content Creation with Ease and Precision! </h1>
              <p className="mt-3 text-center md:ml-36 md:mr-36 text-gray-700 md:text-lg text-[16px]">
              Generate high-quality content effortlessly. With customizable templates, real-time analytics, and flexible subscription options, you'll have everything you need to elevate your content strategy. Get started and see the difference!</p>
              

              <div className="mt-4 flex items-center">
              <Link href = {'/dashboard'}><Button className="hover:scale-105">Get Started <ArrowRight size={22}/></Button></Link>
                
              </div>
             
              <div className="h-[450px] w-[1200px] relative">
                <Image
                  alt="bgImage"
                  src={bgImage}
                 layout="fill"
                  objectFit="contain" // Ensures the image fits within the container
                />
              </div>

              
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="flex flex-col gap-6 m-4 items-center justify-center hover:scale-105 cursor-pointer transition-all bg-gray-50 p-6">
                  <LayoutTemplate size={40} />
                  <h2 className=" mt-2 font-extrabold text-[20px] ">20+ templates</h2>
                  <p>Responsive and mobile-first project on the web.</p>
              </div>
              <div className="flex flex-col gap-6 m-4 items-center justify-center hover:scale-105 cursor-pointer transition-all bg-gray-50 p-6">
                  <LayoutTemplate size={40} />
                  <h2 className="mt-2 font-extrabold text-[20px]">Customizable</h2>
                  <p>Components are easily customized and extendable.</p>
              </div>
              <div className="flex flex-col gap-6 m-4 items-center justify-center hover:scale-105 cursor-pointer transition-all bg-gray-50 p-6">
                  <LayoutTemplate size={40} />
                  <h2 className="mt-2 font-extrabold text-[20px]">Free to Use</h2>
                  <p>Every component and plugin is well documented.</p>
              </div>
              <div className="flex flex-col gap-6 m-4 items-center justify-center hover:scale-105 cursor-pointer transition-all bg-gray-50 p-6">
                  <LayoutTemplate size={40} />
                  <h2 className="mt-2 font-extrabold text-[20px]">24/7 Support</h2>
                  <p>Contact us 24 hours a day, 7 days a week.</p>
              </div>
          </div>

        </div>

        <div className="text-center border-t-2 p-6">
          © {new Date().getFullYear()} All Rights Reserved.
        </div>
        
    </div>
    </>
  );
}
