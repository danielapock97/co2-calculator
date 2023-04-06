import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMiniCardComponent } from './admin-mini-card.component';

describe('MiniCardComponent', () => {
  let component: AdminMiniCardComponent;
  let fixture: ComponentFixture<AdminMiniCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMiniCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMiniCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
