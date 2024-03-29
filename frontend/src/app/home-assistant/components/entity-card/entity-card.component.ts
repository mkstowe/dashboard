import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { DangerLevel, HassService } from '../../services/hass.service';
import { Observable, Subject, switchMap, take, takeUntil } from 'rxjs';
import { HassEntity } from 'home-assistant-js-websocket';
import { MatDialog } from '@angular/material/dialog';
import { AddCardModalComponent } from '../add-card-modal/add-card-modal.component';
import { DemoHassService } from '../../services/demo-hass.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-entity-card',
  templateUrl: './entity-card.component.html',
  styleUrls: ['./entity-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EntityCardComponent implements OnInit, OnDestroy {
  @Input() public card: any;

  public entity: HassEntity | undefined;
  public entityName: string;
  public entityState: string;
  public hasAction: boolean;
  public icon: string;
  public iconActive: string;
  public isActive: boolean;
  public unlocked: boolean;
  public sensors: Observable<any[]>;
  public editMode = false;
  public dangerLevel: DangerLevel = DangerLevel.Normal;
  public dangerLevels = DangerLevel;
  public stateActive: boolean;

  private lockTimer: number;
  private notifier$ = new Subject<void>();
  private onStates = ['on', 'playing'];

  constructor(
    private hassService: HassService,
    private auth: AuthService,
    private demoService: DemoHassService,
    public dialog: MatDialog
  ) {}

  public ngOnDestroy(): void {
    this.notifier$.next();
    this.notifier$.complete();
  }

  public ngOnInit(): void {
    this.hassService.entities.pipe(takeUntil(this.notifier$)).subscribe({
      next: (result) => {
        this.entity = this.card && result[this.card.entityId];
        this.entityName =
          this.card?.name || this.entity?.attributes.friendly_name || '';
        this.entityState = this.card?.state || this.entity?.state || '';
        this.icon = this.card?.icon || '';
        this.iconActive = this.card?.iconActive || '';

        if (this.onStates.includes(this.entityState)) {
          this.isActive = true;
        } else {
          this.isActive = false;
        }

        if (this.card.stateOptions) {
          this.stateActive = this.card.stateOptions.active;

          let state;
          if (this.stateActive) {
            state = this.hassService.resolveStateOptions(
              this.entityState,
              this.card.stateOptions
            );
          }

          if (state) {
            this.entityState = state.state;
            this.dangerLevel = state.dangerLevel;
          }
        }
      },
    });

    this.hassService.editMode$.subscribe((res) => {
      this.editMode = res;
    });

    if (this.card?.service) {
      this.hasAction = true;
    }

    this.sensors = this.hassService.refetch.pipe(
      switchMap(() => {
        return this.hassService.getSensorsByCard(this.card.id);
      })
    );
  }

  public onButtonClick($event: Event) {
    if (this.editMode) return;

    const service = this.card?.service;
    if (!this.card?.lock || this.unlocked) {
      const msg = {
        type: service.type || 'call_service',
        domain: service.domain || service.entityId?.split('.')[0],
        service: service.service || '',
        service_data: service.service_data,
        target: service.target || {
          entity_id: this.card?.entityId,
        },
      };

      this.auth.isDemo$.pipe(take(1)).subscribe((isDemo) => {
        if (isDemo) {
          this.demoService.callService(msg);
        } else {
          this.hassService.callService(msg);
        }
      });
    }

    if (this.card?.lock && !this.unlocked) {
      $event.stopPropagation();
      this.unlocked = true;
    }

    clearTimeout(this.lockTimer);
    this.startLockTimer();
  }

  public editCard() {
    this.dialog.open(AddCardModalComponent, {
      width: '700px',
      height: '90%',
      maxHeight: '1200px',
      enterAnimationDuration: 100,
      exitAnimationDuration: 100,
      disableClose: true,
      data: {
        card: this.card,
      },
    });
  }

  private startLockTimer() {
    if (this.editMode) return;

    this.lockTimer = window.setTimeout(() => (this.unlocked = false), 5000);
  }
}
