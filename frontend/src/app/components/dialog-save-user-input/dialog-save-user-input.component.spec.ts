import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSaveUserInputComponent } from './dialog-save-user-input.component';

describe('DialogSaveUserInputComponent', () => {
  let component: DialogSaveUserInputComponent;
  let fixture: ComponentFixture<DialogSaveUserInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSaveUserInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSaveUserInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
