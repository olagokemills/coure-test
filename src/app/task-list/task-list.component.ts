import { Component } from '@angular/core';
import { TaskService } from '../utilities/services/task.service';
import { Task } from '../utilities/models/interface.model';
import { TaskFormComponent } from '../task-form/task-form.component';
import { UtilitiesService } from '../utilities/services/utilities.service';
import { FilterService } from '../utilities/services/filter.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  tasks: Task[] = [];
  ActionType: string = 'Create' || 'Edit' || 'Delete';
  filteredTasks: Task[] = [];
  filters: { [key: string]: string | undefined } = {};
  constructor(
    private taskService: TaskService,
    private utils: UtilitiesService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.applyFilters();
    });
  }

  OpenModal(action: string, item?: Task) {
    this.utils.dialog.open(TaskFormComponent, {
      width: '480px',
      data: {
        instance: action,
        item: item,
      },
    });
  }

  onFilterChange(filterType: string, value: any): void {
    this.filters[filterType] = value.target.value;
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredTasks = this.filterService.filterTasks(
      this.tasks,
      this.filters
    );
  }
  returnClass(data: string) {
    switch (data) {
      case 'Completed':
        return 'text-success';
      case 'Pending':
        return 'text-info';
      default:
        return 'text-primary-emphasis';
    }
  }
}
