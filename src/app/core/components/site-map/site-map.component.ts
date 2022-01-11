import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { IProductMenuItem } from '../../shared/interfaces/ProductMenuItem';
import { ProducMenuService } from '../../shared/services/product-menu.service';

@Component({
  selector: 'app-site-map',
  templateUrl: './site-map.component.html',
  styleUrls: ['./site-map.component.scss']
})
export class SiteMapComponent implements OnInit, OnDestroy {

  siteMap: string[] = [];
  isComponentActive = true;
  constructor(private producMenuService: ProducMenuService) { }

  ngOnInit(): void {
    this.producMenuService.selectedMenu.pipe(takeWhile(() => this.isComponentActive))
    .subscribe(menu => { this.generateSiteMapData() });
  }

  ngOnDestroy(): void {
    this.isComponentActive = false;
  }

  generateSiteMapData(): void {
    this.siteMap = [];
    let node: IProductMenuItem;
    if (this.producMenuService.selectedMenu.value) {
      let menu = this.producMenuService.selectedMenu.value;
      node = this.producMenuService.findNode(this.producMenuService.ProductMenuList, menu);
      while (node) {
        this.siteMap.splice(0, 0, menu);
        menu = node.parent;
        node = this.producMenuService.findNode(this.producMenuService.ProductMenuList, menu);
      }
    }
  }

}
