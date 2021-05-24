import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: []
})
export class ConfirmDialogComponent implements OnInit {

  title: string;
  body: string;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any) {

    this.title = modalData.title;
    this.body = modalData.body;
  }

  ngOnInit(): void {
  }

  ok(): void {
    this.dialogRef.close({ event: 'confirm' });
  }

  close(): void {
    this.dialogRef.close({ event: 'close' });
  }
}
