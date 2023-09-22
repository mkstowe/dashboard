import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { HassService } from './../../services/hass.service';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-group-modal',
  templateUrl: './add-group-modal.component.html',
  styleUrls: ['./add-group-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddGroupModalComponent implements OnInit {
  public addGroupForm: FormGroup;
  public groupExists: boolean;
  public confirmDelete: boolean;
  private group: any;

  constructor(private hassService: HassService, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<AddGroupModalComponent>, @Inject(MAT_DIALOG_DATA) data: { group: any }) {
    if (data?.group) {
      this.group = data.group;
      this.groupExists = true;
    }
  }

  public get title(): AbstractControl {
    return this.addGroupForm.get('title')!;
  }

  ngOnInit(): void {
    this.addGroupForm = this.formBuilder.group({
      title: [''],
    });

    if (this.group) {
      this.addGroupForm.patchValue({
        title: this.group.title
      })
    }
  }

  public onSubmit() {
    if (this.addGroupForm.pristine || this.addGroupForm.invalid) return;

    if (this.group) {
      this.hassService.updateGroup(this.group.id, this.addGroupForm.value).subscribe();
    } else {
      this.hassService.createGroup(this.addGroupForm.value).subscribe();
    }

    this.close();
  }

  public onDelete() {
    if (this.confirmDelete) {
      this.hassService.deleteGroup(this.group.id).subscribe();
      this.close();
    } else {
      this.confirmDelete = true;
    }
  }

  public close() {
    this.dialogRef.close();
  }
}
