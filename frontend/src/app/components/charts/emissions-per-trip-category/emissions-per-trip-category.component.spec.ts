import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmissionsPerTripCategoryComponent } from './emissions-per-trip-category.component';

describe('EmissionsPerTripCategoryComponent', () => {
  let component: EmissionsPerTripCategoryComponent;
  let fixture: ComponentFixture<EmissionsPerTripCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmissionsPerTripCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmissionsPerTripCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
