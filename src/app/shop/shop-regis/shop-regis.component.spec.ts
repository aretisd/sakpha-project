import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopRegisComponent } from './shop-regis.component';

describe('ShopRegisComponent', () => {
  let component: ShopRegisComponent;
  let fixture: ComponentFixture<ShopRegisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopRegisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopRegisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
