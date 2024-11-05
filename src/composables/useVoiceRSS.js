import { ref } from "vue";
import axios from "axios";

export function useVoiceRSS() {
  const isListening = ref(false);
  const error = ref(null);

  const speakText = async (text) => {
    const VOICERSS_API_KEY = import.meta.env.VITE_VOICERSS_API_KEY; // Use environment variable

    if (!VOICERSS_API_KEY) {
      throw new Error("Please set your VoiceRSS API key in the .env file.");
    }

    const params = new URLSearchParams({
      key: VOICERSS_API_KEY,
      hl: "en-us",
      src: text,
      c: "MP3",
      f: "16khz_16bit_mono",
    });

    isListening.value = true;

    try {
      const response = await axios.get(
        `https://api.voicerss.org/?${params.toString()}`,
        {
          responseType: "blob",
        }
      );

      const audioUrl = URL.createObjectURL(response.data);
      const audio = new Audio(audioUrl);
      audio.play();

      audio.onended = () => {
        isListening.value = false;
      };

      audio.onerror = () => {
        isListening.value = false;
        throw new Error("Failed to play audio.");
      };
    } catch (err) {
      console.error("Error with VoiceRSS API:", err);
      isListening.value = false;
      throw err;
    }
  };

  return {
    isListening,
    speakText,
    error,
  };
}
