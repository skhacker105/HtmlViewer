import { Component, Input, OnInit } from '@angular/core';
import { IMenuAction } from '../../shared/models/MenuActions';
import { CoreResources } from '../../shared/utilities/resources';

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
