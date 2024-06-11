"use client"

import Link from 'next/link'
import React, { useEffect } from 'react'
import { readDir } from '@tauri-apps/api/fs'
type Props = {}

const Home = (props: Props) => {
  useEffect(()=>{
     async function log(path: string) {
      
      const dir = await readDir(path)
      console.log(dir)
     }
     log("/home/isaac/Desktop/software-engineering/desktop-apps/tauri/zeus")
  },[])
  return (
    <div>I am home 
        <Link href={"/"}>Want to go back home ?</Link>
    </div>
  )
}

export default Home