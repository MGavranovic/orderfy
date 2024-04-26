import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineUsersComponent } from './line-users.component';

describe('LineUsersComponent', () => {
  let component: LineUsersComponent;
  let fixture: ComponentFixture<LineUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LineUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
