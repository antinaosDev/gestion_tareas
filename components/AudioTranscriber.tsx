
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Task } from '../types';
import { GoogleGenAI, LiveSession, LiveServerMessage, Modality, Blob } from '@google/genai';
import { XMarkIcon, MicrophoneIcon, StopIcon } from './icons';

// Base64 encoding/decoding functions for audio data
function encode(bytes: Uint8Array): string {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

const AudioTranscriber: React.FC<{ task: Task; onClose: () => void; }> = ({ task, onClose }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcription, setTranscription] = useState('');
    const [status, setStatus] = useState('Listo para grabar. Presiona el micrófono.');
    const [error, setError] = useState('');
    
    const sessionPromiseRef = useRef<Promise<LiveSession> | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
    const mediaStreamSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    
    const stopRecordingResources = useCallback(() => {
        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach(track => track.stop());
            mediaStreamRef.current = null;
        }
        if (scriptProcessorRef.current) {
            scriptProcessorRef.current.disconnect();
            scriptProcessorRef.current = null;
        }
        if (mediaStreamSourceRef.current) {
            mediaStreamSourceRef.current.disconnect();
            mediaStreamSourceRef.current = null;
        }
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }
    }, []);

    const startRecording = async () => {
        if (isRecording) return;
        setTranscription('');
        setError('');
        setStatus('Inicializando...');

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaStreamRef.current = stream;

            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
            
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            sessionPromiseRef.current = ai.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-09-2025',
                callbacks: {
                    onopen: () => {
                        setStatus('Conectado. Habla ahora...');
                        setIsRecording(true);
                    },
                    onmessage: (message: LiveServerMessage) => {
                        if (message.serverContent?.inputTranscription) {
                            setTranscription(prev => prev + message.serverContent.inputTranscription.text);
                        }
                    },
                    onerror: (e: ErrorEvent) => {
                        console.error('Live API error:', e);
                        setError('Ocurrió un error en la conexión.');
                        stopRecording();
                    },
                    onclose: () => {
                        setStatus('Conexión cerrada. Presiona el micrófono para grabar de nuevo.');
                    },
                },
                config: {
                    inputAudioTranscription: {},
                },
            });

            mediaStreamSourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
            scriptProcessorRef.current = audioContextRef.current.createScriptProcessor(4096, 1, 1);
            
            scriptProcessorRef.current.onaudioprocess = (audioProcessingEvent) => {
                const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                const pcmBlob: Blob = {
                    data: encode(new Uint8Array(new Int16Array(inputData.map(x => x * 32768)).buffer)),
                    mimeType: 'audio/pcm;rate=16000',
                };
                sessionPromiseRef.current?.then((session) => {
                    session.sendRealtimeInput({ media: pcmBlob });
                });
            };

            mediaStreamSourceRef.current.connect(scriptProcessorRef.current);
            scriptProcessorRef.current.connect(audioContextRef.current.destination);

        } catch (err) {
            console.error('Error starting recording:', err);
            setError('No se pudo acceder al micrófono. Por favor, verifica los permisos.');
            setStatus('Error de micrófono');
        }
    };
    
    const stopRecording = useCallback(() => {
        setIsRecording(false);
        setStatus('Procesando transcripción final...');
        sessionPromiseRef.current?.then(session => {
            session.close();
            sessionPromiseRef.current = null;
        });
        stopRecordingResources();
    }, [stopRecordingResources]);

    useEffect(() => {
        // Cleanup on unmount
        return () => {
            if (sessionPromiseRef.current) {
                sessionPromiseRef.current.then(session => session.close());
            }
            stopRecordingResources();
        };
    }, [stopRecordingResources]);

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-lg flex flex-col border border-slate-700">
                <div className="p-4 border-b border-slate-700 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-white">Nota de Voz para: "{task.title}"</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6 flex flex-col items-center gap-4">
                    <button
                        onClick={isRecording ? stopRecording : startRecording}
                        className={`w-24 h-24 rounded-full flex items-center justify-center transition-colors ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                    >
                        {isRecording ? <StopIcon className="w-10 h-10 text-white" /> : <MicrophoneIcon className="w-10 h-10 text-white" />}
                    </button>
                    <p className="text-slate-400 text-sm">{status}</p>
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                </div>
                <div className="p-6 bg-slate-900/50 min-h-[120px] max-h-48 overflow-y-auto rounded-b-lg">
                    <p className="text-slate-200 whitespace-pre-wrap">{transcription || "La transcripción aparecerá aquí..."}</p>
                </div>
                <div className="p-4 border-t border-slate-700 flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-slate-300 bg-slate-700 rounded-md hover:bg-slate-600">
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AudioTranscriber;
