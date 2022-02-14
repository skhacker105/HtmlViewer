import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { IActionResult } from "@core/interfaces/ActionResult";
import { Teams } from "@organization/models/teams";
import { TeamsService } from "@organization/services/teams.service";

interface TeamCrudAction {
  node: Teams,
  newItem: string
}

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  @Input() showActions = true;
  @Output() nodeClick = new EventEmitter();
  constructor(public teamsService: TeamsService) { }

  ngOnInit(): void {
  }

  handleAdd(action: TeamCrudAction) {
    const newChild: IActionResult = action.node.addChild(null, action.newItem);
    this.teamsService.registerAddteamsActions(newChild.obj);
  }

  handleUpdate(action: TeamCrudAction) {
    action.node.name = action.newItem;
    this.teamsService.registerUpdateteamsAction(action.node);
  }

  handleDelete(node: Teams) {
    const parentTeam = this.teamsService.getTeamParentByTeamId(this.teamsService.parentTeams, node.Id);
    if (parentTeam) {
      const index = parentTeam.children.findIndex(ta => ta.Id === node.Id);
      if (index >= 0) {
        this.teamsService.registerDeleteteamsAction(node);
        this.registerAllChildForDelete(node);
        parentTeam.children.splice(index, 1);
      }
    }
  }

  registerAllChildForDelete(node: Teams) {
    if (node.children) {
      node.children.forEach(c => {
        this.teamsService.registerDeleteteamsAction(c);
        this.registerAllChildForDelete(c);
      });
    }
  }

  handleClick(node: Teams) {
    this.nodeClick.emit(node);
  }

}
