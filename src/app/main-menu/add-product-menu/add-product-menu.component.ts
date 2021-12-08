import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreResources } from 'src/app/core/utilities/resources';

@Component({
  selector: 'app-add-product-menu',
  templateUrl: './add-product-menu.component.html',
  styleUrls: ['./add-product-menu.component.scss']
})
export class AddProductMenuComponent implements OnInit {

  action: string;

  constructor(public dialogRef: MatDialogRef<AddProductMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { newMenu: string, title: string, action: string }) {
      switch(data.action) {
        case CoreResources.MenuCrudActions.Add: this.action = 'Add'; break;
        case CoreResources.MenuCrudActions.Update: this.action = 'Edit'; break;
        case CoreResources.MenuCrudActions.Delete: this.action = 'Delete'; break;
        default: this.action = '<<__noAction>>'; break;
      }
    }

  ngOnInit(): void {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
