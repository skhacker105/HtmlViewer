import { Component, Input, OnInit } from '@angular/core';
import { TextBoxControl } from 'src/app/core/modles/controls';
import { PageDesignerService } from 'src/app/core/services/page-designer.service';

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss']
})
export class TextBoxComponent implements OnInit {

  @Input() control: TextBoxControl;
  @Input() disabled: boolean;
  designMode: boolean;
  constructor(public pageDesignerService: PageDesignerService) { }

  ngOnInit(): void {
    this.pageDesignerService.designerMode.subscribe(mode => {
      this.designMode = mode;
    });
  }

}
