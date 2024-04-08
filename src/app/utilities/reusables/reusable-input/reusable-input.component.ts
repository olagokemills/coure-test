import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reusable-input',
  templateUrl: './reusable-input.component.html',
  styleUrls: ['./reusable-input.component.scss'],
})
export class ReusableInputComponent {
  @Input() controlName!: string;
  @Input() placeholder!: string;
  @Input() type: string = 'text';
  @Input() selectedOption?: string;
  @Input() formGroup!: FormGroup;
  ListTypes: Array<string> = ['1', '2', '3'];
  @Input() optionsList!: Array<string>;
  constructor() {}
  ngOnInit(): void {}

  shouldDisplayError(): boolean {
    const control: AbstractControl | null = this.formGroup.get(
      this.controlName
    );
    return control ? control.touched && control.invalid : false;
  }

  getErrorMessage(): string {
    const control: AbstractControl | null = this.formGroup.get(
      this.controlName
    );
    if (control && control.errors) {
      if (control.errors?.['required']) {
        return 'This field is required.';
      } else if (control.errors?.['pattern']) {
        return 'Invalid format.';
      }
    }
    return 'Invalid input.';
  }
}
