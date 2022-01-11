import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { ProducMenuService } from 'src/app/core/shared/services/product-menu.service';
import { PageDesignerService } from 'src/app/page/shared/services/page-designer.service';
import { ITeams } from '../../shared/interfaces/Teams';
import { TeamsService } from '../../shared/services/teams.service';
import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'app-menu-access',
  templateUrl: './menu-access.component.html',
  styleUrls: ['./menu-access.component.scss']
})
export class MenuAccessComponent implements OnInit, OnDestroy {

  isComponentActive = true;
  gridMaxColumns = 12;
  selectedTeam: ITeams;

  constructor(
    public usersService: UsersService,
    public teamsService: TeamsService,
    public producMenuService: ProducMenuService,
    public pageDesignerService: PageDesignerService
  ) { }

  ngOnInit(): void {
    this.loadAllTeamUserRoles();
  }

  ngOnDestroy(): void {
    this.isComponentActive = false;
  }

  loadAllTeamUserRoles() {
    if (!this.teamsService.parentTeams[0].children || this.teamsService.parentTeams[0].children.length === 0) {
      this.teamsService.getTeams().pipe(takeWhile(() => this.isComponentActive))
      .subscribe(res => {
        this.teamsService.converFlatTeamsToNested(res);
        this.gridMaxColumns = this.teamsService.flatTeams.length + 1;
      });
    }
    if (!this.usersService.users || this.usersService.users.length === 0) {
      this.usersService.getUsers().pipe(takeWhile(() => this.isComponentActive))
      .subscribe(res => {
        this.usersService.users = res;
      });
    }
  }

  handleSelectTeam(team: ITeams) {
    this.selectedTeam = team;
  }

}