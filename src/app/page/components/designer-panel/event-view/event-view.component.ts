import { Component, OnInit, OnDestroy } from "@angular/core";
import { MessagingService } from "@core/shared/services/messaging.service";
import { ProducMenuService } from "@header/shared/services/product-menu.service";
import { IODataTypes } from "@page/shared/interfaces/enumerations";
import { PageDesignerService } from "@page/shared/services/page-designer.service";
import { PageIOService } from "@page/shared/services/page-io.service";
import { PageResources } from "@page/shared/utilities/page-resources";
import { takeWhile } from "rxjs/operators";

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent implements OnInit, OnDestroy {

  controlEvents: string[];
  isComponentActive = true;
  constructor(
    public pageDesignerService: PageDesignerService,
    private pageIOService: PageIOService,
    private producMenuService: ProducMenuService,
    private messagingService: MessagingService) { }

  ngOnInit(): void {
    this.pageDesignerService.selectedControl.pipe(takeWhile(() => this.isComponentActive))
    .subscribe(control => {
      this.controlEvents = [];
      if (control) {
        this.getAllProperties();
      } else {
        this.controlEvents = []
      }
    });
  }

  ngOnDestroy(): void {
    this.isComponentActive = false;
  }

  getAllProperties(): void {
    this.controlEvents = this.pageDesignerService.selectedControl.value.getEvents().sort((p1, p2) => {
      return p1.charCodeAt(0) - p2.charCodeAt(0);
    });
  }

  getPropertyFormatedName(prop: string): string {
    const broken: string[] = prop.split(/(?=[A-Z])/);
    broken[0] = broken[0].charAt(0).toUpperCase() + broken[0].slice(1);
    return broken.join(' ');
  }

  updateControlEvent(prop: string, checked: boolean): void {
    const outputEventName: string = this.pageDesignerService.selectedControl.value.controlProperties.controlName + '_' + prop;
    const event = this.pageIOService.getIOEvent(outputEventName, this.pageDesignerService.selectedControl.value.controlProperties.controlName, IODataTypes.None, true, this.producMenuService.selectedMenuId, null)
    if (checked) {
      // add code to add event
      this.pageIOService.saveIO(event);
    } else {
      if (this.pageIOService.hasOutputValue(outputEventName)) {
        // stop event from deletion
        this.messagingService.showSnackBar({
          completed: false,
          message: PageResources.ResetEventError
        });
        this.pageDesignerService.selectedControl.value.controlEvents[prop] = false;
        setTimeout(() => {
          this.pageDesignerService.selectedControl.value.controlEvents[prop] = true;
        }, 10)
        return;
      } else {
        // delete event
        this.pageIOService.deleteIO(event);
      }
    }
    this.pageDesignerService.selectedControl.value.controlEvents[prop] = checked;
    this.pageDesignerService.updateControl();
  }

}
