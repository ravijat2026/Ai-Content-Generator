import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutTemplate } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <div className="flex h-14 bg-gray-200 w-full items-center justify-between p-4">
          <div className='flex items-center justify-center'>
            <Image src = {'/logo.svg'} alt='logo' width={60} height={20} /> <p className="pl-3 text-primary font-bold text-[20px]">AI-Magic</p>
          </div>

          <Link href = {'/dashboard'}>
          <Button>Dashboard</Button>
          </Link>
        </div>
    
        <div>
        
        <div className="mt-24 text-center mb-8">
          <div className="flex flex-col gap-3 items-center justify-center m-4">
              <h1 className="font-extrabold text-primary text-[28px] md:text-[36px]">AI Content Generator</h1>
              <p className="mt-3 text-gray-700 md:text-lg text-[16px]">Revolutionize your content creation with our AI-powered app, delivering engaging and  high-quality text in seconds.</p>
              
             

              <div className="mt-4 flex items-center">
              <Link href = {'/dashboard'}><Button>Get Started <ArrowRight size={22}/></Button></Link>
                
              </div>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="flex flex-col gap-6 m-4 items-center justify-center bg-gray-200 p-6">
                  <LayoutTemplate size={40} />
                  <h2 className=" mt-2 font-extrabold text-[20px] ">20+ templates</h2>
                  <p>Responsive and mobile-first project on the web.</p>
              </div>
              <div className="flex flex-col gap-6 m-4 items-center justify-center bg-gray-200 p-6">
                  <LayoutTemplate size={40} />
                  <h2 className="mt-2 font-extrabold text-[20px]">Customizable</h2>
                  <p>Components are easily customized and extendable.</p>
              </div>
              <div className="flex flex-col gap-6 m-4 items-center justify-center bg-gray-200 p-6">
                  <LayoutTemplate size={40} />
                  <h2 className="mt-2 font-extrabold text-[20px]">Free to Use</h2>
                  <p>Every component and plugin is well documented.</p>
              </div>
              <div className="flex flex-col gap-6 m-4 items-center justify-center bg-gray-200 p-6">
                  <LayoutTemplate size={40} />
                  <h2 className="mt-2 font-extrabold text-[20px]">24/7 Support</h2>
                  <p>Contact us 24 hours a day, 7 days a week.</p>
              </div>
          </div>

        </div>

        <div className="text-center border-t-2 p-6">@2024 All Rights Reserved.</div>
        
    </div>
    </>
  );
}
