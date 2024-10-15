export interface Task {
  id: string;
  name: string;
  description?: string;
  status: 'TO DO' | 'IN PROGRESS' | 'DONE';
}
