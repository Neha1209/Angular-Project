import { FormArray, FormControl, FormGroup } from "@angular/forms";

export interface IBeneficiary {
    id: string;
    name: string;
    bankName: string;
    accountLast4: string;
}
export interface IAccount {
    id: string;
    nickname: string;
    balanceCents: number;
    currency: string;
}

export interface OnboardingFormData {
    name: FormControl<string>;
    email: FormControl<string>;
    phone: FormControl<string>;
    password: FormControl<string>;
    companyDetails?: FormGroup<CompanyDetailsForm>;
    signatories: FormArray<FormGroup<SignatoryForm>>;
}

export interface CompanyDetailsForm {
    companyName: FormControl<string>;
    companyAddress: FormControl<string>;
    companyPhone: FormControl<string>;
}

export interface SignatoryForm {
  name: FormControl<string>;
  email: FormControl<string>;
}