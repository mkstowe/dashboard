import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-plant-card',
  templateUrl: './plant-card.component.html',
  styleUrls: ['./plant-card.component.scss']
})
export class PlantCardComponent {
  @Input() id: number;
  @Input() name: string | undefined;
  @Input() scientificName: string | undefined;
}
