import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatSliderModule,
    MatPaginatorModule,
    MatGridListModule,
    MatDialogModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
  ],
  exports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatSliderModule,
    MatPaginatorModule,
    MatGridListModule,
    MatDialogModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule
  ],
  providers: [MatIconRegistry],
})
export class MaterialModule {}
