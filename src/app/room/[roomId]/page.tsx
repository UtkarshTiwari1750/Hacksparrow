"use client"
import { useSocket } from '@/context/SocketProvider';
import React, { useCallback, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import peer from "../../../service/peer";
const RoomPage = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();

  const handleUserJoined = useCallback(({email, id}:{email: any, id: any}) => {
    console.log(`Email ${email} joined room`)
    setRemoteSocketId(id);
  }, [])

  const handleCallUser = useCallback(async() => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    })

    const offer = await peer.getOffer();
    socket.emit("user:call", {to: remoteSocketId, offer})
    setMyStream(stream);
  }, [remoteSocketId, socket])

  const handleIncommingCall = useCallback(async ({from , offer}) => {
    console.log("INSIDE INCOMMING CALL");
    setRemoteSocketId(from )
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    })
    setMyStream(stream);
    console.log("INCOMMING CALL", from , offer);
    const ans = await peer.getAnswer(offer);
    socket.emit('call:accepted', {to: from, ans})
  }, [socket])

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream])

  const handleCallAccepted = useCallback((from, ans ) => {
    peer.setLocalDescription();
    console.log("Call Accepted");  
    sendStreams()  
  }, [sendStreams]);

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit('peer:nego:needed', {offer, to: remoteSocketId})
  }, [])

  useEffect(() => {
    peer.peer.addEventListener('negotiationneeded',handleNegoNeeded);
    return() => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded)
    }
  }, [handleNegoNeeded])

  const handleNegoNeedIncomming = useCallback(async({from, offer}) => {
    const ans = await peer.getAnswer(offer);
    socket.emit("peer:nego:done", {to: from, ans})
  }, [socket])

  useEffect(() => {
    peer.peer.addEventListener('track', async e => {
      const remoteStream = e.streams;
      setRemoteStream(remoteStream[0]);
    })
  })

  const  handleNegoNeedFinal = useCallback(async({ans}) => {
    await peer.setLocalDescription(ans);
  },[])
  useEffect(() => {
    socket.on('user:joined', handleUserJoined);
    socket.on('incomming:call', handleIncommingCall);
    socket.on('call:accepted', handleCallAccepted);
    socket.on('peer:nego:needed', handleNegoNeedIncomming)
    socket.on('peer:nego:needed', handleNegoNeedFinal)
    
    return () => {
      socket.off('user:joined', handleUserJoined);
      socket.off('incomming:call', handleIncommingCall);
      socket.off('call:accepted', handleCallAccepted);
      socket.off('peer:nego:needed', handleNegoNeedIncomming)
      socket.off('peer:nego:needed', handleNegoNeedFinal)
    }
  }, [socket, handleUserJoined, handleIncommingCall]);

  return (
    <div>
      <h2>
        Room
      </h2>

      <p>
        {remoteSocketId ? "Connected": "No on in Room"}
      </p>
      {myStream && <button onClick={sendStreams}>Send Stream</button>}
      {remoteSocketId && (
        <button onClick={handleCallUser}>
          Call
        </button>
      )}

      {myStream && 
        <>
          <h2>My Stream</h2>
          <ReactPlayer 
            playing 
            muted 
            height="100px"
             width="100px" 
             url={myStream}
          />
        </>
      }

      {remoteStream && 
        <>
          <h2>Remote Stream</h2>
          <ReactPlayer 
            playing 
            muted 
            height="100px"
             width="100px" 
             url={remoteStream}
          />
        </>
      }
    </div>
  );
}

export default RoomPage;
