import React from 'react';
import { CheckCircleIcon, BookOpenIcon, ClockIcon, ArrowDownTrayIcon } from './icons';

interface HeaderProps {
    onOpenGlossary: () => void;
    onOpenTimeline: () => void;
    onOpenExport: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenGlossary, onOpenTimeline, onOpenExport }) => {
  return (
    <header className="bg-slate-800/50 backdrop-blur-sm p-4 border-b border-slate-700 sticky top-0 z-20">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
            <CheckCircleIcon className="w-10 h-10 text-teal-400" />
            <div>
                <h1 className="text-xl md:text-2xl font-bold text-white">Plan de Trabajo: Modelo de Salud Cultural</h1>
                <p className="text-sm text-slate-400">Herramienta de Seguimiento y Gestión Potenciada por IA</p>
            </div>
        </div>
        <div className="flex items-center gap-2">
            <button 
                onClick={onOpenExport}
                className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white bg-slate-700 rounded-md hover:bg-slate-600 transition-colors"
                title="Exportar reporte"
            >
                <ArrowDownTrayIcon className="w-5 h-5" />
                <span className="hidden md:inline">Exportar</span>
            </button>
            <button 
                onClick={onOpenTimeline}
                className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white bg-slate-700 rounded-md hover:bg-slate-600 transition-colors"
                title="Ver cronograma de implementación"
            >
                <ClockIcon className="w-5 h-5" />
                <span className="hidden md:inline">Cronograma</span>
            </button>
            <button 
                onClick={onOpenGlossary}
                className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white bg-slate-700 rounded-md hover:bg-slate-600 transition-colors"
                title="Abrir glosario de términos"
            >
                <BookOpenIcon className="w-5 h-5" />
                <span className="hidden md:inline">Glosario</span>
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;