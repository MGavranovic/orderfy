import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineSuccessfulTransactionsComponent } from './line-successful-transactions.component';

describe('LineSuccessfulTransactionsComponent', () => {
  let component: LineSuccessfulTransactionsComponent;
  let fixture: ComponentFixture<LineSuccessfulTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineSuccessfulTransactionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LineSuccessfulTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
