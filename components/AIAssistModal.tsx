
import React, { useState, useEffect, useCallback } from 'react';
import { Task } from '../types';
import { getTaskAssistance } from '../services/geminiService';
import { XMarkIcon, SparklesIcon } from './icons';

interface AIAssistModalProps {
  task: Task;
  onClose: () => void;
}

const AIAssistModal: React.FC<AIAssistModalProps> = ({ task, onClose }) => {
  const [assistance, setAssistance] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAssistance = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const result = await getTaskAssistance(task.description);
      setAssistance(result);
    } catch (err) {
      setError('Error al obtener asistencia de la IA.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [task.description]);

  useEffect(() => {
    fetchAssistance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task.id]);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-slate-700">
        <div className="p-4 border-b border-slate-700 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <SparklesIcon className="w-6 h-6 text-purple-400" />
            <h2 className="text-lg font-semibold text-white">Asistencia IA para: "{task.title}"</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {isLoading && (
            <div className="flex flex-col items-center justify-center text-slate-400">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
                <p className="mt-2">Generando sugerencias...</p>
            </div>
          )}
          {error && <p className="text-red-400">{error}</p>}
          {!isLoading && !error && (
            <div
              className="prose prose-invert prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: assistance.replace(/\n/g, '<br />') }}
            />
          )}
        </div>
        <div className="p-4 border-t border-slate-700 flex justify-end gap-2">
            <button
                onClick={fetchAssistance}
                disabled={isLoading}
                className="px-4 py-2 text-sm font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Regenerando...' : 'Regenerar'}
            </button>
            <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-semibold text-slate-300 bg-slate-700 rounded-md hover:bg-slate-600"
            >
                Cerrar
            </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistModal;
