import React from 'react';
import { CalendarDaysIcon } from './icons';

interface DeadlineBadgeProps {
  deadline: string;
}

const DeadlineBadge: React.FC<DeadlineBadgeProps> = ({ deadline }) => {
    const getBadgeColor = () => {
        if (deadline.includes('6')) return 'bg-red-900/50 text-red-300 border-red-500/30';
        if (deadline.includes('12')) return 'bg-yellow-900/50 text-yellow-300 border-yellow-500/30';
        if (deadline.includes('18')) return 'bg-sky-900/50 text-sky-300 border-sky-500/30';
        return 'bg-slate-700/50 text-slate-300 border-slate-500/30';
    }

  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${getBadgeColor()}`}>
      <CalendarDaysIcon className="w-3.5 h-3.5" />
      <span>Plazo: {deadline}</span>
    </div>
  );
};

export default DeadlineBadge;
