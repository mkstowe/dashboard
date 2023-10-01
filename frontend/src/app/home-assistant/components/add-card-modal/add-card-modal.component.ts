import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { HassService } from "../../services/hass.service";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Card } from "../../models/card";
import { CardType } from "../../models/card-types";

import { MatIconRegistry } from "@angular/material/icon"; 
import { Observable, map, startWith } from "rxjs";
import { ConfirmationDialogComponent } from "src/app/shared/components/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: "app-add-card-modal",
  templateUrl: "./add-card-modal.component.html",
  styleUrls: ["./add-card-modal.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AddCardModalComponent implements OnInit {
  public addCardForm: FormGroup;
  public cardExists: boolean;
  public confirmDelete: boolean;
  public confirmClose: boolean;
  public cardTypes: {key: string, value: CardType}[];
  public iconList: string[] = [];
  public filteredIcons: Observable<string[]>;
  public filteredActiveIcons: Observable<string[]>;
  public formInvalid: boolean;
  public isSensorCard: boolean;
  private card: Card;
  private group: number;

  constructor(
    private dialog: MatDialog,
    private hassService: HassService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddCardModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: { group: number, card: Card },
    private iconRegistry: MatIconRegistry
  ) {
    if (data?.card) {
      this.card = data.card;
      this.cardExists = true;
    }

      this.group = data.group!;
  }

  public get entityType(): AbstractControl {
    return this.addCardForm.get("entityType")!;
  }

  public get entityId(): AbstractControl {
    return this.addCardForm.get("entityId")!;
  }

  public get entityId2(): AbstractControl {
    return this.addCardForm.get("entityId2")!;
  }

  public get icon(): AbstractControl {
    return this.addCardForm.get("icon")!;
  }

  public get icon2(): AbstractControl {
    return this.addCardForm.get("icon")!;
  }

  public get iconActive(): AbstractControl {
    return this.addCardForm.get("iconActive")!;
  }

  public get lock(): AbstractControl {
    return this.addCardForm.get("lock")!;
  }

  public get name(): AbstractControl {
    return this.addCardForm.get("name")!;
  }

  public get name2(): AbstractControl {
    return this.addCardForm.get("name")!;
  }

  public get serviceDomain(): AbstractControl {
    return this.addCardForm.get("serviceDomain")!;
  }

  public get service(): AbstractControl {
    return this.addCardForm.get("service")!;
  }

  public get serviceData(): AbstractControl {
    return this.addCardForm.get("serviceData")!;
  }

  public get serviceTarget(): AbstractControl {
    return this.addCardForm.get("serviceTarget")!;
  }

  public get state(): AbstractControl {
    return this.addCardForm.get("state")!;
  }

  public get state2(): AbstractControl {
    return this.addCardForm.get("state")!;
  }

  public get stateBeforeString(): AbstractControl {
    return this.addCardForm.get("stateBeforeString")!;
  }

  public get stateBeforeString2(): AbstractControl {
    return this.addCardForm.get("stateBeforeString")!;
  }

  public get stateAfterString(): AbstractControl {
    return this.addCardForm.get("stateAfterString")!;
  }

  public get stateAfterString2(): AbstractControl {
    return this.addCardForm.get("stateAfterString")!;
  }

  public get stateWarningExpression(): AbstractControl {
    return this.addCardForm.get("stateWarningExpression")!;
  }

  public get stateWarningExpression2(): AbstractControl {
    return this.addCardForm.get("stateWarningExpression")!;
  }

  public get stateDangerExpression(): AbstractControl {
    return this.addCardForm.get("stateDangerExpression")!;
  }

  public get stateDangerExpression2(): AbstractControl {
    return this.addCardForm.get("stateDangerExpression")!;
  }

  public get stateRound(): AbstractControl {
    return this.addCardForm.get("stateRound")!;
  }

  public get stateRound2(): AbstractControl {
    return this.addCardForm.get("stateRound")!;
  }

  ngOnInit(): void {
    this.cardTypes = Object.keys(CardType).map((key, idx) => {
      return {
        key,
        value: Object.values(CardType)[idx]
      }
    })
    this.iconRegistry['_svgIconConfigs'].forEach((value: any, key: string) => {
      this.iconList.push(key.slice(1));
    })

    this.addCardForm = this.formBuilder.group({
      type: ['entityCard', Validators.required],
      entityId: ["", Validators.required],
      icon: [""],
      iconActive: [""],
      lock: [false],
      name: [""],
      service: this.formBuilder.group({
        domain: [""],
        service: [""],
        // data: [""],
        target: this.formBuilder.group({
          entity_id: [""],
          area_id: [""],
          device_id: [""]
        }) 
      }), 
      state: [""],
      stateOptions: this.formBuilder.group({
        beforeString: [""],
        afterString: [""],
        warningExpression: [""],
        dangerExpression: [""],
        round: [false]
      }),
    });

    if (this.card) {
      const service = JSON.parse(this.card.service as string);
      const stateOptions = JSON.parse(this.card.stateOptions as string);

      this.addCardForm.patchValue({
        type: this.card.type,
        entityId: this.card.entityId,
        icon: this.card.icon,
        iconActive: this.card.iconActive,
        lock: this.card.lock,
        name: this.card.name,
        service: {
          domain: service.domain,
          service: service.service,
          // data: service.data,
          target: {
            entity_id: service.target.entity_id,
            area_id: service.target.area_id,
            device_id: service.target.device_id
          }
        },
        state: this.card.state,
        stateOptions: {
          beforeString: stateOptions.beforeString,
          afterString: stateOptions.afterString,
          warningExpression: stateOptions.warningExpression,
          dangerExpression: stateOptions.dangerExpression,
          round: stateOptions.round
        }
      });
    }

    this.filteredIcons = this.icon.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value || ''))
    )

    this.filteredActiveIcons = this.iconActive.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value || ''))
    )

    this.addCardForm.valueChanges.subscribe(() => {
      this.formInvalid = this.addCardForm.invalid;
      this.isSensorCard = this.addCardForm.get("type")!.value === "sensorCard";
    });
  }

  public onSubmit() {
    if (this.formInvalid || this.addCardForm.invalid) {
      this.formInvalid = true;
      return
    }
    if (this.addCardForm.pristine) this.dialogRef.close();

    const value = {
      entityId: this.addCardForm.value.entityId,
      icon: this.addCardForm.value.icon,
      iconActive: this.addCardForm.value.iconActive,
      lock: this.addCardForm.value.lock,
      name: this.addCardForm.value.name,
      service: JSON.stringify(this.addCardForm.value.service),
      type: this.addCardForm.value.type,
      state: this.addCardForm.value.state,
      stateOptions: JSON.stringify(this.addCardForm.value.stateOptions)
    }

    if (this.card) {
      this.hassService
        .updateCard(this.card.id, value as Partial<Card>)
        .subscribe();
    } else {
      this.hassService.createCard({...value as Card, group: this.group}).subscribe();
    }

    this.dialogRef.close();
  }

  public submitEntityForm(event: Event) {
    return event;
  }

  public onDelete() {
    if (this.confirmDelete) {
      this.hassService.deleteCard(this.card.id).subscribe();
      this.dialogRef.close();
    } else {
      this.confirmDelete = true;
    }
  }

  public close() {
    if (this.addCardForm.pristine) {
      this.dialogRef.close();
    } else {
      this.dialog.open(ConfirmationDialogComponent, {
        width: '400px',
        height: '220px',
        enterAnimationDuration: 100,
        exitAnimationDuration: 100
      }
      ).afterClosed().subscribe(result => result ? this.dialogRef.close() : null);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.iconList.filter((option) => option.toLowerCase().includes(filterValue));
  }
}