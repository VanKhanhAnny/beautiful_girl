import React, { useEffect, useState, type FC } from "react";
import Image from "next/image";
import { useVoiceBot, VoiceBotStatus } from "../context/VoiceBotContextProvider";
import { withBasePath } from "app/utils/deepgramUtils";

interface Props {
  agentVoiceAnalyser?: AnalyserNode;
  userVoiceAnalyser?: AnalyserNode;
  onOrbClick: () => void;
  showingSuggestions?: boolean;
}

const AnimationManager: FC<Props> = ({
  onOrbClick,
  showingSuggestions = false,
}: Props) => {
  const { status } = useVoiceBot();
  const [currentImage, setCurrentImage] = useState("before");

  // Update the image based on the bot's status or if suggestions are showing
  useEffect(() => {
    if (status === VoiceBotStatus.SPEAKING || showingSuggestions) {
      setCurrentImage("after");
    } else {
      setCurrentImage("before");
    }
  }, [status, showingSuggestions]);

  return (
    <div className="flex items-center justify-center w-full">
      <button 
        onClick={onOrbClick} 
        className="orb-animation"
        style={{
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
          position: 'relative',
          width: '250px',
          height: '250px',
        }}
      >
        <Image
          src={withBasePath(`/${currentImage}.gif`)}
          alt={currentImage === "before" ? "Bot waiting" : "Bot speaking"}
          width={250}
          height={250}
          style={{
            objectFit: 'contain',
          }}
          priority
        />
      </button>
    </div>
  );
};

export default AnimationManager;
