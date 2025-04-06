"use client";
import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface AnimationContextType {
  showingPromptSuggestions: boolean;
  setShowingPromptSuggestions: (value: boolean) => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [showingPromptSuggestions, setShowingPromptSuggestions] = useState(false);

  return (
    <AnimationContext.Provider value={{ showingPromptSuggestions, setShowingPromptSuggestions }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
} 