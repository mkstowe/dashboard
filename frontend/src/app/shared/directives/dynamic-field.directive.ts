import { Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { InputComponent } from '../components/dynamic-form/input/input.component';
import { ButtonComponent } from '../components/dynamic-form/button/button.component';
import { SelectComponent } from '../components/dynamic-form/select/select.component';
import { DateComponent } from '../components/dynamic-form/date/date.component';
import { RadioButtonComponent } from '../components/dynamic-form/radio-button/radio-button.component';
import { CheckboxComponent } from '../components/dynamic-form/checkbox/checkbox.component';
import { FieldConfig } from '../models/field';
import { FormGroup } from '@angular/forms';

// const componentMapper = {
//   input: InputComponent,
//   button: ButtonComponent,
//   select: SelectComponent,
//   date: DateComponent,
//   radioButton: RadioButtonComponent,
//   checkbox: CheckboxComponent
// };

const componentMapper = new Map<string, any>([
  ["input", InputComponent],
  ["button", ButtonComponent],
  ["select", SelectComponent],
  ["date", DateComponent],
  ["radioButton", RadioButtonComponent],
  ["checkbox", CheckboxComponent]
])

@Directive({
  selector: '[appDynamicField]'
})
export class DynamicFieldDirective implements OnInit {
  @Input() field: FieldConfig;
  @Input() group: FormGroup;
  componentRef: any;

  constructor(private container: ViewContainerRef) { }

  ngOnInit(): void {
    // const factory = this.resolver.resolveComponentFactory(
      // componentMapper[this.field.type]
    // );
    console.log("HERE");
    this.componentRef = this.container.createComponent(componentMapper.get(this.field.type));
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;
  }

}
