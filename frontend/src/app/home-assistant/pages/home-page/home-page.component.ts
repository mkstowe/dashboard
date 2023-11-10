import { Component, OnInit } from '@angular/core';
import { CardGroup } from '../../models/card-group';
import { HassService } from '../../services/hass.service';
import { MatDialog } from '@angular/material/dialog';
import { AddGroupModalComponent } from '../../components/add-group-modal/add-group-modal.component';
import { Observable, switchMap, take } from 'rxjs';
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

    this.groups = this.hassService.refetch.pipe(
      switchMap(() => {
        return this.hassService.getAllGroups();
      })
    );
  }

  public toggleSidebar() {
    this.sidebarActive = !this.sidebarActive;
  }

  public toggleEdit() {
    this.hassService.setEditMode(!this.editMode);
  }

  public onAddGroup() {
    this.dialog.open(AddGroupModalComponent, {
      width: '700px',
      enterAnimationDuration: 100,
      exitAnimationDuration: 100,
    });
  }

  onDragStart(event: any, item: any, list: any[]) {}

  onDragged(item: any, list: any[], effect: DropEffect) {
    if (effect === 'move') {
      const index = list.indexOf(item);
      list.splice(index, 1);

      const groups = list.map((item: any, idx: number) => {
        return { id: item.id, index: idx };
      });

      this.hassService.reorderGroups(groups).pipe(take(1)).subscribe();
    }
  }

  onDrop(event: DndDropEvent, list: any[]) {
    if (list && (event.dropEffect === 'copy' || event.dropEffect === 'move')) {
      let index = event.index;
      if (typeof index === 'undefined') {
        index = list.length;
      }

      list.splice(index, 0, event.data);
    }
  }
}
