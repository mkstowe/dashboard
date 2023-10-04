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
import { HassService } from '../../services/hass.service';

@Component({
  selector: 'app-card-grid',
  templateUrl: './card-grid.component.html',
  styleUrls: ['./card-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardGridComponent implements OnInit, OnDestroy {
  @ContentChildren('card') public children: QueryList<HTMLElement>;
  @Input() public cards: Card[];
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  public currCards: Card[];

  private _index = new BehaviorSubject<number>(0);
  private cardsPerPage = 4;
  private index = 0;
  private notifier$ = new Subject<void>();

  constructor(private hassService: HassService) {}

  public ngOnDestroy(): void {
    this.notifier$.next();
    this.notifier$.complete();
  }

  public ngOnInit(): void {
    for (const card of this.cards) {
      if (card.type === 'sensorCard') {
        this.hassService.getSensorsByCard(card.id).subscribe((sensors: any) => {
          card.sensors = sensors;
        });
      }
    }

    this._index.pipe(takeUntil(this.notifier$)).subscribe((idx) => {
      this.currCards = this.cards.slice(
        idx * this.cardsPerPage,
        idx * this.cardsPerPage + this.cardsPerPage
      );
    });
  }

  public onSwipe(event: any) {
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

  public isSensor(card: Card): boolean {
    return card.type === 'sensorCard';
  }
}
