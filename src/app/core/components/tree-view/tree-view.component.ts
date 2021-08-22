import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProductMenuComponent } from 'src/app/main-menu/add-product-menu/add-product-menu.component';
import { PageDesignerService } from '../../services/page-designer.service';
import { CoreResources } from '../../utilities/resources';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent implements OnInit {

  @Input() data: any[];
  @Output() addClick = new EventEmitter();
  @Output() editClick = new EventEmitter();
  @Output() deleteClick = new EventEmitter();
  designMode: boolean
  constructor(public pageDesignerService: PageDesignerService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.pageDesignerService.designerMode.subscribe(mode => {
      this.designMode = mode;
    });
  }

  openDialog(parentNode: any, node: any): void {
    const dialogRef = this.dialog.open(AddProductMenuComponent, {
      data: { newMenu: node ? node['name'] : '', title: ' Team' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.newMenu) {
        if (parentNode) {
          this.addClick.emit({
            node: parentNode,
            newItem: result.newMenu
          });
        } else if (node) {
          this.editClick.emit({
            node: node,
            newItem: result.newMenu
          });
        }
      }
    });
  }

  deleteClicked(node: any) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: CoreResources.DeleteConfirmationData
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteClick.emit(node);
      }
    });
  }

}
