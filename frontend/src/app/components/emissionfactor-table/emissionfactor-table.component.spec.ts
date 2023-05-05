import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmissionfactorTableComponent } from './emissionfactor-table.component';

describe('EmissionfactorTableComponent', () => {
  let component: EmissionfactorTableComponent;
  let fixture: ComponentFixture<EmissionfactorTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmissionfactorTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmissionfactorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
