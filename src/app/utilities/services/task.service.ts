import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/interface.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(
    []
  );

  constructor() {
    this.loadTasksFromLocalStorage();
  }

  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  addTask(task: Task): void {
    this.tasks.push(task);
    this.updateLocalStorage();
    this.tasksSubject.next([...this.tasks]);
  }
  deleteTask(taskId: number): void {
    const index = this.tasks.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.updateLocalStorage();
      this.tasksSubject.next([...this.tasks]);
    }
  }
  private loadTasksFromLocalStorage(): void {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
      this.tasksSubject.next([...this.tasks]);
    }
  }

  editTask(updatedTask: Task): void {
    const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.updateLocalStorage();
      this.tasksSubject.next([...this.tasks]);
    }
  }

  private updateLocalStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
