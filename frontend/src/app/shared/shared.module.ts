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

@NgModule({
  declarations: [DateAgoPipe, SidebarComponent, ConfirmationDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    IconModule,
    ColorPickerModule,
    NgChartsModule,
    ReactiveFormsModule,
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
  ],
})
export class SharedModule {}
