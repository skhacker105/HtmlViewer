import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { PageDesignerService } from '../../shared/services/page-designer.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  constructor(public pageDesignerService: PageDesignerService) { }

  ngOnInit(): void {
  }
  

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {}

}
