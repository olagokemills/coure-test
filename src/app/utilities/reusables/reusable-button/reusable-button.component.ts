import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-reusable-button',
  template: `
    <button
      [disabled]="disabled"
      (click)="onClick.emit()"
      [ngClass]="extraClass.join(' ')"
      class="btn button"
    >
      <ng-container *ngIf="isLoading; else defaultContent">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </ng-container>
      <ng-template #defaultContent>
        {{ buttonText }}
      </ng-template>
    </button>
  `,
  styleUrls: ['./reusable-button.component.scss'],
})
export class ReusableButtonComponent {
  @Input() isLoading: boolean = false;
  @Input() buttonText: string = 'Submit';
  @Input() disabled: boolean = false;
  @Input() extraClass: string[] = [''];
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();
}
