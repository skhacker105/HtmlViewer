import { Component, OnInit } from '@angular/core';
import { IProductMenuItem } from '../../interfaces/ProductMenuItem';
import { ProducMenuService } from '../../services/produc-menu.service';

@Component({
  selector: 'app-site-map',
  templateUrl: './site-map.component.html',
  styleUrls: ['./site-map.component.scss']
})
export class SiteMapComponent implements OnInit {

  siteMap: string[] = [];

  constructor(private producMenuService: ProducMenuService) { }

  ngOnInit(): void {
    this.producMenuService.selectedMenu.subscribe(menu => { this.generateSiteMapData() });
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
