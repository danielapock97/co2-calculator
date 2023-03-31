import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportUserInputComponent } from './transport-user-input.component';

describe('TransportUserInputComponent', () => {
  let component: TransportUserInputComponent;
  let fixture: ComponentFixture<TransportUserInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportUserInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportUserInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
