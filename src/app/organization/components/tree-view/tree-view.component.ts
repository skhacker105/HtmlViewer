import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationComponent } from "@core/components/confirmation/confirmation.component";
import { AddProductMenuComponent } from "@header/components/product-main-menu/add-product-menu/add-product-menu.component";
import { OriganizationResources } from "@organization/utilities/organization-resources";
import { PageDesignerService } from "@page/services/page-designer.service";
import { takeWhile } from "rxjs/operators";

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent implements OnInit, OnDestroy {

  isComponentActive = true;
  selected: any;
  cr = OriganizationResources;
  @Input() title: string;
  @Input() data: any[];
  @Input() showActions = true;
  @Output() addClick = new EventEmitter();
  @Output() editClick = new EventEmitter();
  @Output() deleteClick = new EventEmitter();
  @Output() nodeClick = new EventEmitter();
  designMode: boolean
  constructor(public pageDesignerService: PageDesignerService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.pageDesignerService.designerMode.pipe(takeWhile(() => this.isComponentActive))
    .subscribe(mode => {
      this.designMode = mode;
    });
  }

  ngOnDestroy(): void {
    this.isComponentActive = false;
  }

  openDialog(parentNode: any, node: any, action: string): void {
    if (node) {
      node['selected'] = true;
    }
    const dialogRef = this.dialog.open(AddProductMenuComponent, {
      data: { newMenu: node ? node['name'] : '', title: ' ' + this.title, action: action }
    });

    dialogRef.afterClosed().pipe(takeWhile(() => this.isComponentActive))
    .subscribe(result => {
      if (node) {
        node['selected'] = false;
      }
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
    node['selected'] = true;
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: OriganizationResources.DeleteConfirmationData
    });
    dialogRef.afterClosed().pipe(takeWhile(() => this.isComponentActive))
    .subscribe((confirmed: boolean) => {
      node['selected'] = false;
      if (confirmed) {
        this.deleteClick.emit(node);
      }
    });
  }

  handleClick(node: any) {
    if (node['Id'] === '000') {
      return;
    }
    this.nodeClick.emit(node);
    if (!this.showActions) {
      this.selected = node;
    }
  }

}
