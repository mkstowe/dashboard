import { PlantService } from './../../services/plant.service';
import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Plant } from '../../models/plant';

@Component({
  selector: "app-add-plant-modal",
  templateUrl: "./add-plant-modal.component.html",
  styleUrls: ["./add-plant-modal.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AddPlantModalComponent implements OnInit {
  public addPlantForm: FormGroup;
  public plantExists: boolean;
  private plant: Plant;

  constructor(private plantService: PlantService, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<AddPlantModalComponent>, @Inject(MAT_DIALOG_DATA) data: { plant: Plant }) {
    this.plant = data.plant;
    this.plantExists = true;
  }

  public get name(): AbstractControl {
    return this.addPlantForm.get("name")!;
  }

  public get scientificName(): AbstractControl {
    return this.addPlantForm.get("scientificName")!;
  }

  // public get image(): AbstractControl {
  // return this.addPlantForm.get('image')!;
  // }

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
      // image: [null],
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

    if (this.plant) {
      this.addPlantForm.patchValue({
        name: this.plant.name,
        scientificName: this.plant.scientificName,
        type: this.plant.type,
        dateAdded: this.plant.dateAdded,
        temperature: this.plant.temperature,
        humidity: this.plant.humidity,
        isToxic: this.plant.isToxic,
        light: this.plant.light,
        water: this.plant.water,
        soil: this.plant.soil,
        fertilizer: this.plant.fertilizer,
        propagation: this.plant.propagation,
        repotting: this.plant.repotting,
        notes: this.plant.notes
      })
    }
  }

  // public onFileUpload(event: any) {
  // const file = event.target.files[0];
  // }

  public onSubmit() {
    if (this.addPlantForm.pristine || this.addPlantForm.invalid) return;

    if (this.plant) {
      this.plantService.updatePlant(this.plant.id, this.addPlantForm.value).subscribe();
    } else {
      this.plantService.createPlant(this.addPlantForm.value).subscribe();
    }

    this.dialogRef.close();
  }
}
