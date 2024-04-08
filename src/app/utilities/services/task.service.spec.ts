import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import { Task } from '../models/interface.model';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a task with description to the list of tasks', () => {
    const initialTasks: Task[] = [
      {
        id: 1,
        title: 'Task 1',
        description: 'Description 1',
        dueDate: new Date(),
        priority: 'High',
        status: 'Pending',
      },
      {
        id: 2,
        title: 'Task 2',
        description: 'Description 2',
        dueDate: new Date(),
        priority: 'Medium',
        status: 'In Progress',
      },
    ];
    const newTask: Task = {
      id: 3,
      title: 'Task 3',
      description: 'Description 3',
      dueDate: new Date(),
      priority: 'Low',
      status: 'Completed',
    };

    service['tasks'] = initialTasks; // Mock existing tasks

    service.addTask(newTask);

    expect(service['tasks'].length).toBe(initialTasks.length + 1); // New task should be added
    expect(
      service['tasks'].find((task) => task.id === newTask.id)
    ).toBeTruthy(); // New task should be in the list
    expect(
      service['tasks'].find((task) => task.id === newTask.id)?.description
    ).toEqual(newTask.description); // New task's description should match
  });
});
