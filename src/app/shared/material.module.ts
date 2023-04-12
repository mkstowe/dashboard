import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatGridListModule } from '@angular/material/grid-list'

@NgModule({
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatSliderModule,
    MatPaginatorModule,
    MatGridListModule
  ],
  exports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatSliderModule,
    MatPaginatorModule,
    MatGridListModule
  ],
  providers: [MatIconRegistry],
})
export class MaterialModule {}
