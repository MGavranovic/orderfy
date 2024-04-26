import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiePaymentStatusDistributionComponent } from './pie-payment-status-distribution.component';

describe('PiePaymentStatusDistributionComponent', () => {
  let component: PiePaymentStatusDistributionComponent;
  let fixture: ComponentFixture<PiePaymentStatusDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PiePaymentStatusDistributionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PiePaymentStatusDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
