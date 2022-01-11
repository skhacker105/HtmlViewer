import { Component, OnInit } from '@angular/core';
import { ProducMenuService } from '../../shared/services/product-menu.service';

@Component({
  selector: 'app-menu-change-history',
  templateUrl: './menu-change-history.component.html',
  styleUrls: ['./menu-change-history.component.scss']
})
export class MenuChangeHistoryComponent implements OnInit {

  constructor(public producMenuService: ProducMenuService) { }

  ngOnInit(): void {
  }

}
