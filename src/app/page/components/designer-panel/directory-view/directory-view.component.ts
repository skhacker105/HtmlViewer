import { Component, OnInit, OnDestroy } from "@angular/core";
import { IPageControl } from "@page/models/PageControl";
import { PageDesignerService } from "@page/services/page-designer.service";
import { takeWhile } from "rxjs/operators";

@Component({
  selector: 'app-directory-view',
  templateUrl: './directory-view.component.html',
  styleUrls: ['./directory-view.component.scss']
})
export class DirectoryViewComponent implements OnInit, OnDestroy {

  selectedControl: IPageControl;
  isComponentActive = true;
  dictionaryAllowedControl: IPageControl[];

  constructor(public pageDesignerService: PageDesignerService) { }

  ngOnInit(): void {
    this.pageDesignerService.selectedControl.pipe(takeWhile(() => this.isComponentActive))
    .subscribe(control => {
      this.selectedControl = control;
      this.dictionaryAllowedControl = [];
      this.reloadDictionaryList();
    });
  }

  ngOnDestroy(): void {
    this.isComponentActive = false;
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
