import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { IPageControl } from 'src/app/core/interfaces/PageControl';
import { PageDesignerService } from 'src/app/core/services/page-designer.service';
import { CoreResources } from 'src/app/core/utilities/resources';

@Component({
  selector: 'app-control-render',
  templateUrl: './control-render.component.html',
  styleUrls: ['./control-render.component.scss']
})
export class ControlRenderComponent implements OnInit {

  @Input() control: IPageControl;
  @Input() disabled: boolean;
  cr = CoreResources;

  constructor(public pageDesignerService: PageDesignerService) { }

  ngOnInit(): void {
  }

}
