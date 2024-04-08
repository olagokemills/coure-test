import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { FilterService } from './filter.service';
import { of } from 'rxjs';
import { Task } from '../models/interface.model';

describe('TaskService', () => {
  let taskService: TaskService;
  let filterService: FilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    taskService = TestBed.inject(TaskService);
    filterService = TestBed.inject(FilterService);
  });

  it('should be created', () => {
    expect(taskService).toBeTruthy();
  });

  it('should filter tasks by status', () => {
    const tasks: Task[] = [
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
      {
        id: 3,
        title: 'Task 3',
        description: 'Description 3',
        dueDate: new Date(),
        priority: 'Low',
        status: 'Completed',
      },
      {
        id: 4,
        title: 'Task 4',
        description: 'Description 4',
        dueDate: new Date(),
        priority: 'High',
        status: 'Pending',
      },
    ];

    spyOn(taskService, 'getTasks').and.returnValue(of(tasks));

    taskService.getTasks().subscribe((tasksArray: Task[]) => {
      const filteredTasks = filterService.filterTasks(tasksArray, {
        status: 'In Progress',
      });
      expect(filteredTasks.length).toBe(1);
      expect(
        filteredTasks.every((task) => task.status === 'In Progress')
      ).toBeTrue();
    });
  });

  it('should return all tasks when no filters are provided', () => {
    const tasks: Task[] = [
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
      {
        id: 3,
        title: 'Task 3',
        description: 'Description 3',
        dueDate: new Date(),
        priority: 'Low',
        status: 'Completed',
      },
    ];

    spyOn(taskService, 'getTasks').and.returnValue(of(tasks));

    taskService.getTasks().subscribe((tasksArray: Task[]) => {
      const filteredTasks = filterService.filterTasks(tasksArray, {});
      expect(filteredTasks.length).toBe(3);
      expect(filteredTasks).toEqual(tasks);
    });
  });

  it('should return an empty array if no tasks match the filter criteria', () => {
    const tasks: Task[] = [
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
      {
        id: 3,
        title: 'Task 3',
        description: 'Description 3',
        dueDate: new Date(),
        priority: 'Low',
        status: 'Completed',
      },
    ];

    spyOn(taskService, 'getTasks').and.returnValue(of(tasks));

    taskService.getTasks().subscribe((tasksArray: Task[]) => {
      const filteredTasks = filterService.filterTasks(tasksArray, {
        priority: 'Urgent',
      });
      expect(filteredTasks.length).toBe(0);
    });
  });
});
