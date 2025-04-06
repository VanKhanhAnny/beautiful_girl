import { type AudioConfig, type StsConfig, type Voice } from "app/utils/deepgramUtils";
import { withBasePath } from "app/utils/deepgramUtils";

const audioConfig: AudioConfig = {
  input: {
    encoding: "linear16",
    sample_rate: 16000,
  },
  output: {
    encoding: "linear16",
    sample_rate: 24000,
    container: "none",
  },
};

const baseConfig = {
  type: "SettingsConfiguration",
  audio: audioConfig,
  agent: {
    listen: { model: "nova-2" },
    speak: { model: "aura-asteria-en" },
    think: {
      provider: { type: "open_ai" },
      model: "gpt-4o",
    },
  },
};

export const stsConfig: StsConfig = {
  ...baseConfig,
  agent: {
    ...baseConfig.agent,
    think: {
      ...baseConfig.agent.think,
      provider: { type: "open_ai", fallback_to_groq: true },
      instructions: `
                ## Base instructions
                You are a helpful voice assistant made by SafeGuard's engineers.
                Respond in a friendly, human, conversational manner.
                YOU MUST answer in 1-2 sentences at most when the message is not empty.
                Always reply to empty messages with an empty message.
                Ask follow up questions.
                Ask one question at a time.
                Your messages should have no more than than 120 characters.
                Do not use abbreviations for units.
                Separate all items in a list with commas.
                Keep responses unique and free of repetition.
                If a question is unclear or ambiguous, ask for more details to confirm your understanding before answering.
                If someone asks how you are, or how you are feeling, tell them.
                SafeGuard gave you a mouth and ears so you can take voice as an input. You can listen and speak.
                Your name is Voicebot.
                `,
      functions: [],
    },
  },
};

// Voice constants
const voiceKhanh: Voice = {
  name: "Khanh",
  canonical_name: "aura-asteria-en",
  metadata: {
    image: withBasePath("/khanh.png"),
    color: "#809bce",
  },
};

const voiceKhang: Voice = {
  name: "Khang",
  canonical_name: "aura-orion-en",
  metadata: {
    image: withBasePath("/khang.png"),
    color: "#6a85b3",
  },
};

const voiceGiang: Voice = {
  name: "Giang",
  canonical_name: "aura-luna-en",
  metadata: {
    image: withBasePath("/giang.jpeg"),
    color: "#809bce",
  },
};

const voiceTam: Voice = {
  name: "Tam",
  canonical_name: "aura-arcas-en",
  metadata: {
    image: withBasePath("/tam.png"),
    color: "#4a6fa5",
  },
};

type NonEmptyArray<T> = [T, ...T[]];
export const availableVoices: NonEmptyArray<Voice> = [
  voiceKhanh,
  voiceKhang,
  voiceGiang,
  voiceTam,
];
export const defaultVoice: Voice = availableVoices[0];

export const sharedOpenGraphMetadata = {
  title: "SafeGuard",
  type: "website",
  url: "/",
  description: "Your personal AI health companion",
};

export const latencyMeasurementQueryParam = "latency-measurement";
