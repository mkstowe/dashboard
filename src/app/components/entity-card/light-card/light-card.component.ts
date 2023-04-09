import { Component } from '@angular/core';
import { EntityCardComponent } from '../entity-card.component';

@Component({
  selector: 'app-light-card',
  templateUrl: './light-card.component.html',
  styleUrls: ['./light-card.component.scss'],
})
export class LightCardComponent extends EntityCardComponent {
  public showOptions = true;
  public onRightMouseClick() {
    this.showOptions = !this.showOptions;
    return false;
  }
}
