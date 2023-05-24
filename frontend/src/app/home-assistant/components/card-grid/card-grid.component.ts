import {
  Component,
  ContentChildren,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Card } from '../../models/card';

@Component({
  selector: 'app-card-grid',
  templateUrl: './card-grid.component.html',
  styleUrls: ['./card-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardGridComponent implements OnInit, OnDestroy {
  @ContentChildren('card') children: QueryList<HTMLElement>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() cards: Card[];

  private index = 0;
  private _index = new BehaviorSubject<number>(0);
  private notifier$ = new Subject<void>();
  private cardsPerPage = 4;
  public currCards: Card[];

  ngOnInit(): void {
    this._index.pipe(takeUntil(this.notifier$)).subscribe((idx) => {
      this.currCards = this.cards.slice(
        idx * this.cardsPerPage,
        idx * this.cardsPerPage + this.cardsPerPage
      );
    });
  }

  ngOnDestroy(): void {
    this.notifier$.next();
    this.notifier$.complete();
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
