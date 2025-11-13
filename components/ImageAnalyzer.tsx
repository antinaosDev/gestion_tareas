
import React, { useState, useCallback } from 'react';
import { Task } from '../types';
import { analyzeImage } from '../services/geminiService';
import { XMarkIcon, DocumentScannerIcon, PhotoIcon } from './icons';

interface ImageAnalyzerProps {
  task: Task;
  onClose: () => void;
}

const ImageAnalyzer: React.FC<ImageAnalyzerProps> = ({ task, onClose }) => {
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // Gemini API limit
          setError("El archivo es demasiado grande. El máximo es 4MB.");
          return;
      }
      setImageFile(file);
      setError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = useCallback(async () => {
    if (!imageFile || !image) return;
    setIsLoading(true);
    setResult('');
    setError('');
    try {
      const base64Image = image.split(',')[1];
      const prompt = `Analiza la siguiente imagen como evidencia para la tarea: "${task.title} - ${task.description}". Describe lo que ves y si parece ser una evidencia relevante. Por ejemplo, si es un documento, un acta de reunión, una fotografía de una señalética, etc.`;
      const analysisResult = await analyzeImage(base64Image, imageFile.type, prompt);
      setResult(analysisResult);
    } catch (err) {
      setError('Error al analizar la imagen.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [image, imageFile, task.title, task.description]);
  
  const reset = () => {
      setImage(null);
      setImageFile(null);
      setResult('');
      setError('');
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-slate-700">
        <div className="p-4 border-b border-slate-700 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <DocumentScannerIcon className="w-6 h-6 text-blue-400" />
            <h2 className="text-lg font-semibold text-white">Analizar Evidencia para: "{task.title}"</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {!image ? (
            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-600 rounded-lg">
                <PhotoIcon className="w-12 h-12 text-slate-500 mb-4" />
                <h3 className="text-lg font-semibold text-white">Sube una imagen de evidencia</h3>
                <p className="text-sm text-slate-400 mb-4">Archivos JPG, PNG, WEBP. Máximo 4MB.</p>
                <input type="file" id="image-upload" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} className="hidden" />
                <label htmlFor="image-upload" className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Seleccionar Archivo
                </label>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                  <img src={image} alt="Preview" className="rounded-lg w-full h-auto object-contain max-h-64" />
                   <div className="flex gap-2">
                        <button onClick={handleAnalyze} disabled={isLoading} className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50">
                            {isLoading ? 'Analizando...' : 'Analizar con IA'}
                        </button>
                        <button onClick={reset} className="bg-slate-600 text-white px-4 py-2 rounded-md hover:bg-slate-500">
                            Cambiar
                        </button>
                   </div>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-lg h-80 overflow-y-auto">
                {isLoading && (
                    <div className="flex flex-col items-center justify-center text-slate-400 h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                        <p className="mt-2">Analizando imagen...</p>
                    </div>
                )}
                {result && <p className="text-sm text-slate-200 whitespace-pre-wrap">{result}</p>}
              </div>
            </div>
          )}
          {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
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

export default ImageAnalyzer;
