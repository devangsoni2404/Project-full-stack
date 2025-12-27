import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestOrder } from './test-order';

describe('TestOrder', () => {
  let component: TestOrder;
  let fixture: ComponentFixture<TestOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestOrder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestOrder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
