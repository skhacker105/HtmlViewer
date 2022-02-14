import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { ProducMenuService } from "@header/services/product-menu.service";

@Component({
  selector: 'app-change-history',
  templateUrl: './change-history.component.html',
  styleUrls: ['./change-history.component.scss']
})
export class ChangeHistoryComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ChangeHistoryComponent>,
    public producMenuService: ProducMenuService) { }

  ngOnInit(): void {
  }

  onOkClick(): void {
    this.dialogRef.close();
  }

}
