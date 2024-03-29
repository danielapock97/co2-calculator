import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserTransport} from "../../entities/user-transport";

@Component({
  selector: 'app-dialog-save-user-input',
  templateUrl: './dialog-save-user-input.component.html',
  styleUrls: ['./dialog-save-user-input.component.css']
})
export class DialogSaveUserInputComponent{
  public checked: boolean = false

  constructor(
    public dialogRef: MatDialogRef<DialogSaveUserInputComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {inputData: UserTransport, transportMode: string}
    ) {
  }
}
