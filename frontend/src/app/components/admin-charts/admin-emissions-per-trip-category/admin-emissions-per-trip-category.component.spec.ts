import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmissionsPerTripCategoryComponent } from './admin-emissions-per-trip-category.component';

describe('AdminEmissionsPerTripCategoryComponent', () => {
  let component: AdminEmissionsPerTripCategoryComponent;
  let fixture: ComponentFixture<AdminEmissionsPerTripCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEmissionsPerTripCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEmissionsPerTripCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
