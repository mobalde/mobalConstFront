import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopinConfirmationComponent } from './popin-confirmation.component';

describe('PopinConfirmationComponent', () => {
  let component: PopinConfirmationComponent;
  let fixture: ComponentFixture<PopinConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopinConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopinConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
