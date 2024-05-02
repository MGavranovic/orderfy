import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditOrdersComponent } from './add-edit-orders.component';

describe('AddEditOrdersComponent', () => {
  let component: AddEditOrdersComponent;
  let fixture: ComponentFixture<AddEditOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
