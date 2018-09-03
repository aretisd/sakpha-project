import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CusRegisComponent } from './cus-regis.component';

describe('CusRegisComponent', () => {
  let component: CusRegisComponent;
  let fixture: ComponentFixture<CusRegisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CusRegisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CusRegisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
