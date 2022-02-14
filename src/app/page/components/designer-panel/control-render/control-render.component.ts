import { Component, OnInit, Input } from "@angular/core";
import { IPageControl } from "@page/models/PageControl";
import { PageDesignerService } from "@page/services/page-designer.service";
import { PageResources } from "@page/utilities/page-resources";

@Component({
  selector: 'app-control-render',
  templateUrl: './control-render.component.html',
  styleUrls: ['./control-render.component.scss']
})
export class ControlRenderComponent implements OnInit {

  @Input() control: IPageControl;
  @Input() disabled: boolean;
  cr = PageResources;

  constructor(public pageDesignerService: PageDesignerService) { }

  ngOnInit(): void {
  }

}
