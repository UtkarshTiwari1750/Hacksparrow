"use client"
import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import peer from "../../../service/peer";
import { useSocket } from "../../../context/SocketProvider";

const RoomPage = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("ALLLCJDJAN....", remoteStream[0]);
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  return (
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center background-image: linear-gradient(to top, #5ee7df 0%, #b490ca 100%); bg-gradient-to-t from-[#5ee7df] to-[#b490ca] ">
      <div className="w-11/12 mx-auto max-w-[1080px] flex flex-col items-center justify-between gap-y-4">
        <div className="flex justify-between items-center gap-x-6">
          <h2 className="text-4xl font-semibold">Room</h2>
          <p className={`${remoteSocketId ? "border-green-700 text-green-950": "border-red-900 text-red-900"} border-2 rounded-full py-1 px-3 text-sm`}>{remoteSocketId ? "Connected" : "No one in room"}</p>
        </div>
        {myStream && <button className="border " onClick={sendStreams}>Send Stream</button>}
        {remoteSocketId && <button className="bg-red-700 px-4 py-1 text-xl font-sans rounded-lg" onClick={handleCallUser}>Call</button>}
        <div className="relative">
          {myStream && (
            <div className="absolute -bottom-48 -left-[38rem] flex flex-col items-center">
              <h1>My Stream</h1>
              <ReactPlayer
                playing
                muted
                height="200px"
                width="200px"
                url={myStream}
              />
            </div>
          )}
          {remoteStream && (
            <div className="absolute flex flex-col items-center -top-96 -right-96">

              <h1>Remote Stream</h1>
              <ReactPlayer
                playing
                muted
                height="600px"
                width="600px"
                url={remoteStream}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
