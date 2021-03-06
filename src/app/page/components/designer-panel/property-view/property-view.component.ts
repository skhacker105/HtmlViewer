import { Component, OnInit, OnDestroy } from "@angular/core";
import { ControlPosition, ControlAlignment } from "@page/interfaces/enumerations";
import { PageDesignerService } from "@page/services/page-designer.service";
import { PageIOService } from "@page/services/page-io.service";
import { takeWhile } from "rxjs/operators";

@Component({
  selector: 'app-property-view',
  templateUrl: './property-view.component.html',
  styleUrls: ['./property-view.component.scss']
})
export class PropertyViewComponent implements OnInit, OnDestroy {

  controlProperties: string[];
  positions: { key: number, value: string }[];
  controlAlignments: { key: number, value: string }[];
  isComponentActive = true;
  constructor(public pageDesignerService: PageDesignerService, public pageIOService: PageIOService) { }

  ngOnInit(): void {
    this.generatePositions();
    this.generateControlAlignments();
    this.pageDesignerService.selectedControl.pipe(takeWhile(() => this.isComponentActive))
    .subscribe(control => {
      this.controlProperties = [];
      if (control) {
        this.getAllProperties();
      } else {
        this.controlProperties = [];
      }
    });
  }

  ngOnDestroy(): void {
    this.isComponentActive = false;
  }

  getAllProperties(): void {
    this.controlProperties = this.pageDesignerService.selectedControl.value.getProperties().sort((p1, p2) => {
      if (p1 === 'controlName') {
        return -1;
      } else if (p1 === 'controlId') {
        return -2;
      } else {
        return p1.charCodeAt(0) - p2.charCodeAt(0);
      }
    });
  }

  getPropertyFormatedName(prop: string): string {
    if (prop === 'controlName') {
      return 'Control Id';
    }
    const broken: string[] = prop.split(/(?=[A-Z])/);
    broken[0] = broken[0].charAt(0).toUpperCase() + broken[0].slice(1);
    return broken.join(' ');
  }

  getPropertyType(prop: string): string {
    let type: string;
    const controlPropoperty = this.pageDesignerService.selectedControl.value.controlProperties[prop];
    switch(prop) {
      case 'controlAlignment': type = 'controlAlignment'; break;
      case 'position': type = 'position'; break;
      case 'controlId': type = 'hidden'; break;
      case 'controlName': type = 'controlName'; break;
      case 'controlType': type = 'hidden'; break;
      case 'pageInput': type = 'pageInput'; break;
      case 'parentControlId': type = 'hidden'; break;
      default: type = 'text'; break;
    }
    switch (typeof controlPropoperty) {
      case 'boolean': type = 'trueFalse'; break;
    }
    return type;
  }

  generatePositions(): void {
    this.positions = [];
    let keys = Object.keys(ControlPosition);
    keys = keys.slice(keys.length / 2);
    keys.forEach(k => {
      this.positions.push({
        key: ControlPosition[k],
        value: (k[0].toUpperCase() + k.slice(1))
      })
    });
  }

  generateControlAlignments(): void {
    this.controlAlignments = [];
    let keys = Object.keys(ControlAlignment);
    keys.forEach(k => {
      this.controlAlignments.push({
        key: ControlAlignment[k],
        value: (k[0].toUpperCase() + k.slice(1))
      })
    });
  }

  deleteControl() {
    this.pageDesignerService.deleteControl(this.pageDesignerService.containers.value);
  }

  updateControl() {
    this.pageDesignerService.updateControl();
  }

}
