import { Component, Input, OnInit } from '@angular/core';
import { ContainerControl } from 'src/app/core/modles/controls';
import { PageDesignerService } from 'src/app/core/services/page-designer.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() control: ContainerControl;
  @Input() disabled: boolean;
  designMode: boolean;
  constructor(public pageDesignerService: PageDesignerService) { }

  ngOnInit(): void {
    this.pageDesignerService.designerMode.subscribe(mode => {
      this.designMode = mode;
    });
  }

}
