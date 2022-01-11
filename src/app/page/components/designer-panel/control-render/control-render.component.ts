import { Component, OnInit, Input } from "@angular/core";
import { CoreResources } from "@core/shared/utilities/resources";
import { IPageControl } from "@page/shared/models/PageControl";
import { PageDesignerService } from "@page/shared/services/page-designer.service";

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
