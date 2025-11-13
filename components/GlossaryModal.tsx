import React, { useState, useMemo } from 'react';
import { GLOSSARY_DATA } from '../constants';
import { XMarkIcon, BookOpenIcon } from './icons';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTerms = useMemo(() => {
    if (!searchTerm) {
      return GLOSSARY_DATA;
    }
    return GLOSSARY_DATA.filter(item =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-slate-700">
        <div className="p-4 border-b border-slate-700 flex justify-between items-center sticky top-0 bg-slate-800">
          <div className="flex items-center gap-2">
            <BookOpenIcon className="w-6 h-6 text-teal-400" />
            <h2 className="text-lg font-semibold text-white">Glosario de Términos</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 border-b border-slate-700 sticky top-[65px] bg-slate-800">
            <input
                type="text"
                placeholder="Buscar término..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
        </div>
        <div className="p-6 overflow-y-auto space-y-4">
          {filteredTerms.length > 0 ? (
            filteredTerms.map(item => (
              <div key={item.term}>
                <h3 className="font-bold text-teal-400">{item.term}</h3>
                <p className="text-slate-300 text-sm mt-1">{item.definition}</p>
              </div>
            ))
          ) : (
            <p className="text-slate-400 text-center">No se encontraron términos para "{searchTerm}".</p>
          )}
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

export default GlossaryModal;
