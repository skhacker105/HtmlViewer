import { Component, OnInit, OnDestroy } from "@angular/core";
import { PageDesignerService } from "@page/shared/services/page-designer.service";
import { takeWhile } from "rxjs/operators";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  designerMode: boolean;
  isComponentActive = true;
  constructor(public pageDesignerService: PageDesignerService) { }

  ngOnInit(): void {
    this.pageDesignerService.designerMode.pipe(takeWhile(() => this.isComponentActive))
    .subscribe(mode => {
      this.designerMode = mode;
    });
  }

  ngOnDestroy(): void {
    this.isComponentActive = false;
  }

}
