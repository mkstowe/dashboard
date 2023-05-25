import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent implements OnInit {
  @Input() public hasImage: boolean;
  @Input() public id: string;
  @Input() public name: string;
  @Input() public slug: string;
  @Input() public summary: string;

  public imageUrl: string;

  public ngOnInit(): void {
    this.imageUrl = `/api/mealie/media/recipes/${this.id}/images/min-original.webp`;
  }
}
