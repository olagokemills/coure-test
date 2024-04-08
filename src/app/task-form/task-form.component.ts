import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { UtilitiesService } from '../utilities/services/utilities.service';
import { FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../utilities/services/task.service';
import { Task } from '../utilities/models/interface.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  TaskForm!: FormGroup;
  action: string = 'Create';
  isDelete: boolean = false;
  TaskPriority: Array<string> = ['High', 'Medium', 'Low'];
  TaskStatus: Array<string> = ['In-progress', 'Completed', 'Pending'];
  @Output() taskAdded: EventEmitter<Task> = new EventEmitter<Task>();
  isLoading: boolean = false;
  @Input() task: Task | null = null;
  constructor(
    public dialogRef: MatDialogRef<TaskFormComponent>,
    private utils: UtilitiesService,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.action = this.data.instance;
    this.isDelete = this.action === 'Delete' ? true : false;
  }
  ngOnInit(): void {
    this.TaskForm = this.utils.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      dueDate: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
    if (this.action === 'Edit') {
      this.task = this.data.item;
      this.PatchForms(this.data.item);
    }
  }

  PatchForms(data: Task) {
    this.TaskForm.patchValue({
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      status: data.status,
      priority: data.priority,
    });
  }

  submitTask(data: any) {
    if (!this.TaskForm.valid) {
      this.utils.toastr.error('Kindly fill the missing fields');
      return;
    }
    this.isLoading = !this.isLoading;
    if (this.action === 'Edit') {
      const updatedTask: Task = { ...this.task, ...data };

      setTimeout(() => {
        this.taskService.editTask(updatedTask);
        this.utils.toastr.success('Task has been updated successfully');
        this.disolveModal();
      }, 1000);
    } else {
      const task = {
        ...data,
        id: this.utils.generateRandomDigits(),
      };
      setTimeout(() => {
        this.taskService.addTask(task);
        this.taskAdded.emit(task);
        this.TaskForm.reset();
        this.disolveModal();
      }, 1500);
    }
  }
  deleteTask(data: Task) {
    this.isLoading = !this.isLoading;
    setTimeout(() => {
      this.taskService.deleteTask(data.id);
      this.utils.toastr.success('Task has been deleted successfully');
      this.disolveModal();
    }, 1500);
  }

  disolveModal() {
    this.dialogRef.close();
  }
  getForms() {
    return this.TaskForm.controls;
  }
}
