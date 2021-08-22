import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProductMenuComponent } from 'src/app/main-menu/add-product-menu/add-product-menu.component';
import { IUser } from '../../interfaces/Users';
import { Users } from '../../modles/users';
import { PageDesignerService } from '../../services/page-designer.service';
import { RolesService } from '../../services/roles.service';
import { TeamsService } from '../../services/teams.service';
import { UsersService } from '../../services/users.service';
import { CoreResources } from '../../utilities/resources';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  designMode: boolean

  constructor(
    public usersService: UsersService, 
    private pageDesignerService: PageDesignerService,
    public dialog: MatDialog,
    public rolesService: RolesService,
    public teamsService: TeamsService) {
    this.pageDesignerService.designerMode.subscribe(mode => {
      this.designMode = mode;
    });
  }

  ngOnInit(): void {
    this.usersService.loadAllTeamUserRoles();
  }

  handleAdd() {
    this.handleAddEdit(null);
  }

  handleAddEdit(user: IUser) {
    const dialogRef = this.dialog.open(AddProductMenuComponent, {
      data: { newMenu: user ? user.userName : '', title: ' User' }
    });

    dialogRef.afterClosed().subscribe(result => {
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
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
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
