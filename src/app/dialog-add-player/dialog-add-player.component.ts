import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
//Material Design Components//
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../material.module';


@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
  ],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})
export class DialogAddPlayerComponent {
name: string = '';

constructor(private dialog: MatDialog, public dialogRef: MatDialogRef<DialogAddPlayerComponent>,) {}

onNoClick() {
  this.dialogRef.close();
}
}
