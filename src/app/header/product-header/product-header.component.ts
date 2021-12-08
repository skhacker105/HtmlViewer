import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ChangeHistoryComponent } from 'src/app/core/components/change-history/change-history.component';
import { OrganizationTeamUserRolesComponent } from 'src/app/core/components/organization-team-user-roles/organization-team-user-roles.component';
import { MessagingService } from 'src/app/core/services/messaging.service';
import { PageDesignerService } from 'src/app/core/services/page-designer.service';
import { ProducMenuService } from 'src/app/core/services/produc-menu.service';
import { CoreResources } from 'src/app/core/utilities/resources';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { InputOutputComponent } from 'src/app/components/controls/input-output/input-output.component';
import { PageIOService } from 'src/app/core/services/page-io.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-product-header',
  templateUrl: './product-header.component.html',
  styleUrls: ['./product-header.component.scss']
})
export class ProductHeaderComponent implements OnInit, OnDestroy {

  selectedMenu: string;
  designerMode: boolean;
  isComponentActive = true;
  constructor(
    public producMenuService: ProducMenuService,
    private messagingService: MessagingService,
    public dialog: MatDialog,
    public pageDesignerService: PageDesignerService,
    private bottomSheet: MatBottomSheet,
    public pageIOService: PageIOService) { }

  ngOnInit(): void {
    this.designerMode = this.pageDesignerService.designerMode.value;
    this.loadProductMenu();
  }

  ngOnDestroy(): void {
    this.isComponentActive = false;
  }

  loadProductMenu() {
    this.producMenuService.getMenuFromDB().pipe(takeWhile(() => this.isComponentActive))
    .subscribe(res => {
      if (res) {
        this.producMenuService.flatMenu = res;
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
    this.producMenuService.saveAllChanges().pipe(takeWhile(() => this.isComponentActive))
    .subscribe(res => {
      this.producMenuService.menuActions = [];
      this.messagingService.showSnackBar({
        completed: true,
        message: CoreResources.MenuChangesSaveSuccess
      });
      this.loadProductMenu();
    });
    this.pageDesignerService.saveAllChanges().pipe(takeWhile(() => this.isComponentActive))
    .subscribe(res => {
      this.pageDesignerService.pageControlAction = [];
      this.messagingService.showSnackBar({
        completed: true,
        message: CoreResources.ControlsChangesSaveSuccess
      });
      this.pageDesignerService.loadPageControls(this.producMenuService.selectedMenuId);
    });
    this.pageIOService.saveAllChanges().pipe(takeWhile(() => this.isComponentActive))
    .subscribe(res => {
      this.pageIOService.ioActions = [];
      this.pageIOService.loadPageIO(this.producMenuService.selectedMenuId);
    });
  }

  addPageContainer() {
    this.pageDesignerService.addPageContainer();
  }

  toggle(event: MatSlideToggleChange) {
    this.designerMode = event.checked;
    this.pageDesignerService.setDesignerMode(event.checked);
  }

  openOrganization(): void {
    this.dialog.open(OrganizationTeamUserRolesComponent, {
      width: '100%',
      height: '90%'
    });
  }

  openDataFlow() {
    this.dialog.open(OrganizationTeamUserRolesComponent, {
      width: '100%',
      height: '90%'
    });
  }

  openInputOutput() {
    this.bottomSheet.open(InputOutputComponent, {
      panelClass: 'io-bottom-sheet'
    });
  }

}
