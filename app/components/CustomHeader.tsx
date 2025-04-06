"use client";
import React from 'react';
import Link from 'next/link';
import { Suspense } from "react";
import VoiceSelector from "./VoiceSelector/VoiceSelector";

const CustomHeader = () => {
  return (
    <header className="bg-[#c6def1] py-6" style={{ fontFamily: "'Merriweather', serif" }}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex-1">
          {/* Empty div to keep flex layout balanced */}
        </div>
        
        <div className="flex-1 text-center">
          <h1 
            className="text-3xl font-bold text-[#809bce] tracking-wide" 
            style={{ fontFamily: "'Merriweather', serif", textTransform: 'uppercase' }}
          >
            SAFEGUARD
          </h1>
        </div>
        
        <div className="flex-1 flex justify-end">
          <Suspense>
            <VoiceSelector className="flex justify-end items-center" showLabel />
          </Suspense>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-4">
        <Link 
          href="/patient/dashboard" 
          className="flex items-center justify-center w-full max-w-[200px] mx-auto px-4 py-2 bg-[#809bce] hover:bg-[#6a85b3] text-white hover:text-white rounded-md transition-all text-center"
          target="_parent"
          style={{ fontFamily: "'Merriweather', serif" }}
        >
          Back to Dashboard
        </Link>
      </div>
    </header>
  );
};

export default CustomHeader; 