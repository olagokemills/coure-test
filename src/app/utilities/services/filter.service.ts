import { Injectable } from '@angular/core';
import { Task } from '../models/interface.model';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor() {}

  filterTasksByPriority(tasks: Task[], priority: string): Task[] {
    return tasks.filter((task) => task.priority === priority);
  }

  filterTasksByStatus(tasks: Task[], status: string): Task[] {
    return tasks.filter((task) => task.status === status);
  }

  // Method to apply multiple filters
  filterTasks(
    tasks: Task[],
    filters: { priority?: string; status?: string }
  ): Task[] {
    let filteredTasks = tasks;
    if (filters.priority) {
      filteredTasks = this.filterTasksByPriority(
        filteredTasks,
        filters.priority
      );
    }
    if (filters.status) {
      filteredTasks = this.filterTasksByStatus(filteredTasks, filters.status);
    }
    return filteredTasks;
  }
}
