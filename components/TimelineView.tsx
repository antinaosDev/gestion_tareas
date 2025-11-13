import React from 'react';
import { TIMELINE_DATA } from '../constants';
import { XMarkIcon, ClockIcon } from './icons';

interface TimelineViewProps {
  isOpen: boolean;
  onClose: () => void;
}

const TimelineView: React.FC<TimelineViewProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  const getBadgeColor = (period: string) => {
    if (period.includes('6')) return 'bg-red-900/50 text-red-300 border-red-500/30';
    if (period.includes('12')) return 'bg-yellow-900/50 text-yellow-300 border-yellow-500/30';
    if (period.includes('18')) return 'bg-sky-900/50 text-sky-300 border-sky-500/30';
    return 'bg-green-900/50 text-green-300 border-green-500/30';
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-slate-700">
        <div className="p-4 border-b border-slate-700 flex justify-between items-center sticky top-0 bg-slate-800">
          <div className="flex items-center gap-2">
            <ClockIcon className="w-6 h-6 text-teal-400" />
            <h2 className="text-lg font-semibold text-white">Cronograma de Implementación (Decreto N° 21)</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          <div className="relative border-l-2 border-slate-600 ml-4 pl-8 py-4 space-y-8">
            {TIMELINE_DATA.map((item, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-[42px] top-1.5 w-4 h-4 bg-teal-400 rounded-full border-4 border-slate-800"></div>
                <div className={`inline-block mb-2 px-3 py-1 text-sm font-semibold rounded-full border ${getBadgeColor(item.period)}`}>
                  {item.period}
                </div>
                <ul className="list-disc list-inside text-slate-300 space-y-1">
                    {item.components.map((component, compIndex) => (
                        <li key={compIndex}>{component}</li>
                    ))}
                </ul>
                <p className="text-xs text-slate-500 mt-2">{item.sources}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 border-t border-slate-700 flex justify-end">
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

export default TimelineView;
