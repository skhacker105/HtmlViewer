import { Component, OnInit, Input } from "@angular/core";
import { IMenuAction } from "@change-history/shared/models/MenuActions";
import { CoreResources } from "@core/shared/utilities/resources";

@Component({
  selector: 'app-menu-action',
  templateUrl: './menu-action.component.html',
  styleUrls: ['./menu-action.component.scss']
})
export class MenuActionComponent implements OnInit {

  @Input() menuAction: IMenuAction;
  cr = CoreResources.CrudActions;

  constructor() { }

  ngOnInit(): void {
  }

}
