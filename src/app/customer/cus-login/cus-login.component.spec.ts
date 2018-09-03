import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CusLoginComponent } from './cus-login.component';

describe('CusLoginComponent', () => {
  let component: CusLoginComponent;
  let fixture: ComponentFixture<CusLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CusLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CusLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
