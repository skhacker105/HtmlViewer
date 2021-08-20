import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { IPageControl } from 'src/app/core/interfaces/PageControl';
import { ContainerControl } from 'src/app/core/modles/controls';
import { PageDesignerService } from 'src/app/core/services/page-designer.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit, OnChanges {

  @Input() control: ContainerControl;
  @Input() disabled: boolean;
  designMode: boolean;
  constructor(public pageDesignerService: PageDesignerService) {}

  ngOnInit(): void {
    this.pageDesignerService.designerMode.subscribe(mode => {
      this.designMode = mode;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  getSortedChildren(controls: IPageControl[]): IPageControl[] {
    const newArr: IPageControl[] = controls.sort((c1, c2) => {
      return c1.controlProperties.order - c2.controlProperties.order;
    });
    return newArr;
  }

}
