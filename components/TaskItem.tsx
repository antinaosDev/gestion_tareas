import React, { useState } from 'react';
import { Task } from '../types';
import AIAssistModal from './AIAssistModal';
import ImageAnalyzer from './ImageAnalyzer';
import AudioTranscriber from './AudioTranscriber';
import { SparklesIcon, DocumentScannerIcon, MicrophoneIcon, ChevronDownIcon, PencilSquareIcon, PaperClipIcon } from './icons';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onUpdate: (id: number, field: 'notes' | 'evidence', value: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <>
      <div className={`bg-slate-900/50 p-4 rounded-lg border border-slate-700 transition-all duration-300 ${task.completed ? 'opacity-60' : ''}`}>
        <div className="flex items-start gap-4">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="mt-1 h-5 w-5 rounded border-gray-600 bg-gray-700 text-teal-500 focus:ring-teal-600 cursor-pointer flex-shrink-0"
            aria-labelledby={`task-title-${task.id}`}
          />
          <div className="flex-1">
            <div className="flex justify-between items-start">
                <p
                    id={`task-title-${task.id}`}
                    className={`font-medium text-white cursor-pointer ${task.completed ? 'line-through text-slate-400' : ''}`}
                    onClick={() => onToggle(task.id)}
                >
                    {task.title}
                </p>
                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    {/* Fix: Wrap icons in a span with a title attribute for tooltips, as IconProps does not accept a title prop. */}
                    {task.notes && <span title="Contiene notas"><PencilSquareIcon className="w-4 h-4 text-slate-400" /></span>}
                    {task.evidence && <span title="Contiene evidencia"><PaperClipIcon className="w-4 h-4 text-slate-400" /></span>}
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="p-1 text-slate-400 hover:text-white transition-transform duration-300"
                        aria-expanded={isExpanded}
                        aria-controls={`task-details-${task.id}`}
                    >
                        <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                </div>
            </div>

            {isExpanded && (
              <div id={`task-details-${task.id}`} className="mt-4 space-y-4">
                <p className="text-sm text-slate-300">{task.description}</p>
                
                <div>
                    <label htmlFor={`notes-${task.id}`} className="block text-sm font-medium text-slate-300 mb-1">Notas Adicionales</label>
                    <textarea
                        id={`notes-${task.id}`}
                        rows={3}
                        className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        placeholder="Añade tus notas aquí..."
                        value={task.notes}
                        onChange={(e) => onUpdate(task.id, 'notes', e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor={`evidence-${task.id}`} className="block text-sm font-medium text-slate-300 mb-1">Enlace a Evidencia</label>
                    <input
                        type="text"
                        id={`evidence-${task.id}`}
                        className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        placeholder="Pega un enlace a un documento, imagen, etc."
                        value={task.evidence}
                        onChange={(e) => onUpdate(task.id, 'evidence', e.target.value)}
                    />
                </div>

                <div className="mt-3 flex flex-wrap gap-2 pt-2 border-t border-slate-700/50">
                    <button onClick={() => setActiveModal('ai-assist')} className="flex items-center gap-1.5 px-2 py-1 text-xs font-semibold text-purple-300 bg-purple-900/50 rounded-md hover:bg-purple-900 transition-colors">
                    <SparklesIcon className="w-4 h-4" /> Asistencia IA
                    </button>
                    <button onClick={() => setActiveModal('image-analyzer')} className="flex items-center gap-1.5 px-2 py-1 text-xs font-semibold text-blue-300 bg-blue-900/50 rounded-md hover:bg-blue-900 transition-colors">
                    <DocumentScannerIcon className="w-4 h-4" /> Analizar Evidencia
                    </button>
                    <button onClick={() => setActiveModal('audio-transcriber')} className="flex items-center gap-1.5 px-2 py-1 text-xs font-semibold text-green-300 bg-green-900/50 rounded-md hover:bg-green-900 transition-colors">
                    <MicrophoneIcon className="w-4 h-4" /> Nota de Voz
                    </button>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
      
      {activeModal === 'ai-assist' && (
        <AIAssistModal task={task} onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'image-analyzer' && (
        <ImageAnalyzer task={task} onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'audio-transcriber' && (
        <AudioTranscriber task={task} onClose={() => setActiveModal(null)} />
      )}
    </>
  );
};

export default TaskItem;