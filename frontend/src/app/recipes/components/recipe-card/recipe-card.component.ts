import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent implements OnInit {
  @Input() id: string;
  @Input() name: string;
  @Input() summary: string;
  @Input() slug: string;
  @Input() hasImage: boolean;

  public imageUrl: string;

ngOnInit(): void {
  this.imageUrl = `${environment.mealieUrl}/api/media/recipes/${this.slug}/images/min-original.webp`;
}
}
