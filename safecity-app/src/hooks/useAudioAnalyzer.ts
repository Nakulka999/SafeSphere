import { useState, useEffect, useRef } from 'react';
import Meyda from 'meyda';
import { useAppStore } from '@/store/useAppStore';

export function useAudioAnalyzer() {
  const [isListening, setIsListening] = useState(false);
  const { setSosState, setSafetyScore } = useAppStore();
  const audioContext = useRef<AudioContext | null>(null);
  const analyzer = useRef<any>(null); // Meyda analyzer
  const streamRef = useRef<MediaStream | null>(null);
  
  // Track consecutive loud/distress frames
  const distressFrames = useRef(0);

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      streamRef.current = stream;
      
      const AudioContextCtor = window.AudioContext || (window as any).webkitAudioContext;
      audioContext.current = new AudioContextCtor();
      const source = audioContext.current.createMediaStreamSource(stream);

      analyzer.current = Meyda.createMeydaAnalyzer({
        audioContext: audioContext.current,
        source: source,
        bufferSize: 2048,
        featureExtractors: ['rms', 'spectralCentroid', 'zcr'],
        callback: (features: any) => {
          if (!features) return;
          
          const { rms, spectralCentroid } = features;
          
          // Heuristic for screaming/distress: High loudness + High pitch
          if (rms > 0.15 && spectralCentroid > 2500) {
            distressFrames.current += 1;
            
            // Update UI safety score
            setSafetyScore(Math.min(100, distressFrames.current * 10 + 40));

            // If sustained for ~2 seconds (at typical framerate)
            if (distressFrames.current > 20) {
              console.warn('Scream/Distress Audio Heuristic Met!');
              setSosState('countdown');
              distressFrames.current = 0; // reset
            }
          } else {
            distressFrames.current = Math.max(0, distressFrames.current - 1);
            if (distressFrames.current === 0) {
               // Decay safety score gradually back down to baseline if needed
            }
          }
        }
      });
      
      analyzer.current.start();
      setIsListening(true);
      
      // Initialize Web Speech API for Keyword Spotting
      initSpeechRecognition();

    } catch (err) {
      console.error('Failed to get microphone', err);
    }
  };

  const initSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript.toLowerCase())
        .join('');
      
      if (transcript.includes('help') || transcript.includes('stop') || transcript.includes('police')) {
        console.warn('Distress keyword detected!');
        setSafetyScore(90);
        setSosState('countdown');
      }
    };

    recognition.onerror = (e: any) => {
      // ignore errors, restart
    };

    recognition.onend = () => {
      if (isListening) {
        recognition.start(); // keep running
      }
    };

    recognition.start();
  };

  const stopListening = () => {
    if (analyzer.current) {
      analyzer.current.stop();
    }
    if (audioContext.current) {
      audioContext.current.close();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
    }
    setIsListening(false);
  };

  return { isListening, startListening, stopListening };
}
