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
import { BehaviorSubject, Subject, take, takeUntil } from 'rxjs';
import { Card } from '../../models/card';
import { HassService } from '../../services/hass.service';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';

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
  public editMode = false;

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
    this.hassService.editMode$.subscribe((res) => {
      this.editMode = res;
    })

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

  onDragStart(event: any, item: any, list: any[]) {

  }

  onDragged(item: any, list: any[], effect: DropEffect) {
    if (effect === 'move') {
      const index = list.indexOf(item);
      list.splice(index, 1);
    }
  }

  onDrop(event: DndDropEvent, list: any[]) {
    if (list && (event.dropEffect === 'copy' || event.dropEffect === 'move')) {
      let index = event.index;
      if (typeof index === 'undefined') {
        index = list.length;
      }

      list.splice(index, 0, event.data);

      const cards = list.map((item: any, idx: number) => {
        return { id: item.id, index: idx }
      });
      
      this.hassService.reorderCards(cards).pipe(take(1)).subscribe();
    }
  }
}
