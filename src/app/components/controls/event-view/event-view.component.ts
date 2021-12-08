import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MessagingService } from 'src/app/core/services/messaging.service';
import { PageDesignerService } from 'src/app/core/services/page-designer.service';
import { PageIOService } from 'src/app/core/services/page-io.service';
import { ProducMenuService } from 'src/app/core/services/produc-menu.service';
import { IODataTypes } from 'src/app/core/utilities/enumerations';
import { CoreResources } from 'src/app/core/utilities/resources';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent implements OnInit {

  controlEvents: string[];
  constructor(
    public pageDesignerService: PageDesignerService,
    private pageIOService: PageIOService,
    private producMenuService: ProducMenuService,
    private messagingService: MessagingService) { }

  ngOnInit(): void {
    this.pageDesignerService.selectedControl.subscribe(control => {
      this.controlEvents = [];
      if (control) {
        this.getAllProperties();
      } else {
        this.controlEvents = []
      }
    });
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
          message: CoreResources.ResetEventError
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
