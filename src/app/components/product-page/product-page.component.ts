import { Component, OnInit } from '@angular/core';
import { PageDesignerService } from 'src/app/core/services/page-designer.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  constructor(public pageDesignerService: PageDesignerService) { }

  ngOnInit(): void {
  }

}
