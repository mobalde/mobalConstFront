import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilanCompteComponent } from './bilan-compte.component';

describe('BilanCompteComponent', () => {
  let component: BilanCompteComponent;
  let fixture: ComponentFixture<BilanCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilanCompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilanCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
