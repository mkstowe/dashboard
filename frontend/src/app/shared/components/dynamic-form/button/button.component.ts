import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from 'src/app/shared/models/field';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  field: FieldConfig;
  group: FormGroup;
}
