import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMainMenuComponent } from './product-main-menu.component';

describe('ProductMainMenuComponent', () => {
  let component: ProductMainMenuComponent;
  let fixture: ComponentFixture<ProductMainMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductMainMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
