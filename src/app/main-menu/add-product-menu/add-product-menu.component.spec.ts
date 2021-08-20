import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductMenuComponent } from './add-product-menu.component';

describe('AddProductMenuComponent', () => {
  let component: AddProductMenuComponent;
  let fixture: ComponentFixture<AddProductMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
