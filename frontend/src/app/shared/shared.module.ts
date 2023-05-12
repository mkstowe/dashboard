import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { NgChartsModule } from 'ng2-charts';
import { ColorPickerModule } from 'ngx-color-picker';
import { IconModule } from '../icon.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialModule, IconModule, ColorPickerModule, NgChartsModule],
  exports: [MaterialModule, IconModule, NgChartsModule, ColorPickerModule],
})
export class SharedModule {}
