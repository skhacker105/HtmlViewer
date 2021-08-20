import { Component, OnInit } from '@angular/core';
import { IPageControl } from 'src/app/core/interfaces/PageControl';
import { PageDesignerService } from 'src/app/core/services/page-designer.service';

@Component({
  selector: 'app-directory-view',
  templateUrl: './directory-view.component.html',
  styleUrls: ['./directory-view.component.scss']
})
export class DirectoryViewComponent implements OnInit {

  selectedControl: IPageControl;
  dictionaryAllowedControl: IPageControl[];

  constructor(public pageDesignerService: PageDesignerService) { }

  ngOnInit(): void {
    this.pageDesignerService.selectedControl.subscribe(control => {
      this.selectedControl = control;
      this.dictionaryAllowedControl = [];
      this.reloadDictionaryList();
    });
  }

  reloadDictionaryList() {
    if (this.selectedControl) {
      const newDirectory = this.selectedControl.getDirectory();
      if (newDirectory.AllowedChildren) {
        newDirectory.AllowedChildren.forEach(ac => {
          this.dictionaryAllowedControl.push(this.pageDesignerService.getControlObjectByType(ac, '', '', '', 0));
        });
      }
    }
  }

  addChildControl(control: IPageControl) {
    this.pageDesignerService.addChildrenControl(control);
  }

}
