"use client"
import { useSocket } from '@/context/SocketProvider';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const router = useRouter();
  const socket = useSocket()

  const handleOnSubmit = useCallback((e: any) => {
    e.preventDefault();
    socket.emit("room:join", {email, room});
  }, [email, room])

  const handleJoinRoom = useCallback((data:any) => {
    const {email, room} = data;
    console.log(email, room);
    router.push(`/room/${room}`)    
  }, [router])

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off('room:join', handleJoinRoom);
    }
  }, [socket])

  return (
    <div className='w-screen h-screen bg-gradient-to-r from-[#fbc2eb] to-[#a6c1ee] flex justify-center items-center'>
      <div className='w-full flex justify-center items-center flex-col gap-y-3'
      >
          <h2 className='text-4xl text-white'>Lobby</h2>
          <form onSubmit={handleOnSubmit}
            className='flex flex-col gap-y-4 w-[20%]'
          >
            <div className='relative'>
              <input 
                  type="email" 
                  id='email'
                  className=" text-black block px-2.5 pb-2.5 pt-4 w-full text-lg bg-transparent rounded-lg 
                  border border-gray-300 appearance-none dark:text-white dark:border-gray-600 
                  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                  placeholder=" " 
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />
              <label htmlFor="email"
                  className="absolute text-sm text-black dark:text-gray-400 duration-300 transform 
                  -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-blue-700 bg-transparent 
                  dark:bg-[#000814] px-2 peer-focus:px-2 peer-focus:text-black peer-focus:dark:text-blue-500 
                  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 
                  peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 
                  rtl:peer-focus:left-auto start-1"
              >
                  Email <sup>*</sup>
              </label>
          </div>

          <div className='relative'>
            <input 
                type="text" 
                id='room'
                className="block text-lg px-2.5 pb-2.5 pt-4 w-full text-black bg-transparent rounded-lg 
                border border-gray-300 appearance-none dark:text-white dark:border-gray-600 
                dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                placeholder=" " 
                onChange={(e) => setRoom(e.target.value)}
                required
            />
            <label htmlFor="room"
                className="absolute text-sm text-black dark:text-gray-400 duration-300 transform 
                -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-blue-700 bg-transparent 
                dark:bg-[#000814] px-2 peer-focus:px-2 peer-focus:text-black peer-focus:dark:text-blue-500 
                peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 
                peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 
                rtl:peer-focus:left-auto start-1"
            >
                Room Id <sup>*</sup>
            </label>
          </div>
          <button type='submit' className='border text-xl bg-white border-white hover:scale-95 transition-all duration-300 rounded-xl text-black py-2 px-3'>
            Join
          </button>
        </form>
      </div>
    </div>
  );
}

export default LobbyScreen;
