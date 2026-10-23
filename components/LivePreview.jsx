"use client";

import React, { useState } from 'react'

export default function LivePreview() {
    const [name,setName]=useState("");
  return (
    <div className='h-screen w-full p-6'>
        <div>
             <input type="text" placeholder='enter name' value={name} onChange={(e)=>setName(e.target.value)}
             className='p-3 border' />
        </div>

        <p>hello ,{name}</p>

        <p>length {name.length}</p>
       

      
    </div>
  )
}
