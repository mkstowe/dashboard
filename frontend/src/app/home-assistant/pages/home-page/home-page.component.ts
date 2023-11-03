import { Component, OnInit } from '@angular/core';
import { CardGroup } from '../../models/card-group';
import { HassService } from '../../services/hass.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCardModalComponent } from '../../components/add-card-modal/add-card-modal.component';
import { AddGroupModalComponent } from '../../components/add-group-modal/add-group-modal.component';
import { Observable, defaultIfEmpty, forkJoin, map, switchMap, take } from 'rxjs';
import { Card } from '../../models/card';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  public groups: Observable<CardGroup[]>;
  public cards: Card[];

  public sidebarActive = false;
  public editMode = false;

  constructor(private hassService: HassService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.hassService.editMode$.subscribe((res) => {
      this.editMode = res;
    });

    const groups$ = this.hassService.getAllGroups();
    const groupsWithCards$ = groups$.pipe(
      switchMap((groups: any) => {
        const cardObservables = groups.map((group: any) => {
          return this.hassService
            .getCardsByGroup(group.id)
            .pipe(map((cards) => ({ ...group, cards })));
        });

        return forkJoin(cardObservables);
      }),
      defaultIfEmpty([])
    );

    this.groups = this.hassService.refetch.pipe(
      switchMap(() => {
        return groupsWithCards$;
      })
    ) as Observable<CardGroup[]>;
  }

  public toggleSidebar() {
    this.sidebarActive = !this.sidebarActive;
  }

  public toggleEdit() {
    this.hassService.setEditMode(!this.editMode);
  }

  public onAddGroup(group?: any) {
    this.dialog.open(AddGroupModalComponent, {
      width: '700px',
      enterAnimationDuration: 100,
      exitAnimationDuration: 100,
      data: {
        group,
      },
    });
  }

  public onAddCard(group: number) {
    this.dialog.open(AddCardModalComponent, {
      width: '700px',
      height: '90%',
      maxHeight: '1200px',
      enterAnimationDuration: 100,
      exitAnimationDuration: 100,
      disableClose: true,
      data: {
        group,
      },
    });
  }

  onDragStart(event: any, item: any, list: any[]) {
    // console.log("start")
    // const index = list.indexOf(item);
    // console.log(ind /ex)
    // list.splice(index, 1);
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
      
      const groups = list.map((item: any, idx: number) => {
        return { id: item.id, index: idx }
      });
      this.hassService.reorderGroups(groups).pipe(take(1)).subscribe();
    }
  }
}
