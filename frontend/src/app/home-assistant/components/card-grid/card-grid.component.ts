import {
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-card-grid',
  templateUrl: './card-grid.component.html',
  styleUrls: ['./card-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardGridComponent implements OnInit {
  @ContentChildren('card') children: QueryList<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() cards: any[];

  private index = 0;
  private _index = new BehaviorSubject<number>(0);
  private cardsPerPage = 4;
  public currCards: any[];

  ngOnInit(): void {
    this._index.subscribe((idx) => {
      this.currCards = this.cards.slice(
        idx * this.cardsPerPage,
        idx * this.cardsPerPage + this.cardsPerPage
      );
    });
  }

  onSwipe(event: any) {
    if (event.deltaX < -40) {
      if ((this.index + 1) * this.cardsPerPage < this.cards.length) {
        this.index++;
        this._index.next(this.index);
      }
    } else if (event.deltaX > 40) {
      if (this.index > 0) {
        this.index--;
        this._index.next(this.index);
      }
    }
  }
}
