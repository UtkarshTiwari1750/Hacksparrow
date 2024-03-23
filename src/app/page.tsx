"use client"
import React from 'react';
import Image from "next/image";
import HomeBg from "../assests/HomeBg.jpg"
import { useParams } from 'next/navigation';
import FeatureText from '@/components/FeatureText';
import FeatureText2 from '@/components/FeatureText2';
import Footer from '@/components/Footer';
const HomePage = () => {
  const params = useParams();
  console.log(params)
  return (
    <div className={` w-screen h-screen overflow-x-hidden bg-[#000814]`}>

      <div className=' bg-[#000814] text-white border-b border-white'>
        <div className='w-[1280px] mx-auto flex gap-x-6 items-center justify-between py-5 px-3'>
          <a href='/' className='text-2xl'>
            FusionFlow
          </a>
          <div className='flex gap-x-3 items-center text-xl pl-9 w-[40%] justify-between pr-40 mx-auto'>
            <a href='/' className='font-serif hover:scale-110 transition-all duration-300'>
              Home
            </a>
            <a href='/design' className='font-serif hover:scale-110 transition-all duration-300'>
              Design
            </a>
            <a href='/lobby' className='font-serif hover:scale-110 transition-all duration-300'>
              Conference
            </a>
          </div>
        </div>
      </div>

      <div className='text-white flex flex-col items-center w-11/12 max-w-[1080px] mx-auto text-center h-[100vh]
        gap-y-3 py-7 ' 
      >
        <h3 className='text-7xl font-serif font-bold mt-10'>Fusion Flow</h3>

        <p className='text-xl font-mono mt-6 '>
          A platform where users can collaborate on creative projects like writing stories, 
          composing music, or designing games. Contain features like shared workspaces, version control, real-time communication tools, and 
          community voting mechanisms to foster collaborative creativity and encourage user engagement.
        </p>

        <div className='mt-16 flex items-center gap-x-16'>
          <a href="/design"
            className='cursor-pointer py-2 px-3 bg-white text-black rounded-lg text-2xl font-semibold font-mono hover:scale-95 transition-all duration-300'
          >
            Design
          </a>

          <a href="/lobby"
            className='cursor-pointer py-2 px-3 bg-blue-800 text-white rounded-lg text-2xl font-semibold font-mono hover:scale-95 transition-all duration-300'
          >
            Conference
          </a>
        </div>

      </div>

      <FeatureText />

      <FeatureText2 />

      <Footer />
    </div>
  );
}

export default HomePage;
