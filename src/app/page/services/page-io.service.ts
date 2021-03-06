import { Injectable } from "@angular/core";
import { HttpWrapperService } from "@core/services/http-wrapper.service";
import { CoreHelper } from "@core/utilities/helper";
import { BehaviorSubject, Observable, forkJoin } from "rxjs";
import { IODataTypes } from "../interfaces/enumerations";
import { IPageIO } from "../models/InputOutput";
import { IPageIOAction } from "../models/PageIOActions";
import { PageResources } from "../utilities/page-resources";

@Injectable({
  providedIn: 'root'
})
export class PageIOService {

  pageInputOutputs = new BehaviorSubject<IPageIO[]>([]);
  public ioActions: IPageIOAction[] = [];

  constructor(private httpService: HttpWrapperService) { }

  loadPageIO(menuId: string): void {
    this.getPageIOFromDB(menuId).subscribe(res => {
      this.pageInputOutputs.next(res);
    });
  }

  hasOutputValue(eventName: string): boolean {
    const ionode = this.pageInputOutputs.value.find(io => io.eventName === eventName);
    if (ionode) {
      return ionode.value || ionode.eventType !== IODataTypes.None ? true : false;
    }
    return false;
  }

  getIOEvent(eventName: string, controlId?: string, eventType?: IODataTypes, isOutput?: boolean, menuId?: string, value?: any): IPageIO {
    let event = this.pageInputOutputs.value.find(io => io.eventName === eventName);
    if (event) {
      return event;
    } else {
      return {
        controlId: controlId,
        eventId: CoreHelper.generateId(),
        eventName: eventName,
        eventType: eventType,
        isOutput: isOutput,
        menuId: menuId,
        value: value
      }
    }
  }

  // IO Crud Actions
  saveIO(node: IPageIO) {
    if ((this.pageInputOutputs.value.findIndex(io => io.eventId === node.eventId) > -1)) {
      // if already there then update
      this.registerUpdateIOAction(node);
    } else {
      this.registerAddIOAction(node);
      this.pageInputOutputs.value.push(node);
    }
    this.pageInputOutputs.next(JSON.parse(JSON.stringify(this.pageInputOutputs.value)));
  }
  
  deleteIO(node: IPageIO) {
    this.registerDeleteIOAction(node);
    const index = this.pageInputOutputs.value.findIndex(io => io.eventId === node.eventId);
    if (index > -1) {
      this.pageInputOutputs.value.splice(index, 1);
    }
    this.pageInputOutputs.next(JSON.parse(JSON.stringify(this.pageInputOutputs.value)));
  }

  // IO Actions
  private registerIOAction(node: IPageIO, action: string) {
    this.ioActions.push({
      IOItem: node,
      IOOperation: action
    });
  }

  private deleteRegisteredIOAction(node: IPageIO) {
    const n = this.ioActions.findIndex(ma => ma.IOItem.eventId === node.eventId);
    if (n >= 0) {
      this.ioActions.splice(n, 1);
    }
  }

  private registerAddIOAction(node: IPageIO) {
    this.registerIOAction(node, PageResources.CrudActions.Add);
  }

  private registerUpdateIOAction(node: IPageIO) {
    const isNewNode = (this.ioActions.findIndex(ma => ma.IOItem.eventId == node.eventId && ma.IOOperation === PageResources.CrudActions.Add) >= 0);
    this.deleteRegisteredIOAction(node);
    if (!isNewNode) {
      this.registerIOAction(node, PageResources.CrudActions.Update);
    } else {
      this.registerIOAction(node, PageResources.CrudActions.Add);
    }
  }

  private registerDeleteIOAction(node: IPageIO) {
    const isNewNode = (this.ioActions.findIndex(ma => ma.IOItem.eventId == node.eventId && ma.IOOperation === PageResources.CrudActions.Add) >= 0);
    this.deleteRegisteredIOAction(node);
    if (!isNewNode) {
      this.registerIOAction(node, PageResources.CrudActions.Delete);
    }
  }

  // APIs
  public getPageIOFromDB(menuId: string): Observable<IPageIO[]> {
    return this.httpService.getData(PageResources.PageIOApiUrl.getAllEvents + '/' + menuId);
  }

  public saveAllChanges(): Observable<any> {
    const addedRecords: IPageIOAction[] = this.ioActions.filter(ma => ma.IOOperation === PageResources.CrudActions.Add);
    const updatedRecords: IPageIOAction[] = this.ioActions.filter(ma => ma.IOOperation === PageResources.CrudActions.Update);
    const deletedRecords: IPageIOAction[] = this.ioActions.filter(ma => ma.IOOperation === PageResources.CrudActions.Delete);
    let calls: Observable<any>[] = [];
    calls = calls.concat(this.generateApiCalls(addedRecords));
    calls = calls.concat(this.generateApiCalls(updatedRecords));
    calls = calls.concat(this.generateApiCalls(deletedRecords));
    return forkJoin(calls);
  }

  private generateApiCalls(ioActions: IPageIOAction[]): Observable<any>[] {
    const arr: Observable<any>[] = [];
    if (ioActions && ioActions.length > 0) {
      ioActions.forEach(ma => {
        const newItem: IPageIO = {
          controlId: ma.IOItem.controlId,
          eventId: ma.IOItem.eventId,
          eventName: ma.IOItem.eventName,
          eventType: ma.IOItem.eventType,
          isOutput: ma.IOItem.isOutput,
          menuId: ma.IOItem.menuId,
          value: ma.IOItem.value
        };
        if (ma.IOOperation === PageResources.CrudActions.Add) {
          // ADD
          arr.push(this.httpService.postData(PageResources.PageIOApiUrl.addEvent, newItem));
        } else if (ma.IOOperation === PageResources.PageIOApiUrl.updateEvent) {
          // UPDATE
          arr.push(this.httpService.putData(PageResources.PageIOApiUrl.updateEvent + '/' + newItem.eventId, newItem));
        } else if (ma.IOOperation === PageResources.CrudActions.Delete) {
          // DELETE
          arr.push(this.httpService.deleteData(PageResources.PageIOApiUrl.deleteEvent + '/' + newItem.eventId));
        }
      });
    }
    return arr;
  }
}
