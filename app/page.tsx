"use client";
import { Suspense, useState, useEffect } from "react";
import { App } from "./components/App";
import { stsConfig } from "./lib/constants";
import {
  isConversationMessage,
  useVoiceBot,
  VoiceBotStatus,
} from "./context/VoiceBotContextProvider";
import { CaretIcon } from "./components/icons/CaretIcon";
import PromptSuggestions from "./components/PromptSuggestions";
import Conversation from "./components/Conversation";
import { isMobile } from "react-device-detect";
import PopupButton from "./components/PopupButton";
import MobileMenu from "./components/MobileMenu";
import { PencilIcon } from "./components/icons/PencilIcon";
import InstructionInput from "./components/InstructionInput";
import { TerminalIcon } from "./components/icons/TerminalIcon";
import CustomHeader from "./components/CustomHeader";
import { useStsQueryParams } from "./hooks/UseStsQueryParams";
import { useDeepgram } from "./context/DeepgramContextProvider";
import BehindTheScenes from "./components/BehindTheScenes";
import TitleUpdater from "./components/TitleUpdater";


const DesktopMenuItems = () => {
  const { instructions } = useStsQueryParams();
  return (
    <>
      <PopupButton
        buttonIcon={<PencilIcon />}
        buttonText={
          <span>Prompt {instructions && <span className="text-[#809bce]">*</span>}</span>
        }
        popupContent={<InstructionInput className="w-96" focusOnMount />}
        tooltipText={instructions ? "Using your custom prompt. Click to edit." : null}
      />
    </>
  );
};

export default function Home() {
  const { messages, status } = useVoiceBot();
  const { rateLimited } = useDeepgram();
  const [conversationOpen, setConversationOpen] = useState(false);
  const [behindTheScenesOpen, setBehindTheScenesOpen] = useState(false);
  const [showingSuggestions, setShowingSuggestions] = useState(false);

  const toggleConversation = () => setConversationOpen(!conversationOpen);

  const has4ConversationMessages = messages.filter(isConversationMessage).length > 3;

  // Update showingSuggestions when conditions change
  useEffect(() => {
    const shouldShowSuggestions = !has4ConversationMessages &&
      !rateLimited &&
      status !== VoiceBotStatus.SLEEPING &&
      status !== VoiceBotStatus.NONE;
    
    setShowingSuggestions(shouldShowSuggestions);
  }, [has4ConversationMessages, rateLimited, status]);

  return (
    <main className="min-h-screen flex flex-col bg-[#c6def1]">
      <TitleUpdater />
      <CustomHeader />
      
      <div className="flex flex-col flex-grow items-center justify-center py-6">
        <div className="container mx-auto px-4 max-w-3xl flex flex-col items-center">
          <div className="bg-white rounded-lg p-6 shadow-md w-full max-w-2xl">
            <div className="flex flex-col items-center">
              {/* Hero Section */}
              <div className="text-center mb-6">
                <h2 
                  className="text-2xl font-bold text-[#809bce] uppercase tracking-wide"
                  style={{ fontFamily: "'Merriweather', serif" }}
                >
                  SAFEGUARD ASSISTANT
                </h2>
                <p className="text-black mt-2">
                  Your personal AI assistant to help you with health and medical information
                </p>
              </div>
              
              {/* App Component with the Animation moved down in a column layout */}
              <Suspense>
                <App
                  defaultStsConfig={stsConfig}
                  className="flex flex-col items-center w-full"
                  requiresUserActionToInitialize={isMobile}
                  showingSuggestions={showingSuggestions}
                />
              </Suspense>
              
              {/* Desktop Conversation Toggle */}
              {has4ConversationMessages ? (
                <div className="flex justify-center mt-6">
                  <button className="text-[14px] text-black py-2" onClick={toggleConversation}>
                    See full conversation <CaretIcon className="rotate-90 h-4 w-4" />
                  </button>
                </div>
              ) : null}

              {/* Speech Bubbles */}
              {!has4ConversationMessages &&
                !rateLimited &&
                status !== VoiceBotStatus.SLEEPING &&
                status !== VoiceBotStatus.NONE && (
                  <div className="w-full mt-8">
                    <div className="flex justify-center text-black font-medium mb-4">Try saying:</div>
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                      <PromptSuggestions />
                    </div>
                  </div>
                )}
              
              {/* Advanced Options Button */}
              <div className="mt-10 w-full max-w-md">
                {behindTheScenesOpen ? (
                  <BehindTheScenes onClose={() => setBehindTheScenesOpen(false)} />
                ) : (
                  <button
                    className="w-full px-4 py-3 bg-[#809bce] hover:bg-[#6a85b3] text-white rounded-lg transition-colors flex items-center gap-2 justify-center"
                    onClick={() => setBehindTheScenesOpen(true)}
                    style={{ fontFamily: "'Merriweather', serif" }}
                  >
                    <TerminalIcon className="w-5 h-5" />
                    <span className="font-medium tracking-wide uppercase">Backstage</span>
                    <CaretIcon className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conversation */}
      {conversationOpen && <Conversation toggleConversation={toggleConversation} />}

      {/* Footer */}
      <footer className="mt-auto py-4 bg-[#c6def1] text-[#809bce] border-t border-[#809bce] text-center">
        <div className="container mx-auto">
          <p>© 2025 SafeGuard. All rights reserved.</p>
        </div>
      </footer>
      
      {/* Mobile Menu */}
      <Suspense>
        <MobileMenu className="fixed md:hidden bottom-4 right-4 text-[#809bce]" />
      </Suspense>
    </main>
  );
}
