import { PlantService } from './../../services/plant.service';
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: "app-add-plant-modal",
  templateUrl: "./add-plant-modal.component.html",
  styleUrls: ["./add-plant-modal.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AddPlantModalComponent implements OnInit {
  public addPlantForm: FormGroup;

  constructor(private plantService: PlantService, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<AddPlantModalComponent>) {}

  public get name(): AbstractControl {
    return this.addPlantForm.get("name")!;
  }

  public get scientificName(): AbstractControl {
    return this.addPlantForm.get("scientificName")!;
  }

  public get type(): AbstractControl {
    return this.addPlantForm.get("type")!;
  }

  public get dateAdded(): AbstractControl {
    return this.addPlantForm.get("dateAdded")!;
  }

  public get temperature(): AbstractControl {
    return this.addPlantForm.get("temperature")!;
  }

  public get humidity(): AbstractControl {
    return this.addPlantForm.get("humidity")!;
  }

  public get isToxic(): AbstractControl {
    return this.addPlantForm.get("isToxic")!;
  }

  public get light(): AbstractControl {
    return this.addPlantForm.get("light")!;
  }

  public get water(): AbstractControl {
    return this.addPlantForm.get("water")!;
  }

  public get soil(): AbstractControl {
    return this.addPlantForm.get("soil")!;
  }

  public get fertilizer(): AbstractControl {
    return this.addPlantForm.get("fertilizer")!;
  }

  public get propagation(): AbstractControl {
    return this.addPlantForm.get("propagation")!;
  }

  public get repotting(): AbstractControl {
    return this.addPlantForm.get("repotting")!;
  }

  public get notes(): AbstractControl {
    return this.addPlantForm.get("notes")!;
  }

  ngOnInit(): void {
    this.addPlantForm = this.formBuilder.group({
      name: [""],
      scientificName: [""],
      type: [""],
      dateAdded: [null],
      temperature: [""],
      humidity: [""],
      isToxic: [false],
      light: [""],
      water: [""],
      soil: [""],
      fertilizer: [""],
      propagation: [""],
      repotting: [""],
      notes: [""],
    });
  }

  public onSubmit() {
    if (!this.addPlantForm.pristine && !this.addPlantForm.invalid) {
      this.plantService.createPlant(this.addPlantForm.value).subscribe();
      this.dialogRef.close();
    }
  }
}
