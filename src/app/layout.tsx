import { title } from "process";
import "./globals.css";
import type { Metadata } from 'next'
import { SocketProvider } from "@/context/SocketProvider";
 
export const metadata: Metadata = {
  title: 'FusionFlow',
  description: 'A platform where users can collaborate on creative projects like writing stories, composing music, or designing games. Contain features like shared workspaces, version control, real-time communication tools, and community voting mechanisms to foster collaborative creativity and encourage user engagement.',
}

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <SocketProvider>
          <body>{children}</body>
        </SocketProvider>
      </html>
    )
}