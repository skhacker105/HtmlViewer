import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { IActionResult } from '../../shared/interfaces/ActionResult';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: IActionResult) { }

  ngOnInit(): void {
  }

}
