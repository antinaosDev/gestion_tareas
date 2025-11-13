import React, { useState, useMemo, useCallback } from 'react';
import { CHECKLIST_DATA } from './constants';
import { Task, Phase } from './types';
import Header from './components/Header';
import ProgressBar from './components/ProgressBar';
import PhaseCard from './components/PhaseCard';
import Chatbot from './components/Chatbot';
import GlossaryModal from './components/GlossaryModal';
import TimelineView from './components/TimelineView';
import ExportModal from './components/ExportModal';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Record<number, Task>>(() => {
    const initialTasks: Record<number, Task> = {};
    CHECKLIST_DATA.forEach(phase => {
      if (phase.tasks) {
        phase.tasks.forEach(task => {
          initialTasks[task.id] = task;
        });
      }
      if (phase.components) {
        phase.components.forEach(component => {
          component.tasks.forEach(task => {
            initialTasks[task.id] = task;
          });
        });
      }
    });
    return initialTasks;
  });
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const handleToggleTask = useCallback((taskId: number) => {
    setTasks(prevTasks => ({
      ...prevTasks,
      [taskId]: {
        ...prevTasks[taskId],
        completed: !prevTasks[taskId].completed,
      },
    }));
  }, []);

  const handleUpdateTask = useCallback((taskId: number, field: 'notes' | 'evidence', value: string) => {
    setTasks(prevTasks => ({
        ...prevTasks,
        [taskId]: {
            ...prevTasks[taskId],
            [field]: value,
        },
    }));
  }, []);

  const { totalTasks, completedTasks } = useMemo(() => {
    const taskValues = Object.values(tasks);
    return {
      totalTasks: taskValues.length,
      completedTasks: taskValues.filter((task: Task) => task.completed).length,
    };
  }, [tasks]);

  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <Header 
        onOpenGlossary={() => setIsGlossaryOpen(true)} 
        onOpenTimeline={() => setIsTimelineOpen(true)}
        onOpenExport={() => setIsExportModalOpen(true)}
      />
      <main className="container mx-auto p-4 md:p-8">
        <div className="sticky top-[73px] bg-slate-900 py-4 z-10">
            <ProgressBar progress={progress} completed={completedTasks} total={totalTasks} />
        </div>
        
        <div className="space-y-8 mt-6">
          {CHECKLIST_DATA.map((phase: Phase) => (
            <PhaseCard
              key={phase.id}
              phase={phase}
              tasks={tasks}
              onToggleTask={handleToggleTask}
              onUpdateTask={handleUpdateTask}
            />
          ))}
        </div>
      </main>
      <Chatbot />
      <GlossaryModal isOpen={isGlossaryOpen} onClose={() => setIsGlossaryOpen(false)} />
      <TimelineView isOpen={isTimelineOpen} onClose={() => setIsTimelineOpen(false)} />
      <ExportModal 
        isOpen={isExportModalOpen} 
        onClose={() => setIsExportModalOpen(false)} 
        tasks={tasks}
      />
    </div>
  );
};

export default App;