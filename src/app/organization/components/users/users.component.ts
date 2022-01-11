import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { takeWhile } from 'rxjs/operators';
import { ConfirmationComponent } from 'src/app/core/components/confirmation/confirmation.component';
import { CoreResources } from 'src/app/core/shared/utilities/resources';
import { AddProductMenuComponent } from 'src/app/main-menu/add-product-menu/add-product-menu.component';
import { PageDesignerService } from 'src/app/page/shared/services/page-designer.service';
import { IUser } from '../../shared/interfaces/Users';
import { Users } from '../../shared/models/users';
import { RolesService } from '../../shared/services/roles.service';
import { TeamsService } from '../../shared/services/teams.service';
import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  isComponentActive = true;
  designMode: boolean
  cr = CoreResources;

  constructor(
    public usersService: UsersService, 
    private pageDesignerService: PageDesignerService,
    public dialog: MatDialog,
    public rolesService: RolesService,
    public teamsService: TeamsService) {
    this.pageDesignerService.designerMode.pipe(takeWhile(() => this.isComponentActive))
    .subscribe(mode => {
      this.designMode = mode;
    });
  }

  ngOnInit(): void {
    this.usersService.loadAllTeamUserRoles();
  }

  ngOnDestroy(): void {
    this.isComponentActive = false;
  }

  handleAdd() {
    this.handleAddEdit(null, CoreResources.CrudActions.Add);
  }

  handleAddEdit(user: IUser, action: string) {
    const dialogRef = this.dialog.open(AddProductMenuComponent, {
      data: { newMenu: user ? user.userName : '', title: ' User', action: action }
    });

    dialogRef.afterClosed().pipe(takeWhile(() => this.isComponentActive))
    .subscribe(result => {
      if (result && result.newMenu) {
        if (user) {
          // edit mode
          user.userName = result.newMenu;
          this.usersService.registerUpdateUserAction(user);
        } else {
          // add mode
          const newUser = new Users(null, result.newMenu);
          this.usersService.users.push(newUser);
          this.usersService.registerAddUserAction(newUser);
        }
      }
    });
  }

  handleDelete(user: IUser) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: CoreResources.DeleteConfirmationData
    });
    dialogRef.afterClosed().pipe(takeWhile(() => this.isComponentActive))
    .subscribe((confirmed: boolean) => {
      if (confirmed) {
        const index = this.usersService.users.findIndex(u => u.userId === user.userId);
        if (index >= 0) {
          this.usersService.registerDeleteUserAction(user);
          this.usersService.users.splice(index, 1);
        }
      }
    });


  }

  handleRoleChange(user: IUser, change: MatOptionSelectionChange) {
    user.roleId = change['value'];
    this.usersService.registerUpdateUserAction(user);
  }

  handleTeamsChange(user: IUser, change: MatOptionSelectionChange) {
    user.teamIds = change['value'];
    this.usersService.registerUpdateUserAction(user);
  }

}