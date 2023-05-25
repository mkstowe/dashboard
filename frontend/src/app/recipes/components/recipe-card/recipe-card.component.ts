import { Component, Input, OnInit } from '@angular/core';

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
    this.imageUrl = `/api/mealie/media/recipes/${this.id}/images/min-original.webp`;
  }
}
