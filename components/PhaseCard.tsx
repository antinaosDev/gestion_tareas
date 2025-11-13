import React from 'react';
import { Phase, Task } from '../types';
import TaskItem from './TaskItem';
import DeadlineBadge from './DeadlineBadge';

interface PhaseCardProps {
  phase: Phase;
  tasks: Record<number, Task>;
  onToggleTask: (taskId: number) => void;
  onUpdateTask: (taskId: number, field: 'notes' | 'evidence', value: string) => void;
}

const PhaseCard: React.FC<PhaseCardProps> = ({ phase, tasks, onToggleTask, onUpdateTask }) => {
  return (
    <section className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
      <div className="p-4 md:p-6 bg-slate-800 border-b border-slate-700">
        <h2 className="text-xl md:text-2xl font-bold text-white">{phase.title}</h2>
        {phase.description && <p className="text-slate-400 mt-1">{phase.description}</p>}
      </div>
      <div className="p-4 md:p-6">
        {phase.tasks && phase.tasks.map(task => (
          <TaskItem key={task.id} task={tasks[task.id]} onToggle={onToggleTask} onUpdate={onUpdateTask} />
        ))}
        {phase.components && phase.components.map(component => (
          <div key={component.id} className="mb-6 last:mb-0">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-teal-400 flex items-center gap-2">
                <span className="text-2xl">{component.icon}</span>
                {component.title}
                </h3>
                {component.deadline && <DeadlineBadge deadline={component.deadline} />}
            </div>
            <div className="space-y-3">
              {component.tasks.map(task => (
                <TaskItem key={task.id} task={tasks[task.id]} onToggle={onToggleTask} onUpdate={onUpdateTask} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PhaseCard;
