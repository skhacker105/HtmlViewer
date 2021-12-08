import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { IPageIO } from 'src/app/core/interfaces/InputOutput';
import { PageIOService } from 'src/app/core/services/page-io.service';
import { IODataTypes } from 'src/app/core/utilities/enumerations';

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
