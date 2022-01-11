import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { takeWhile } from 'rxjs/operators';
import { ConfirmationComponent } from 'src/app/core/components/confirmation/confirmation.component';
import { MessagingService } from 'src/app/core/shared/services/messaging.service';
import { ProducMenuService } from 'src/app/core/shared/services/product-menu.service';
import { AddProductMenuComponent } from 'src/app/main-menu/add-product-menu/add-product-menu.component';
import { IODataTypes } from 'src/app/page/shared/interfaces/enumerations';
import { IPageIO } from 'src/app/page/shared/models/InputOutput';
import { IPageControl } from 'src/app/page/shared/models/PageControl';
import { PageDesignerService } from 'src/app/page/shared/services/page-designer.service';
import { PageIOService } from 'src/app/page/shared/services/page-io.service';
import { PageResources } from 'src/app/page/shared/utilities/resources';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit, OnDestroy {

  isComponentActive = true;
  actions = PageResources.CrudActions;
  dataTypes: { key: number, value: string }[] = [];
  constructor(
    public dialog: MatDialog,
    public pageIOService: PageIOService,
    private pageDesignerService: PageDesignerService,
    private producMenuService: ProducMenuService,
    private messagingService: MessagingService) { }

  ngOnInit(): void {
    Object.keys(IODataTypes).forEach(k => {
      this.dataTypes.push({
        key: IODataTypes[k],
        value: IODataTypes[k]
      });
    });
  }

  ngOnDestroy(): void {
    this.isComponentActive = false;
  }

  addInput(io: IPageIO, action: string) {
    const dialogRef = this.dialog.open(AddProductMenuComponent, {
      data: { newMenu: io ? io.eventName : '', title: ' Input', action: action }
    });

    dialogRef.afterClosed().pipe(takeWhile(() => this.isComponentActive))
      .subscribe(result => {
        if (result && result.newMenu) {
          if (io) {
            // edit mode
            io.eventName = result.newMenu;
            this.pageIOService.saveIO(io);
          } else {
            // add mode
            const newio = this.pageIOService.getIOEvent(result.newMenu, this.pageDesignerService.selectedControl.value.controlProperties.controlName, IODataTypes.None, false, this.producMenuService.selectedMenuId, null);
            this.pageIOService.saveIO(newio);
          }
        }
      });
  }

  deleteInput(io: IPageIO) {
    const controlUsingIO = this.inputUsedInControl(io, this.pageDesignerService.containers.value);
    if (controlUsingIO) {
      const msg = PageResources.DeleteInputError.replace('[[control_name]]', controlUsingIO.controlProperties.controlName)
      this.messagingService.showSnackBar({
        completed: false,
        message: msg
      });
    } else {
      const dialogRef = this.dialog.open(ConfirmationComponent, {
        data: PageResources.DeleteConfirmationData
      });
      dialogRef.afterClosed().pipe(takeWhile(() => this.isComponentActive))
        .subscribe((confirmed: boolean) => {
          if (confirmed) {
            this.pageIOService.deleteIO(io);
          }
        });
    }
  }

  inputUsedInControl(io: IPageIO, controls: IPageControl[]): IPageControl {
    let found: IPageControl;
    if (controls) {
      controls.forEach(c => {
        if (c.controlProperties.pageInput && c.controlProperties.pageInput === io.eventId && !found) {
          found = c;
        }
        if (c.children && !found) {
          found = this.inputUsedInControl(io, c.children);
        }
      });
    }
    return found;
  }

}