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
      this.addCardForm.patchValue({
        // name: this.card.name,
      });
    }
  }

  public onSubmit() {
    if (this.addCardForm.pristine || this.addCardForm.invalid) return;

    if (this.card) {
      this.hassService
        .updateCard(this.card.id, this.addCardForm.value)
        .subscribe();
    } else {
      this.hassService.createCard({...this.addCardForm.value, group: this.group}).subscribe();
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
