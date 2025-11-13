
import React from 'react';

interface ProgressBarProps {
  progress: number;
  completed: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, completed, total }) => {
  return (
    <div className="bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-700">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-white">Progreso General</h2>
        <span className="text-teal-400 font-bold text-lg">{`${Math.round(progress)}%`}</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-4">
        <div
          className="bg-teal-500 h-4 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-right text-sm text-slate-400 mt-2">{`${completed} de ${total} tareas completadas`}</p>
    </div>
  );
};

export default ProgressBar;
