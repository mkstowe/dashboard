import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/shared/models/field';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: FieldConfig[] = [];

  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  public get value() {
    return this.form.value;
  }

  ngOnInit(): void {
    this.form = this.createControl();
  }

  public onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.invalid) {
      this.submitForm.emit(this.form.value);
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  public createControl() {
    const group = this.formBuilder.group({});
    this.fields.forEach((field) => {
      if (field.type === 'button') return;
      const control = this.formBuilder.control(
        field.value,
        this.bindValidations(field.validations || [])
      );
      group.addControl(field.name, control);
    });
    return group;
  }

  public bindValidations(validations: any[]) {
    if (validations.length > 0) {
      const validList: any[] = [];
      validations.forEach((valid) => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
}
