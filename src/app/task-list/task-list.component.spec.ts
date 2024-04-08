import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../utilities/services/task.service';
import { UtilitiesService } from '../utilities/services/utilities.service';
import { FilterService } from '../utilities/services/filter.service';
import { Task } from '../utilities/models/interface.model';
import { TaskFormComponent } from '../task-form/task-form.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: TaskService;
  let utilsService: UtilitiesService;
  let filterService: FilterService;
  let dialog: MatDialog;

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

  beforeEach(async () => {
    const taskServiceStub = {
      getTasks: jasmine.createSpy('getTasks').and.returnValue(of(tasks)),
    };

    const utilsServiceStub = {
      dialog: jasmine.createSpyObj('dialog', ['open']),
    };

    const filterServiceStub = {
      filterTasks: jasmine
        .createSpy('filterTasks')
        .and.callFake(
          (tasks: Task[], filters: { [key: string]: string | undefined }) => {
            return tasks;
          }
        ),
    };

    await TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      providers: [
        { provide: TaskService, useValue: taskServiceStub },
        { provide: UtilitiesService, useValue: utilsServiceStub },
        { provide: FilterService, useValue: filterServiceStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
    utilsService = TestBed.inject(UtilitiesService);
    filterService = TestBed.inject(FilterService);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch tasks on component initialization', () => {
    expect(taskService.getTasks).toHaveBeenCalled();
    expect(component.tasks).toEqual(tasks);
  });

  it('should open modal for creating a task', () => {
    component.OpenModal('Create');
    expect(utilsService.dialog.open).toHaveBeenCalledWith(
      TaskFormComponent,
      jasmine.any(Object)
    );
  });

  it('should open modal for editing a task', () => {
    const taskToEdit = tasks[0];
    component.OpenModal('Edit', taskToEdit);
    expect(utilsService.dialog.open).toHaveBeenCalledWith(
      TaskFormComponent,
      jasmine.objectContaining({
        data: {
          instance: 'Edit',
          item: taskToEdit,
        },
      })
    );
  });

  it('should open modal for deleting a task', () => {
    const taskToDelete = tasks[0];
    component.OpenModal('Delete', taskToDelete);
    expect(utilsService.dialog.open).toHaveBeenCalledWith(
      TaskFormComponent,
      jasmine.objectContaining({
        data: {
          instance: 'Delete',
          item: taskToDelete,
        },
      })
    );
  });

  it('should apply filters correctly', () => {
    const filters = { priority: 'High', status: 'Completed' };
    component.onFilterChange('priority', { target: { value: 'High' } });
    component.onFilterChange('status', { target: { value: 'Completed' } });
    expect(component.filters).toEqual(filters);
    expect(filterService.filterTasks).toHaveBeenCalledWith(tasks, filters);
    expect(component.filteredTasks).toEqual(tasks);
  });
});
