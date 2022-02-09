import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { MatDialog } from "@angular/material/dialog";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { Router } from "@angular/router";
import { ChangeHistoryComponent } from "@change-history/components/change-history/change-history.component";
import { MessagingService } from "@core/shared/services/messaging.service";
import { UserService } from "@core/shared/services/user.service";
import { ProducMenuService } from "@header/shared/services/product-menu.service";
import { HeaderResources } from "@header/shared/utilities/header-resources";
import { OrganizationTeamUserRolesComponent } from "@organization/components/organization-team-user-roles/organization-team-user-roles.component";
import { InputOutputComponent } from "@page/components/designer-panel/input-output/input-output.component";
import { PageDesignerService } from "@page/shared/services/page-designer.service";
import { PageIOService } from "@page/shared/services/page-io.service";
import { takeWhile } from "rxjs/operators";

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
    public pageIOService: PageIOService,
    public userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.designerMode = this.pageDesignerService.designerMode.value;
  }

  ngOnDestroy(): void {
    this.isComponentActive = false;
  }

  loadProductMenu() {
    this.producMenuService.loadProductMenu();
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
        message: HeaderResources.MenuChangesSaveSuccess
      });
      this.loadProductMenu();
    });
    this.pageDesignerService.saveAllChanges().pipe(takeWhile(() => this.isComponentActive))
    .subscribe(res => {
      this.pageDesignerService.pageControlAction = [];
      this.messagingService.showSnackBar({
        completed: true,
        message: HeaderResources.ControlsChangesSaveSuccess
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

  logout() {
    this.userService.logoutUser().subscribe(res => {
      this.userService.resetLoggedInUser();
      this.router.navigateByUrl('/login');
    });
  }

}
