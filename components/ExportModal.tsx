import React from 'react';
import { Task } from '../types';
import { CHECKLIST_DATA } from '../constants';
import { XMarkIcon, ArrowDownTrayIcon } from './icons';

// TypeScript declaration for jsPDF from CDN
declare global {
  interface Window {
    jspdf: any;
  }
}

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Record<number, Task>;
}

const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, tasks }) => {
  if (!isOpen) return null;

  const handleExportCSV = () => {
    const headers = ['ID', 'Fase', 'Componente', 'Tarea', 'Estado', 'Notas', 'Evidencia'];
    const rows: (string | number)[][] = [];

    const escapeCSV = (str: string) => `"${(str || '').replace(/"/g, '""')}"`;

    CHECKLIST_DATA.forEach(phase => {
      const phaseTitle = phase.title.replace('💡 Requisito de Gestión', '').trim();
      
      const processTask = (taskTemplate: Task, componentTitle: string) => {
          const task = tasks[taskTemplate.id];
          if (task) {
              rows.push([
                  task.id,
                  phaseTitle,
                  componentTitle,
                  escapeCSV(task.title),
                  task.completed ? 'Completado' : 'Pendiente',
                  escapeCSV(task.notes),
                  escapeCSV(task.evidence)
              ]);
          }
      };

      if (phase.tasks) {
          phase.tasks.forEach(task => processTask(task, 'N/A'));
      }
      if (phase.components) {
          phase.components.forEach(component => {
              component.tasks.forEach(task => processTask(task, component.title));
          });
      }
    });

    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.href) {
      URL.revokeObjectURL(link.href);
    }
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'reporte-salud-cultural.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onClose();
  };

  const handleExportPDF = () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Reporte de Avance: Plan de Trabajo Modelo de Salud Cultural', 14, 22);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Fecha de exportación: ${new Date().toLocaleDateString()}`, 14, 30);

    let finalY = 40;

    CHECKLIST_DATA.forEach(phase => {
        if(finalY > 250) { // Add new page if content is too long
            doc.addPage();
            finalY = 20;
        }

      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(phase.title, 14, finalY);
      finalY += 2;

      const body: any[] = [];
      const processTask = (taskTemplate: Task, componentTitle: string) => {
        const task = tasks[taskTemplate.id];
        if (task) {
           if (componentTitle !== 'N/A' && !body.find(row => row[0].content === componentTitle)) {
             body.push([{ content: componentTitle, colSpan: 4, styles: { fillColor: '#334155', textColor: '#94a3b8', fontStyle: 'bold' } }]);
           }
           body.push([
               { content: task.title },
               { content: task.completed ? '✓ Completado' : '✗ Pendiente' },
               { content: task.notes || '-' },
               { content: task.evidence || '-' }
           ]);
        }
      };

      if (phase.components) {
          phase.components.forEach(component => {
              component.tasks.forEach(task => processTask(task, component.title));
          });
      } else if (phase.tasks) {
          phase.tasks.forEach(task => processTask(task, 'N/A'));
      }

      doc.autoTable({
        startY: finalY,
        head: [['Tarea', 'Estado', 'Notas', 'Evidencia']],
        body: body,
        theme: 'grid',
        headStyles: { fillColor: '#0f172a', textColor: '#64748b' },
        styles: { fontSize: 8, cellPadding: 2, overflow: 'linebreak' },
        columnStyles: {
            0: { cellWidth: 60 },
            1: { cellWidth: 25 },
            2: { cellWidth: 'auto' },
            3: { cellWidth: 'auto' },
        }
      });
      finalY = doc.lastAutoTable.finalY + 10;
    });

    doc.save('reporte-salud-cultural.pdf');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-md border border-slate-700">
        <div className="p-4 border-b border-slate-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">Exportar Reporte de Avance</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 space-y-4">
            <p className="text-slate-300">Selecciona el formato en el que deseas descargar el reporte actual del checklist.</p>
            <button
                onClick={handleExportPDF}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
            >
                <ArrowDownTrayIcon className="w-5 h-5" />
                Exportar a PDF
            </button>
            <button
                onClick={handleExportCSV}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
            >
                <ArrowDownTrayIcon className="w-5 h-5" />
                Exportar a CSV
            </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;