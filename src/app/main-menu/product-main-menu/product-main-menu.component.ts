import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ConfirmationComponent } from 'src/app/core/components/confirmation/confirmation.component';
import { IFlatNode } from 'src/app/core/interfaces/FlatNode';
import { IProductMenuItem } from 'src/app/core/interfaces/ProductMenuItem';
import { PageDesignerService } from 'src/app/core/services/page-designer.service';
import { CoreResources } from 'src/app/core/utilities/resources';
import { AddProductMenuComponent } from '../add-product-menu/add-product-menu.component';

@Component({
  selector: 'app-product-main-menu',
  templateUrl: './product-main-menu.component.html',
  styleUrls: ['./product-main-menu.component.scss']
})
export class ProductMainMenuComponent implements OnInit, OnChanges {

  @Input() menu: IProductMenuItem[];
  @Output() selectedMenu = new EventEmitter();
  @Output() clickedMenu = new EventEmitter();
  @Output() addMenu = new EventEmitter();
  @Output() updateMenu = new EventEmitter();
  @Output() deleteMenu = new EventEmitter();

  expanded = false;
  designMode: boolean;

  treeControl = new FlatTreeControl<IFlatNode>(
    node => node.level, node => node.expandable);
  private _transformer = (node: IProductMenuItem, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(public dialog: MatDialog, private pageDesignerService: PageDesignerService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.data = this.menu;
    this.expanded = false;
  }

  ngOnInit(): void {
    this.pageDesignerService.designerMode.subscribe(mode => {
      this.designMode = mode;
    });
  }

  hasChild = (_: number, node: IFlatNode) => node.expandable;

  openDialog(node: IFlatNode): void {
    this.clickedMenu.emit(node.name);
    const dialogRef = this.dialog.open(AddProductMenuComponent, {
      data: { newMenu: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.newMenu) {
        this.addMenu.emit(result.newMenu);
      }
    });
  }

  handleDeleteMenu(node: IFlatNode): void {
    this.clickedMenu.emit(node.name);
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: CoreResources.DeleteConfirmationData
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteMenu.emit();
      }
    });
  }

  handleEdit(node: IFlatNode): void {
    this.clickedMenu.emit(node.name);
    const dialogRef = this.dialog.open(AddProductMenuComponent, {
      data: { newMenu: node.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.newMenu) {
        this.updateMenu.emit(result.newMenu);
      }
    });
  }

  selectMenu(node: IFlatNode): void {
    this.selectedMenu.emit(node.name);
  }

  expandAll() {
    this.treeControl.expandAll();
    this.expanded = true;
  }

  collapseAll() {
    this.treeControl.collapseAll();
    this.expanded = false;
  }

}
