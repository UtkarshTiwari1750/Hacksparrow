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
    <div>
        <h2>Lobby</h2>
        <form onSubmit={handleOnSubmit}>
          <div>
            <label htmlFor="email">
              Email Id:
            </label>
            <input id="email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='border border-black'
            />
          </div>

          <div>
            <label htmlFor="room">Room Id:</label>
            <input id='room'
              type="text" 
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className='border border-black' 
            />
          </div>

          <button className='border border-black py-2 px-3'>
            Join
          </button>
        </form>
    </div>
  );
}

export default LobbyScreen;
