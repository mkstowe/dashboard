import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HassService } from '../../services/hass.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Card } from '../../models/card';
import { CardType } from '../../models/card-types';

import { MatIconRegistry } from '@angular/material/icon';
import { Observable, map, startWith } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-add-card-modal',
  templateUrl: './add-card-modal.component.html',
  styleUrls: ['./add-card-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddCardModalComponent implements OnInit {
  public addCardForm: FormGroup;
  public entityForm: FormGroup;
  public sensorForm: FormGroup;
  public cardExists: boolean;
  public confirmDelete: boolean;
  public confirmClose: boolean;
  public cardTypes: { key: string; value: CardType }[];
  public iconList: string[] = [];
  public filteredIcons: Observable<string[]>;
  public filteredIcons2: Observable<string[]>;
  public filteredIcons3: Observable<string[]>;
  public filteredActiveIcons: Observable<string[]>;
  public formInvalid: boolean;
  public isSensorCard: boolean;
  public sensors: any[];
  private card: Card;
  private group: number;

  constructor(
    private dialog: MatDialog,
    private hassService: HassService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddCardModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: { group: number; card: Card },
    private iconRegistry: MatIconRegistry
  ) {
    if (data?.card) {
      this.card = data.card;
      this.cardExists = true;
    }

    this.group = data.group!;
  }

  ngOnInit(): void {
    this.cardTypes = Object.keys(CardType).map((key, idx) => {
      return {
        key,
        value: Object.values(CardType)[idx],
      };
    });
    this.iconRegistry['_svgIconConfigs'].forEach((value: any, key: string) => {
      this.iconList.push(key.slice(1));
    });

    this.addCardForm = this.formBuilder.group({
      type: ['entityCard', Validators.required],
    });

    this.entityForm = this.formBuilder.group({
      entityId: [''],
      icon: [''],
      iconActive: [''],
      lock: [false],
      name: [''],
      service: this.formBuilder.group({
        domain: [''],
        service: [''],
        target: this.formBuilder.group({
          entity_id: [''],
          area_id: [''],
          device_id: [''],
        }),
      }),
      state: [''],
      stateOptions: this.formBuilder.group({
        active: [true],
        beforeString: [''],
        afterString: [''],
        warningExpression: [''],
        dangerExpression: [''],
        round: [false],
        sidebar: [false],
      }),
    });

    this.sensorForm = this.formBuilder.group({
      sensor1: this.formBuilder.group({
        entityId: [''],
        icon: [''],
        name: [''],
        state: [''],
        stateOptions: this.formBuilder.group({
          active: [true],
          beforeString: [''],
          afterString: [''],
          warningExpression: [''],
          dangerExpression: [''],
          round: [false],
          sidebar: [false],
        }),
        enableGraph: [true],
      }),
      sensor2: this.formBuilder.group({
        entityId: [''],
        icon: [''],
        name: [''],
        state: [''],
        stateOptions: this.formBuilder.group({
          active: [true],
          beforeString: [''],
          afterString: [''],
          warningExpression: [''],
          dangerExpression: [''],
          round: [false],
          sidebar: [false],
        }),
        enableGraph: [true],
      }),
    });

    if (this.card) {
      this.hassService
        .getSensorsByCard(this.card.id)
        .subscribe((sensors: any) => {
          this.sensors = sensors;
        });

      this.addCardForm.patchValue({
        type: this.card.type,
      });

      if (this.card.type !== 'sensorCard') {
        this.entityForm.patchValue({
          entityId: this.card.entityId,
          icon: this.card.icon,
          iconActive: this.card.iconActive,
          lock: this.card.lock,
          name: this.card.name,
          service: this.card.service,
          state: this.card.state,
          stateOptions: this.card.stateOptions as string,
        });
      } else {
        this.isSensorCard = true;
        this.hassService
          .getSensorsByCard(this.card.id)
          .subscribe((sensors: any) => {
            this.sensorForm.patchValue({
              sensor1: {
                entityId: sensors[0].entityId,
                icon: sensors[0].icon,
                name: sensors[0].name,
                state: sensors[0].state,
                stateOptions: sensors[0].stateOptions,
                enableGraph: sensors[0].enableGraph,
              },
            });

            if (sensors[1]) {
              this.sensorForm.patchValue({
                sensor2: {
                  entityId: sensors[1].entityId,
                  icon: sensors[1].icon,
                  name: sensors[1].name,
                  state: sensors[1].state,
                  stateOptions: sensors[1].stateOptions,
                  enableGraph: sensors[1].enableGraph,
                },
              });
            }
          });
      }
    }

    this.filteredIcons = this.entityForm.get('icon')!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
    this.filteredIcons2 = this.sensorForm.get('sensor1')!.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value.icon || ''))
    );
    this.filteredIcons3 = this.sensorForm.get('sensor2')!.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value.icon || ''))
    );

    this.addCardForm.valueChanges.subscribe(() => {
      this.isSensorCard = this.addCardForm.get('type')!.value === 'sensorCard';
    });
  }

  public onSubmit() {
    if (
      this.addCardForm.invalid ||
      (this.addCardForm.value.type === 'sensorCard' &&
        this.sensorForm.invalid) ||
      (this.addCardForm.value.type !== 'sensorCard' && this.entityForm.invalid)
    ) {
      this.formInvalid = true;
      return;
    }
    if (
      this.addCardForm.pristine &&
      this.entityForm.pristine &&
      this.sensorForm.pristine
    ) {
      this.dialogRef.close();
    }

    if (this.addCardForm.value.type !== 'sensorCard') {
      const value: Partial<Card> = {
        entityId: this.entityForm.value.entityId,
        icon: this.entityForm.value.icon,
        iconActive: this.entityForm.value.iconActive,
        lock: this.entityForm.value.lock,
        name: this.entityForm.value.name,
        service: this.entityForm.value.service,
        type: this.addCardForm.value.type,
        state: this.entityForm.value.state,
        stateOptions: this.entityForm.value.stateOptions,
      };

      if (this.card) {
        this.hassService
          .updateCard(this.card.id, value as Partial<Card>)
          .subscribe();
      } else {
        this.hassService
          .createCard({ ...(value as Card), group: this.group })
          .subscribe();
      }
    } else {
      const sensor1Value = {
        entityId: this.sensorForm.value.sensor1.entityId,
        icon: this.sensorForm.value.sensor1.icon,
        name: this.sensorForm.value.sensor1.name,
        state: this.sensorForm.value.sensor1.state,
        stateOptions: this.sensorForm.value.sensor1.stateOptions,
        enableGraph: this.sensorForm.value.sensor1.enableGraph,
      };

      const sensor2Value = {
        entityId: this.sensorForm.value.sensor2.entityId,
        icon: this.sensorForm.value.sensor2.icon,
        name: this.sensorForm.value.sensor2.name,
        state: this.sensorForm.value.sensor2.state,
        stateOptions: this.sensorForm.value.sensor2.stateOptions,
        enableGraph: this.sensorForm.value.sensor2.enableGraph,
      };

      if (this.card) {
        this.hassService
          .updateSensor(this.sensors[0].id, sensor1Value)
          .subscribe();
        if (sensor2Value.entityId) {
          this.sensors[1]
            ? this.hassService
                .updateSensor(this.sensors[1].id, sensor2Value)
                .subscribe()
            : this.hassService
                .createSensor({ ...sensor2Value, card: this.card.id })
                .subscribe();
        }
      } else {
        this.hassService
          .createCard({
            type: this.addCardForm.value.type,
            group: this.group,
          } as Card)
          .subscribe((res: any) => {
            this.hassService
              .createSensor({ ...sensor1Value, card: res.card[0].id })
              .subscribe();
            if (sensor2Value.entityId) {
              this.hassService
                .createSensor({ ...sensor2Value, card: res.card[0].id })
                .subscribe();
            }
          });
      }
    }

    this.dialogRef.close();
  }

  public onDelete() {
    if (this.confirmDelete) {
      this.hassService.deleteCard(this.card.id).subscribe();
      this.dialogRef.close();
    } else {
      this.confirmDelete = true;
    }
  }

  public onEntityIdChanged() {
    const serviceForm = this.entityForm.get('service')!;
    if (
      serviceForm.value.domain ||
      serviceForm.value.service ||
      serviceForm.value.target.entity_id ||
      serviceForm.value.target.device_id ||
      serviceForm.value.area_id
    ) {
      return;
    }

    const entityId = this.entityForm.get('entityId')!.value;
    serviceForm.patchValue({
      domain: entityId.split('.')[0],
      service: 'toggle',
      target: {
        entity_id: entityId,
      },
    });
  }

  public close() {
    if (
      this.addCardForm.pristine &&
      this.entityForm.pristine &&
      this.sensorForm.pristine
    ) {
      this.dialogRef.close();
    } else {
      this.dialog
        .open(ConfirmationDialogComponent, {
          width: '400px',
          height: '220px',
          enterAnimationDuration: 100,
          exitAnimationDuration: 100,
        })
        .afterClosed()
        .subscribe((result) => (result ? this.dialogRef.close() : null));
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.iconList.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
