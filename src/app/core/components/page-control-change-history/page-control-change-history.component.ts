import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageDesignerService } from '../../services/page-designer.service';
import { CoreResources } from '../../utilities/resources';

@Component({
  selector: 'app-page-control-change-history',
  templateUrl: './page-control-change-history.component.html',
  styleUrls: ['./page-control-change-history.component.scss']
})
export class PageControlChangeHistoryComponent implements OnInit {

  controlChangeList = new MatTableDataSource();
  controlChangeHeaderList = ['row-action', 'control-name'];
  cr = CoreResources;

  constructor(public pageDesignerService: PageDesignerService) { }

  ngOnInit(): void {
    this.controlChangeList.data = this.pageDesignerService.pageControlAction;
  }

  getPropertyFormatedName(prop: string): string {
    const broken: string[] = prop.split(/(?=[A-Z])/);
    broken[0] = broken[0].charAt(0).toUpperCase() + broken[0].slice(1);
    return broken.join(' ');
  }

}
