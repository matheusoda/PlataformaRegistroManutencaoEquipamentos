import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFinalizeComponent } from './modal-finalize.component';

describe('ModalFinalizeComponent', () => {
  let component: ModalFinalizeComponent;
  let fixture: ComponentFixture<ModalFinalizeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalFinalizeComponent]
    });
    fixture = TestBed.createComponent(ModalFinalizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
