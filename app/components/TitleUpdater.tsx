"use client";
import { useEffect } from 'react';

export default function TitleUpdater() {
  useEffect(() => {
    // Update the document title on the client side
    document.title = "SafeGuard";
  }, []);
  
  return null;
} 