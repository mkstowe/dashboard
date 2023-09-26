import { Router } from "@angular/router";
import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { HassService } from "../../services/hass.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Card } from "../../models/card";
import { CardType } from "../../models/card-types";

import { MatIconRegistry } from "@angular/material/icon"; 

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
  public cardTypes: any;
  public iconList: string[] = [];
  private card: Card;
  private group: number;

  constructor(
    private router: Router,
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

  public get entityId(): AbstractControl {
    return this.addCardForm.get("entityId")!;
  }

  public get icon(): AbstractControl {
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

  public get entityType(): AbstractControl {
    return this.addCardForm.get("entityType")!;
  }

  public get state(): AbstractControl {
    return this.addCardForm.get("state")!;
  }

  public get stateBeforeString(): AbstractControl {
    return this.addCardForm.get("stateBeforeString")!;
  }

  public get stateAfterString(): AbstractControl {
    return this.addCardForm.get("stateAfterString")!;
  }

  public get stateWarningExpression(): AbstractControl {
    return this.addCardForm.get("stateWarningExpression")!;
  }

  public get stateDangerExpression(): AbstractControl {
    return this.addCardForm.get("stateDangerExpression")!;
  }

  public get stateRound(): AbstractControl {
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
      this.iconList.push(key.slice(1))
    })

    this.addCardForm = this.formBuilder.group({
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
      type: [""],
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
        type: this.card.type,
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
  }

  public onSubmit() {
    if (this.addCardForm.pristine || this.addCardForm.invalid) return;

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

    this.close();
  }

  public onDelete() {
    if (this.confirmDelete) {
      this.hassService.deleteCard(this.card.id).subscribe();
      this.close();
    } else {
      this.confirmDelete = true;
    }
  }

  public close() {
    this.dialogRef.close();
  }
}
