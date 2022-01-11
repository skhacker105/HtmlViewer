import { Component, Input, OnDestroy, OnInit, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { ContainerControl } from '../../../shared/models/controls';
import { IPageControl } from '../../../shared/models/PageControl';
import { PageDesignerService } from '../../../shared/services/page-designer.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit, OnDestroy {

  @Input() control: ContainerControl;
  @Input() disabled: boolean;
  isComponentActive = true;
  designMode: boolean;
  constructor(public pageDesignerService: PageDesignerService) {}

  ngOnInit(): void {
    this.pageDesignerService.designerMode.pipe(takeWhile(() => this.isComponentActive))
    .subscribe(mode => {
      this.designMode = mode;
    });
  }

  ngOnDestroy(): void {
    this.isComponentActive = false;
  }

  getSortedChildren(controls: IPageControl[]): IPageControl[] {
    const newArr: IPageControl[] = controls.sort((c1, c2) => {
      return c1.controlProperties.order - c2.controlProperties.order;
    });
    return newArr;
  }

}
