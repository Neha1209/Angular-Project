import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OnboardingFormData, SignatoryForm } from '../services/interfaces';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnboardingComponent {
  isCompnyDetailsVisible: boolean = false;
  formData = new FormGroup<OnboardingFormData>({
    name: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    phone: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    signatories: new FormArray<FormGroup<SignatoryForm>>([]),
  },{ updateOn: 'blur' },);

  onSubmit() {
    if (this.formData.valid) {
      console.log('Form Data:', this.formData.value);
    } else {
      console.log('Form is invalid');
    }
  }

  onToggleCompanyDetails(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.isCompnyDetailsVisible = checkbox.checked;

    if (this.isCompnyDetailsVisible && !this.formData.get('companyDetails')) {
      this.formData.addControl(
        'companyDetails',
        new FormGroup({
          companyName: new FormControl('', {
            nonNullable: true,
            validators: Validators.required,
          }),
          companyAddress: new FormControl('', {
            nonNullable: true,
            validators: Validators.required,
          }),
          companyPhone: new FormControl('', {
            nonNullable: true,
            validators: Validators.required,
          }),
        }),
      );
    } else if (
      !this.isCompnyDetailsVisible &&
      this.formData.get('companyDetails')
    ) {
      this.formData.removeControl('companyDetails');
    }
  }

  addSignatory() {
  this.formData.controls.signatories.push(
    new FormGroup<SignatoryForm>({
      name: new FormControl('', { nonNullable: true, validators: Validators.required }),
      email: new FormControl('', { nonNullable: true, validators: Validators.required }),
    }),
  );
}

removeSignatory(index: number) {
  this.formData.controls.signatories.removeAt(index);
}
}