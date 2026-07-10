import { useEffect, useRef, useState } from "react";
import { bgm } from "../utils/audio";
import { SettingsDataStore } from "./Stores/SettingsDataStore";

const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
const gainNode = audioCtx.createGain();
gainNode.connect(audioCtx.destination);

const BGMHandler = () => {
  const { musicVolume, musicMutedIOS, currentBGM: lastBGM } = SettingsDataStore.getState();
  const [arrayBuffer, setArrayBuffer] = useState<ArrayBuffer | null>(null);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [currentBGM, setCurrentBGM] = useState(lastBGM ?? bgm["Other"][0]);

  const hasPlayedBGM = useRef(false);
  const activeSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const makeArrayBuffer = async () => {
    const fetchedArrayBuffer = await fetch(currentBGM.src).then((res) => res.arrayBuffer());
    setArrayBuffer(fetchedArrayBuffer);
  };

  const decodeAudio = async () => {
    if (arrayBuffer) {
      const decodedAudioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
      setAudioBuffer(decodedAudioBuffer);
    }
  };

  useEffect(() => {
    makeArrayBuffer();
  }, []); // initial array buffer fetch

  useEffect(() => {
    decodeAudio();
  }, [arrayBuffer]);

  // play the new buffer when it changes (if the user has already unlocked audio)
  useEffect(() => {
    if (!hasPlayedBGM.current || !audioBuffer) return;

    if (activeSourceRef.current) {
      activeSourceRef.current.stop();
      activeSourceRef.current.disconnect();
    }

    makeArrayBuffer();
  }, [currentBGM]);

  useEffect(() => {
    if (!hasPlayedBGM.current || !audioBuffer) return;

    // only play the new buffer if the user has already unlocked audio

    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.loop = true;

    gainNode.gain.value = musicVolume / 100;
    source.connect(gainNode);
    source.start(0);

    activeSourceRef.current = source;

    if (musicMutedIOS) audioCtx.suspend();
  }, [audioBuffer]);

  useEffect(() => {
    const handleInteraction = () => {
      if (hasPlayedBGM.current || !audioBuffer) return;

      try {
        // iOS silent buffer trick to unlock audio context
        if (audioCtx.state === "suspended") {
          const silentBuffer = audioCtx.createBuffer(1, 1, 22050);
          const unlockSource = audioCtx.createBufferSource();
          unlockSource.buffer = silentBuffer;
          unlockSource.connect(audioCtx.destination);
          unlockSource.start(0);
          audioCtx.resume();
        }

        const source = audioCtx.createBufferSource();
        source.buffer = audioBuffer;
        source.loop = true;

        gainNode.gain.value = musicVolume / 100;
        source.connect(gainNode);
        source.start(0);

        activeSourceRef.current = source;

        if (musicMutedIOS) audioCtx.suspend();

        hasPlayedBGM.current = true;
      } catch (error) {
        console.error("Autoplay prevented or audio error:", error);
      }
    };

    const events = ["click", "keydown", "touchend", "pointerup"];
    events.forEach((event) => window.addEventListener(event, handleInteraction, { capture: true }));

    return () => {
      events.forEach((event) => window.removeEventListener(event, handleInteraction, { capture: true }));
    };
  }, [audioBuffer]);

  useEffect(() => {
    const unsub = SettingsDataStore.subscribe((state) => {
      const { musicVolume, musicMutedIOS, currentBGM: newBGM } = state;
      gainNode.gain.value = musicVolume / 100;
      if (newBGM != currentBGM) setCurrentBGM(newBGM);
      musicMutedIOS ? audioCtx.suspend() : audioCtx.resume();
    });
    return unsub;
  }, []);

  return null;
};

export default BGMHandler;
