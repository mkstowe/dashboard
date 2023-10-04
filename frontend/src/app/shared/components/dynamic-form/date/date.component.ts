import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from 'src/app/shared/models/field';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
})
export class DateComponent {
  field: FieldConfig;
  group: FormGroup;
}
