import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-record-action',
  templateUrl: './record-action.component.html',
  styleUrls: ['./record-action.component.scss']
})
export class RecordActionComponent implements OnInit {

  @Input() showAdd = false;
  @Input() showEdit = true;
  @Input() showDelete = true;
  @Input() showHide = false;
  @Input() hidden = false;
  @Input() record: any;

  @Output() addClick = new EventEmitter();
  @Output() editClick = new EventEmitter();
  @Output() deleteClick = new EventEmitter();
  @Output() hideUnhideClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  handleAddClick() {
    this.addClick.emit(this.record);
  }

  handleEditClick() {
    this.editClick.emit(this.record);
  }

  handleDeleteClick() {
    this.deleteClick.emit(this.record);
  }

  handleHideUnhide() {
    this.hideUnhideClick.emit(this.record);
  }

}
