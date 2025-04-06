import React from "react";
import { useVoiceBot } from "../context/VoiceBotContextProvider";

function Transcript() {
  const { messages } = useVoiceBot();

  const lastMessage = messages[messages.length - 1];

  return (
    <div className="flex items-center justify-center">
      {/* Render the message if it exists */}
      {lastMessage && <div className="text-center text-black">{lastMessage.assistant}</div>}
    </div>
  );
}

export default Transcript;
