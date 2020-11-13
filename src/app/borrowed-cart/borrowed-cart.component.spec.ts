import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowedCartComponent } from './borrowed-cart.component';

xdescribe('BorrowedCartComponent', () => {
  let component: BorrowedCartComponent;
  let fixture: ComponentFixture<BorrowedCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowedCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowedCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
