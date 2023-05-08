import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { NgChartsModule } from 'ng2-charts';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialModule, ColorPickerModule, NgChartsModule],
  exports: [MaterialModule, NgChartsModule, ColorPickerModule],
})
export class SharedModule {}
