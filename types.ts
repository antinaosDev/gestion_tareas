export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  notes: string;
  evidence: string;
}

export interface Component {
  id: string;
  icon: string;
  title: string;
  tasks: Task[];
  deadline?: string;
}

export interface Phase {
  id: string;
  title: string;
  description: string;
  components?: Component[];
  tasks?: Task[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface GlossaryTerm {
    term: string;
    definition: string;
}

export interface TimelineEntry {
    period: string;
    components: string[];
    sources: string;
}