import React, { useRef, useLayoutEffect } from "react";
import { XMarkIcon } from "./icons/XMarkIcon";
import { DownArrowIcon } from "./icons/DownArrowIcon.js";
import { UpArrowIcon } from "./icons/UpArrowIcon.js";
import { AudioIcon } from "./icons/AudioIcon";
import { BrainIcon } from "./icons/BrainIcon";
import {
  EventType,
  useVoiceBot,
  type BehindTheScenesEvent,
} from "../context/VoiceBotContextProvider";

interface BehindTheScenesProps {
  onClose: () => void;
}

function BehindTheScenes({ onClose }: BehindTheScenesProps) {
  const { behindTheScenesEvents } = useVoiceBot();
  const scrollRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [behindTheScenesEvents]);

  return (
    <div
      className="border border-[#809bce] rounded-lg shadow-md"
      style={{
        background: "white",
        minWidth: "500px",
        maxWidth: "500px",
        fontFamily: "'Merriweather', serif"
      }}
    >
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center py-3 px-6 bg-[#c6def1] rounded-t-lg">
          <div className="text-lg font-semibold text-[#809bce]">SAFEGUARD LOGS</div>
          <button
            aria-label="Close"
            className="text-[#809bce] hover:text-[#6a85b3]"
            onClick={onClose}
          >
            <XMarkIcon />
          </button>
        </div>

        <div
          ref={scrollRef}
          className="scrollbar flex-1 flex flex-col items-left p-4 overflow-auto bg-white"
          style={{ minHeight: "400px", maxHeight: "400px", width: "100%" }}
        >
          <div className="px-4 max-w-xl flex flex-col gap-6">
            <div key={-1} className="text-[#2c3e50] flex items-center gap-3">
              <span>🟢&nbsp;&nbsp;Connection started</span>
            </div>
            {behindTheScenesEvents.map((event, index) => (
              <div key={index} className="text-[#2c3e50] flex items-center gap-3">
                {display_event(event)}
              </div>
            ))}
          </div>
        </div>
        
        <div className="py-3 px-6 bg-[#c6def1] rounded-b-lg text-right">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-[#809bce] hover:bg-[#6a85b3] text-white rounded-md transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

const display_event = (event: BehindTheScenesEvent) => {
  switch (event.type) {
    case EventType.SETTINGS_APPLIED:
      return (
        <>
          <UpArrowIcon className="text-[#809bce]" />
          {"Settings configured"}
        </>
      );
    case EventType.USER_STARTED_SPEAKING:
      return (
        <>
          <DownArrowIcon className="text-[#809bce]" />
          {"User started speaking"}
        </>
      );
    case EventType.AGENT_STARTED_SPEAKING:
      return (
        <>
          <DownArrowIcon className="text-[#809bce]" />
          {"Agent started speaking"}
        </>
      );
    case EventType.CONVERSATION_TEXT: {
      const speaker = event.role === "assistant" ? "Agent" : "User";
      const statement = event.content;
      return (
        <>
          <DownArrowIcon className="text-[#809bce]" />
          {`${speaker} text "${statement}"`}
        </>
      );
    }
    case "Interruption":
      return (
        <>
          <AudioIcon className="text-[#e74c3c]" />
          <span className="text-[#e74c3c]">Agent interrupted</span>
        </>
      );
    case EventType.END_OF_THOUGHT:
      return (
        <>
          <BrainIcon className="text-[#809bce]" />
          <span className="text-[#809bce]">End of thought detected</span>
        </>
      );
  }
};

export default BehindTheScenes;
