import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { TextBoxControl } from "@page/shared/models/controls";
import { PageDesignerService } from "@page/shared/services/page-designer.service";
import { takeWhile } from "rxjs/operators";

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss']
})
export class TextBoxComponent implements OnInit, OnDestroy {

  @Input() control: TextBoxControl;
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
