import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCustomerDoubtsFormEmailComponent } from './home-customer-doubts-form-email.component';

describe('HomeCustomerDoubtsFormEmailComponent', () => {
  let component: HomeCustomerDoubtsFormEmailComponent;
  let fixture: ComponentFixture<HomeCustomerDoubtsFormEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCustomerDoubtsFormEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCustomerDoubtsFormEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
