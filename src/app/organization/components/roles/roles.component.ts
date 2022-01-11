import { Component, OnInit } from '@angular/core';
import { IActionResult } from 'src/app/core/shared/interfaces/ActionResult';
import { Roles } from '../../shared/models/roles';
import { RolesService } from '../../shared/services/roles.service';

interface RolesCrudAction {
  node: Roles,
  newItem: string
}

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  constructor(public rolesService: RolesService) { }

  ngOnInit(): void {
  }

  handleAdd(action: RolesCrudAction) {
    const newChild: IActionResult = action.node.addChild(null, action.newItem);
    this.rolesService.registerAddRolesAction(newChild.obj);
  }

  handleUpdate(action: RolesCrudAction) {
    action.node.name = action.newItem;
    this.rolesService.registerUpdateRolesAction(action.node);
  }

  handleDelete(node: Roles) {
    const parentRole = this.rolesService.getRoleParentByRoleId(this.rolesService.parentRoles, node.Id);
    if (parentRole) {
      const index = parentRole.children.findIndex(ta => ta.Id === node.Id);
      if (index >= 0) {
        this.rolesService.registerDeleteRolesAction(node);
        this.registerAllChildForDelete(node);
        parentRole.children.splice(index, 1);
      }
    }
  }

  registerAllChildForDelete(node: Roles) {
    if (node.children) {
      node.children.forEach(c => {
        this.rolesService.registerDeleteRolesAction(c);
        this.registerAllChildForDelete(c);
      });
    }
  }

}
