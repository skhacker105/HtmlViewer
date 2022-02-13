import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { ContainerControl } from "@page/models/controls";
import { PageDesignerService } from "@page/services/page-designer.service";
import { takeWhile } from "rxjs/operators";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit, OnDestroy {

  @Input() control: ContainerControl;
  @Input() disabled: boolean;
  isComponentActive = true;
  designMode: boolean;
  constructor(public pageDesignerService: PageDesignerService) { }

  ngOnInit(): void {
    this.pageDesignerService.designerMode.pipe(takeWhile(() => this.isComponentActive))
    .subscribe(mode => {
      this.designMode = mode;
    });
  }

  ngOnDestroy(): void {
    this.isComponentActive = false;
  }

}
