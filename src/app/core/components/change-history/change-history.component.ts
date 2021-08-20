import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-history',
  templateUrl: './change-history.component.html',
  styleUrls: ['./change-history.component.scss']
})
export class ChangeHistoryComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ChangeHistoryComponent>) { }

  ngOnInit(): void {
  }

  onOkClick(): void {
    this.dialogRef.close();
  }

}
