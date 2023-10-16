import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { NgChartsModule } from 'ng2-charts';
import { ColorPickerModule } from 'ngx-color-picker';
import { IconModule } from '../icon.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ButtonComponent } from './components/dynamic-form/button/button.component';
import { CheckboxComponent } from './components/dynamic-form/checkbox/checkbox.component';
import { DateComponent } from './components/dynamic-form/date/date.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form/dynamic-form.component';
import { InputComponent } from './components/dynamic-form/input/input.component';
import { RadioButtonComponent } from './components/dynamic-form/radio-button/radio-button.component';
import { SelectComponent } from './components/dynamic-form/select/select.component';
import { DynamicFieldDirective } from './directives/dynamic-field.directive';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DateAgoPipe,
    SidebarComponent,
    ConfirmationDialogComponent,
    ButtonComponent,
    CheckboxComponent,
    DateComponent,
    DynamicFormComponent,
    InputComponent,
    RadioButtonComponent,
    SelectComponent,
    DynamicFieldDirective,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    IconModule,
    ColorPickerModule,
    NgChartsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    MaterialModule,
    IconModule,
    NgChartsModule,
    ColorPickerModule,
    ReactiveFormsModule,
    DateAgoPipe,
    SidebarComponent,
    ConfirmationDialogComponent,
    DynamicFieldDirective,
    DynamicFormComponent,
  ],
})
export class SharedModule {}
