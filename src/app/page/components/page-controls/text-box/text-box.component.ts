import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { TextBoxControl } from '../../../shared/models/controls';
import { PageDesignerService } from '../../../shared/services/page-designer.service';

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
