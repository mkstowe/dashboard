import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Card } from '../../models/card';
import { BehaviorSubject, Observable, Subject, switchMap, take, takeUntil } from 'rxjs';
import { HassService } from '../../services/hass.service';
import { CardGroup } from '../../models/card-group';
import { MatDialog } from '@angular/material/dialog';
import { AddGroupModalComponent } from '../add-group-modal/add-group-modal.component';
import { AddCardModalComponent } from '../add-card-modal/add-card-modal.component';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit, OnDestroy {
  @Input() public group: CardGroup;
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  public cards: Observable<Card[]>;
  public currCards: Card[];
  public editMode = false;
  public start = 0;
  public end: number;
  
  private _index = new Subject<number>();
  private index = 0;
  private cardsPerPage = 4;
  private notifier$ = new Subject<void>();

  constructor(private hassService: HassService, private dialog: MatDialog) {}

  public ngOnDestroy(): void {
    this.notifier$.next();
    this.notifier$.complete();
  }

  public ngOnInit(): void {
    this.end = this.cardsPerPage;

    this.hassService.editMode$.subscribe((res) => {
      this.editMode = res;
    });

    this.cards = this.hassService.refetch.pipe(
      switchMap(() => {
        return this.hassService.getCardsByGroup(this.group.id);
      })
    )
  }

  public onEditGroup() {
    this.dialog.open(AddGroupModalComponent, {
      width: '700px',
      enterAnimationDuration: 100,
      exitAnimationDuration: 100,
      data: {
        group: this.group
      }
    })
  }

  public onAddCard() {
    this.dialog.open(AddCardModalComponent, {
      width: '700px',
      height: '90%',
      maxHeight: '1200px',
      enterAnimationDuration: 100,
      exitAnimationDuration: 100,
      disableClose: true,
      data: {
        group: this.group.id
      }
    })
  }

  public onSwipe(event: any, length: number) {
    if (event.deltaX < -40) {
      if ((this.index + 1) * this.cardsPerPage < length) {
        this.index++;
      }
    } else if (event.deltaX > 40) {
      if (this.index > 0) {
        this.index--;
      }
    }

    this.start = this.index * this.cardsPerPage;
    this.end = this.start + this.cardsPerPage;
  }

  public isSensor(card: Card): boolean {
    return card.type === 'sensorCard';
  }

  public onDragStart(event: any, item: any, list: any) {

  }

  public onDragged(item: any, list: any[], effect: DropEffect) {
    if (effect === 'move') {
      const index  = list.indexOf(item);
      list.splice(index, 1);
      
      const cards = list.map((item: any, idx: number) => {
        return { id: item.id, index: idx };
      });

      this.hassService.reorderCards(cards).pipe(take(1)).subscribe();
    }
  }

  public onDrop(event: DndDropEvent, list: any[]) {
    if (list && (event.dropEffect === 'copy' || event.dropEffect === 'move')) {
      let index = event.index;
      if (typeof index === 'undefined') {
        index = list.length;
      }

      list.splice(index, 0, event.data);
    }
  }
}
