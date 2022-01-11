import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { IODataTypes } from 'src/app/page/shared/interfaces/enumerations';
import { IPageIO } from 'src/app/page/shared/models/InputOutput';
import { PageIOService } from 'src/app/page/shared/services/page-io.service';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent implements OnInit {

  dataTypes: { key: number, value: string }[] = [];
  constructor(public pageIOService: PageIOService) { }

  ngOnInit(): void {
    Object.keys(IODataTypes).forEach(k => {
      this.dataTypes.push({
        key: IODataTypes[k],
        value: IODataTypes[k]
      });
    });
  }

  updateOutput(node: IPageIO, data: MatSelectChange) {
    node.eventType = data.value;
    this.pageIOService.saveIO(node);
  }

}
