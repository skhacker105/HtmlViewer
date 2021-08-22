import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationTeamUserRolesComponent } from './organization-team-user-roles.component';

describe('OrganizationTeamUserRolesComponent', () => {
  let component: OrganizationTeamUserRolesComponent;
  let fixture: ComponentFixture<OrganizationTeamUserRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationTeamUserRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationTeamUserRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
