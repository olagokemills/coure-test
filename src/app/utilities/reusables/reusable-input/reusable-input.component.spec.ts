import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableInputComponent } from './reusable-input.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('YourComponent', () => {
  let component: ReusableInputComponent;
  let fixture: ComponentFixture<ReusableInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReusableInputComponent],
      imports: [ReactiveFormsModule, FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReusableInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the label with an asterisk', () => {
    const label = fixture.debugElement.query(By.css('label'));
    expect(label.nativeElement.textContent).toContain('*');
  });

  it('should display options in the select element if the type is "select"', () => {
    component.type = 'select';
    component.optionsList = ['Option 1', 'Option 2', 'Option 3'];
    fixture.detectChanges();

    const selectElement = fixture.debugElement.query(By.css('select'));
    expect(selectElement).toBeTruthy();

    const options = selectElement.nativeElement.querySelectorAll('option');
    expect(options.length).toBe(component.optionsList.length + 1);
    expect(options[0].textContent.trim()).toBe('Select {{ controlName }}');
    expect(options[1].textContent.trim()).toBe('Option 1');
    expect(options[2].textContent.trim()).toBe('Option 2');
    expect(options[3].textContent.trim()).toBe('Option 3');
  });
});
