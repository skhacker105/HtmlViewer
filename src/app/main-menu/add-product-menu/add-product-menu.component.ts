import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-product-menu',
  templateUrl: './add-product-menu.component.html',
  styleUrls: ['./add-product-menu.component.scss']
})
export class AddProductMenuComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddProductMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { newMenu: string }) { }

  ngOnInit(): void {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
