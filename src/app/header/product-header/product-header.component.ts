import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ChangeHistoryComponent } from 'src/app/core/components/change-history/change-history.component';
import { MessagingService } from 'src/app/core/services/messaging.service';
import { PageDesignerService } from 'src/app/core/services/page-designer.service';
import { ProducMenuService } from 'src/app/core/services/produc-menu.service';
import { CoreResources } from 'src/app/core/utilities/resources';

@Component({
  selector: 'app-product-header',
  templateUrl: './product-header.component.html',
  styleUrls: ['./product-header.component.scss']
})
export class ProductHeaderComponent implements OnInit {

  selectedMenu: string;
  designerMode: boolean;
  constructor(
    public producMenuService: ProducMenuService, 
    private messagingService: MessagingService,
    public dialog: MatDialog,
    public pageDesignerService: PageDesignerService) { }

  ngOnInit(): void {
    this.designerMode = this.pageDesignerService.designerMode.value;
    this.loadProductMenu();
  }

  loadProductMenu() {
    this.producMenuService.getMenuFromDB().subscribe(res => {
      if (res) {
        if (res.length > 0) {
          this.producMenuService.converFlatMenuToNested(res);
          this.producMenuService.menuActions = [];
          this.handleMenuSelect(this.producMenuService.ProductMenuList[0].name);
        } else {
        }
      }
    });
  }

  handleMenuClick(menu: string): void {
    if (menu) {
      this.selectedMenu = menu;
    }
  }

  handleMenuSelect(menu: string): void {
    this.producMenuService.selectMenu(menu);
  }

  handleMenuAdd(menu: string) {
    if (this.selectedMenu && menu) {
      const result = this.producMenuService.addChildNode(this.selectedMenu, menu);
      this.messagingService.showSnackBar(result);
    }
  }

  handleMenuUpdate(menu: string): void {
    if (this.selectedMenu && menu) {
      const result = this.producMenuService.updateNode(this.selectedMenu, menu);
      this.messagingService.showSnackBar(result);
    }
  }

  handleMenuDelete(): void {
    if (this.producMenuService.selectedMenu) {
      const result = this.producMenuService.deleteMenu(this.selectedMenu);
      this.messagingService.showSnackBar(result);
    }
  }

  openChangeHistory(): void {
    this.dialog.open(ChangeHistoryComponent, {
      width: '80%',
      height: '70%'
    });
  }

  saveChanges() {
    this.producMenuService.saveAllChanges().subscribe(res => {
      this.producMenuService.menuActions = [];
      this.messagingService.showSnackBar({
        completed: true,
        message: CoreResources.MenuChangesSaveSuccess
      });
      this.loadProductMenu();
    });
    this.pageDesignerService.saveAllChanges().subscribe(res => {
      this.pageDesignerService.pageControlAction = [];
      this.messagingService.showSnackBar({
        completed: true,
        message: CoreResources.ControlsChangesSaveSuccess
      });
    });
  }

  addPageContainer() {
    this.pageDesignerService.addPageContainer();
  }

  toggle(event: MatSlideToggleChange) {
    this.designerMode = event.checked;
    this.pageDesignerService.setDesignerMode(event.checked);
  }

}
