import { Component, OnInit } from '@angular/core';
import { PageDesignerService } from '../../services/page-designer.service';
import { ProducMenuService } from '../../services/produc-menu.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  designerMode: boolean;

  constructor(public producMenuService: ProducMenuService, public pageDesignerService: PageDesignerService) { }

  ngOnInit(): void {
    this.pageDesignerService.designerMode.subscribe(mode => {
      this.designerMode = mode;
    });
  }

}
